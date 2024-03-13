import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  ScrollStrategyOptions,
} from '@angular/cdk/overlay';
import { DlDestroyService } from '../../services/dl-destroy.service';
import { overlayAnimation } from '../../animations/overlay-animation';
import { DL_MENU_POSITIONS } from './dl-overlay-positions';
import { DL_OVERLAY_HOST, DlOverlayHost } from '../../classes/dl-overlay-host';

@Component({
  selector: 'dl-menu',
  standalone: true,
  imports: [CommonModule, CdkConnectedOverlay, CdkOverlayOrigin],
  templateUrl: './dl-menu.component.html',
  styleUrls: ['./dl-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [overlayAnimation],
  providers: [
    {
      provide: DL_OVERLAY_HOST,
      useExisting: DlMenuComponent,
    },
    DlDestroyService,
  ],
  host: {
    class: 'dl-menu',
    ngSkipHydration: 'true',
  },
  exportAs: 'dlMenu',
})
export class DlMenuComponent extends DlOverlayHost {
  // --- @protected ---
  protected readonly _positions: ConnectedPosition[] = DL_MENU_POSITIONS;
  protected readonly _scrollStrategy = inject(
    ScrollStrategyOptions,
  ).reposition();

  override select() {}
}
