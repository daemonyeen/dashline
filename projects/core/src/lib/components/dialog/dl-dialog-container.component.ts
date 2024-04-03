import { CdkDialogContainer } from '@angular/cdk/dialog';
import { Component, inject, Renderer2 } from '@angular/core';
import { PortalModule } from '@angular/cdk/portal';
import { overlayAnimation } from '../../animations/overlay-animation';
import { Observable } from 'rxjs';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
  standalone: true,
  imports: [PortalModule],
  selector: 'dl-dialog-container',
  styleUrl: 'dl-dialog-container.component.scss',
  templateUrl: 'dl-dialog-container.component.html',
  animations: [overlayAnimation],
  host: {
    class: 'dl-dialog-container',
    '[@transformOverlay]': '_animationState',
  },
})
export class DlDialogContainerComponent extends CdkDialogContainer {
  // --- @deps --
  private readonly _renderer = inject(Renderer2);
  private readonly _overlayRef2 = inject(OverlayRef);

  // --- public ---
  protected _animationState = 'enter';

  animateClose(): Observable<void> {
    return new Observable<any>(observer => {
      this._animationState = 'void';
      const backdropElement = this._overlayRef2.backdropElement;

      if (backdropElement) {
        // A bit hacky, but it's the only way to animate backdrop
        this._renderer.removeClass(
          backdropElement,
          'cdk-overlay-backdrop-showing',
        );
      }

      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          observer.next();
          observer.complete();
        }, 150);
      });
    });
  }
}
