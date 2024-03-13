import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { DL_OVERLAY_POSITIONS } from '../menu/dl-overlay-positions';
import { DlDestroyService } from '../../services/dl-destroy.service';
import { overlayAnimation } from '../../animations/overlay-animation';
import { dlDefaultTransform } from '../../helpers/default-transform';
import {
  DL_OVERLAY_CONFIG,
  DL_OVERLAY_HOST,
  DlDropdownConfig,
  DlOverlayHost,
  DlValue,
} from '../../classes/dl-overlay-host';

@Component({
  selector: 'dl-select',
  standalone: true,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './dl-select.component.html',
  styleUrls: ['./dl-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [overlayAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DlSelectComponent,
      multi: true,
    },
    {
      provide: DL_OVERLAY_HOST,
      useExisting: DlSelectComponent,
    },
    {
      provide: DL_OVERLAY_CONFIG,
      useValue: {
        selectable: true,
      } as DlDropdownConfig,
    },
    DlDestroyService,
  ],
  host: { class: 'dl-select', ngSkipHydration: 'true' },
  exportAs: 'dlSelect',
})
export class DlSelectComponent<T>
  extends DlOverlayHost<T>
  implements ControlValueAccessor
{
  // --- @deps ---
  private readonly _elRef: ElementRef<HTMLElement> = inject(ElementRef);

  // --- @inputs ---
  readonly format = input<(value: DlValue<T>) => string>(dlDefaultTransform);
  readonly formSubmitted = input(true);
  readonly manualInvalid = input(false);
  readonly placeholder = input('');

  // --- @protected ---
  protected _overlayWidth!: number;
  protected readonly _positions = DL_OVERLAY_POSITIONS;
  protected readonly _scrollStrategy = inject(
    ScrollStrategyOptions,
  ).reposition();

  // --- @public ---

  disabled = false;

  onChange?: (value: typeof this.value) => {};
  onTouched?: () => {};

  override select(value: unknown) {
    if (this.multiple()) {
      if (!value) {
        return;
      }

      if (this.hasValue(value)) {
        this.value = (this.value as Array<DlValue<T>>).filter(
          val => val !== value,
        );
      } else {
        if (!Array.isArray(this.value)) {
          this.value = [] as Array<DlValue<T>>;
        }

        this.value = [...this.value, value as T];
      }

      this.writeValue(this.value);
      this.onChange?.(this.value);

      return;
    }

    this.writeValue(value as T);
    this.onChange?.(value as T);
  }

  getFormattedValue(value: typeof this.value) {
    if (Array.isArray(value)) {
      return value.map(val => this.format()(val)).join(', ');
    }

    return this.format()(value);
  }

  writeValue(value: typeof this.value) {
    this.value = value;
    this._cdr.detectChanges();
  }

  registerOnChange(fn: typeof this.onChange) {
    this.onChange = fn;
  }

  registerOnTouched(fn: typeof this.onTouched) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this._cdr.markForCheck();
  }

  override open() {
    this._overlayWidth = this._elRef.nativeElement.offsetWidth;
    super.open();
  }
}
