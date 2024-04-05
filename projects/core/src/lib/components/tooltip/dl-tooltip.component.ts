import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { overlayAnimation } from '../../animations/overlay-animation';
import { DlDestroyService } from '../../services/dl-destroy.service';
import { DL_OVERLAY_HOST, DlOverlayHost } from '../../classes/dl-overlay-host';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { DL_TOOLTIP_POSITIONS } from '../menu/dl-overlay-positions';

import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'dl-tooltip',
  standalone: true,
  imports: [CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './dl-tooltip.component.html',
  styleUrl: './dl-tooltip.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [overlayAnimation],
  providers: [
    {
      provide: DL_OVERLAY_HOST,
      useExisting: DlTooltipComponent,
    },
    DlDestroyService,
  ],
  exportAs: 'dlTooltip',
})
export class DlTooltipComponent extends DlOverlayHost implements AfterViewInit {
  // --- @deps ---
  private readonly _elRef: ElementRef<HTMLElement> = inject(ElementRef);

  // --- @inputs ---
  text = input.required<string>();

  // --- @protected ---
  protected readonly _positions: ConnectedPosition[] = DL_TOOLTIP_POSITIONS;
  protected readonly _scrollStrategy = inject(
    ScrollStrategyOptions,
  ).reposition();

  // --- @public ---
  override select() {}

  override ngAfterViewInit() {
    super.ngAfterViewInit();

    let counter = 0;

    fromEvent(this._elRef.nativeElement, 'mouseenter')
      .pipe(
        tap(() => {
          counter++;
        }),
        debounceTime(500),
        takeUntil(this._onDestroy$!),
      )
      .subscribe(() => {
        if (this.opened || counter <= 0) {
          return;
        }

        this.open();
      });

    fromEvent(this._elRef.nativeElement, 'mouseleave')
      .pipe(takeUntil(this._onDestroy$!))
      .subscribe(() => {
        counter--;

        if (!this.opened) {
          return;
        }

        this.close();
      });
  }
}
