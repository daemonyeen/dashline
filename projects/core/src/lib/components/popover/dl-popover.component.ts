import {
  Component,
  ElementRef,
  inject,
  input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { overlayAnimation } from '../../animations/overlay-animation';
import { DL_MENU_POSITIONS } from '../menu/dl-overlay-positions';
import { DL_OVERLAY_HOST, DlOverlayHost } from '../../classes/dl-overlay-host';
import { filter, fromEvent } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';
import { DlDestroyService } from '../../services/dl-destroy.service';

@Component({
  selector: 'dl-popover',
  standalone: true,
  imports: [CommonModule, CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './dl-popover.component.html',
  styleUrl: './dl-popover.component.scss',
  animations: [overlayAnimation],
  providers: [
    {
      provide: DL_OVERLAY_HOST,
      useExisting: DlPopoverComponent,
    },
    DlDestroyService,
  ],
  exportAs: 'dlPopover',
})
export class DlPopoverComponent extends DlOverlayHost {
  // --- @deps ---
  private readonly _elRef: ElementRef<HTMLElement> = inject(ElementRef);

  // --- @inputs ---
  template = input.required<TemplateRef<any>>();
  triggerBy = input<'click' | 'hover'>('click');

  // --- @protected ---
  protected readonly _positions: ConnectedPosition[] = DL_MENU_POSITIONS;
  protected readonly _scrollStrategy = inject(
    ScrollStrategyOptions,
  ).reposition();

  // --- @public ---

  override ngAfterViewInit() {
    super.ngAfterViewInit();

    let counter = 0;

    fromEvent(this._elRef.nativeElement, 'mouseenter')
      .pipe(
        filter(() => this.triggerBy() === 'hover'),
        tap(() => {
          counter++;
        }),
        debounceTime(300),
        takeUntil(this._onDestroy$!),
      )
      .subscribe(() => {
        if (counter <= 0) {
          return;
        }

        this.open();
      });

    fromEvent(this._elRef.nativeElement, 'mouseleave')
      .pipe(
        filter(() => this.triggerBy() === 'hover'),
        takeUntil(this._onDestroy$!),
      )
      .subscribe(() => {
        counter--;

        if (!this.opened) {
          return;
        }

        this.close();
      });
  }

  override select() {}

  openByClick() {
    if (this.triggerBy() !== 'click') {
      return;
    }

    this.open();
  }
}
