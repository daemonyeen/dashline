import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  inject,
  NgZone,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import {
  BasePortalOutlet,
  CdkPortalOutlet,
  ComponentPortal,
  TemplatePortal,
} from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';
import { AnimationEvent } from '@angular/animations';
import { toastAnimation } from '../../animations/toast-animation';
import { DlToastConfig } from './toast-config';

/**
 * Internal component that wraps user-provided snack bar content.
 * @docs-private
 */
@Component({
  selector: 'dl-toast-container',
  templateUrl: 'toast-container.component.html',
  styleUrl: 'toast-container.component.scss',
  animations: [toastAnimation],
  standalone: true,
  imports: [CdkPortalOutlet],
  host: {
    class: 'dl-toast-container',
    '[@state]': '_animationState',
    '(@state.done)': 'onAnimationEnd($event)',
  },
})
export class DlToastContainer extends BasePortalOutlet implements OnDestroy {
  private _ngZone = inject(NgZone);
  private _elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _destroyed = false;

  public config = inject(DlToastConfig);

  @ViewChild(CdkPortalOutlet, { static: true }) _portalOutlet!: CdkPortalOutlet;

  readonly _onExit: Subject<void> = new Subject();
  readonly _onEnter: Subject<void> = new Subject();

  _animationState = 'void';

  constructor() {
    super();
  }

  attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
    this._assertNotAttached();
    const result = this._portalOutlet.attachComponentPortal(portal);

    this._afterPortalAttached();

    return result;
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    this._assertNotAttached();
    const result = this._portalOutlet.attachTemplatePortal(portal);

    this._afterPortalAttached();

    return result;
  }

  onAnimationEnd(event: AnimationEvent) {
    const { fromState, toState } = event;

    if ((toState === 'void' && fromState !== 'void') || toState === 'hidden') {
      this._completeExit();
    }

    if (toState === 'visible') {
      const onEnter = this._onEnter;

      this._ngZone.run(() => {
        onEnter.next();
        onEnter.complete();
      });
    }
  }

  enter(): void {
    if (!this._destroyed) {
      this._animationState = 'visible';
      this._changeDetectorRef.markForCheck();
      this._changeDetectorRef.detectChanges();
    }
  }

  exit(): Observable<void> {
    this._ngZone.run(() => {
      this._animationState = 'hidden';
      this._changeDetectorRef.markForCheck();
      this._elementRef.nativeElement.setAttribute('mat-exit', '');
    });

    return this._onExit;
  }

  ngOnDestroy() {
    this._destroyed = true;
    this._completeExit();
  }

  private _completeExit() {
    queueMicrotask(() => {
      this._onExit.next();
      this._onExit.complete();
    });
  }

  private _afterPortalAttached() {
    const element: HTMLElement = this._elementRef.nativeElement;
    const panelClasses = this.config.panelClass;

    if (panelClasses) {
      if (Array.isArray(panelClasses)) {
        // Note that we can't use a spread here, because IE doesn't support multiple arguments.
        panelClasses.forEach(cssClass => element.classList.add(cssClass));
      } else {
        element.classList.add(panelClasses);
      }
    }
  }

  private _assertNotAttached() {
    if (this._portalOutlet.hasAttached()) {
      throw Error(
        'Attempting to attach snack bar content after content is already attached',
      );
    }
  }
}
