import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { overlayAnimation } from '../../animations/overlay-animation';
import { DlDestroyService } from '../../services/dl-destroy.service';
import { DL_OVERLAY_POSITIONS } from '../menu/dl-overlay-positions';
import { DlFormFieldComponent } from '../form-field/dl-form-field.component';
import { takeUntil } from 'rxjs/operators';
import { dlDefaultTransform } from '../../helpers/default-transform';
import { DL_OVERLAY_HOST, DlOverlayHost } from '../../classes/dl-overlay-host';

@Component({
  selector: 'dl-autocomplete',
  standalone: true,
  imports: [CommonModule, CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './dl-autocomplete.component.html',
  styleUrl: './dl-autocomplete.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [overlayAnimation],
  providers: [
    {
      provide: DL_OVERLAY_HOST,
      useExisting: DlAutocompleteComponent,
    },
    DlDestroyService,
  ],
  host: {
    class: 'dl-autocomplete',
    ngSkipHydration: 'true',
  },
  exportAs: 'dlAutocomplete',
})
export class DlAutocompleteComponent<T>
  extends DlOverlayHost<T>
  implements AfterContentInit
{
  // --- @deps ---
  private readonly _elRef: ElementRef<HTMLElement> = inject(ElementRef);

  // --- @inputs ---
  format = input<(value: T | null) => string>(dlDefaultTransform);
  empty = input.required<string>();

  // --- @outputs ---
  @Output()
  optionSelected = new EventEmitter<T | null>();

  // --- @template ---
  @ContentChild(DlFormFieldComponent)
  private readonly _formField!: DlFormFieldComponent;

  // --- @protected ---
  protected _overlayWidth!: number;
  protected readonly _positions = DL_OVERLAY_POSITIONS;
  protected readonly _scrollStrategy = inject(
    ScrollStrategyOptions,
  ).reposition();

  // --- @public ---
  @HostListener('document:mouseup')
  checkState() {
    if (this._formField.state() === 'focused') {
      this.open();
    } else {
      this.close();
    }
  }

  select(value: unknown) {
    if (!this._formField.input) {
      return;
    }

    const { input } = this._formField;

    input.set(this.format()(value as T));
    this.optionSelected.next(value as T);
  }

  ngAfterContentInit() {
    this._options.changes.pipe(takeUntil(this._onDestroy$!)).subscribe(() => {
      this.updateOptionIndexes();
      if (this._formField.state() === 'focused') {
        this.open();
      }
      this._cdr.markForCheck();
    });
  }

  override open() {
    if (this._options.length === 0) {
      return;
    }

    this._overlayWidth = this._elRef.nativeElement.offsetWidth;
    super.open();
  }

  override close() {
    super.close();
    this._formField.input.blur();
  }
}
