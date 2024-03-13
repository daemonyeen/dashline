import { Component, inject, input, TemplateRef } from '@angular/core';
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
  ],
  exportAs: 'dlPopover',
})
export class DlPopoverComponent extends DlOverlayHost {
  // --- @inputs ---
  template = input.required<TemplateRef<any>>();

  // --- @protected ---
  protected readonly _positions: ConnectedPosition[] = DL_MENU_POSITIONS;
  protected readonly _scrollStrategy = inject(
    ScrollStrategyOptions,
  ).reposition();

  // --- @public ---
  override select() {}
}
