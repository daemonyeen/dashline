import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { DlToastContainer } from './toast-container.component';

export interface DlToastDismiss {
  dismissedByAction: boolean;
}

const MAX_TIMEOUT = Math.pow(2, 31) - 1;

export class DlToastRef<T> {
  instance?: T;
  containerInstance: DlToastContainer;
  private readonly _afterDismissed = new Subject<DlToastDismiss>();
  private readonly _onAction = new Subject<void>();

  private _durationTimeoutId!: any;
  private _dismissedByAction = false;

  constructor(
    containerInstance: DlToastContainer,
    private _overlayRef: OverlayRef,
  ) {
    this.containerInstance = containerInstance;
    containerInstance._onExit.subscribe(() => this._finishDismiss());
  }

  dismiss() {
    if (!this._afterDismissed.closed) {
      this.containerInstance.exit();
    }
    clearTimeout(this._durationTimeoutId);
  }

  dismissWithAction() {
    if (!this._onAction.closed) {
      this._dismissedByAction = true;
      this._onAction.next();
      this._onAction.complete();
      this.dismiss();
    }
    clearTimeout(this._durationTimeoutId);
  }

  _dismissAfter(duration: number) {
    this._durationTimeoutId = setTimeout(
      () => this.dismiss(),
      Math.min(duration, MAX_TIMEOUT),
    );
  }

  private _finishDismiss() {
    this._overlayRef.dispose();

    if (!this._onAction.closed) {
      this._onAction.complete();
    }

    this._afterDismissed.next({ dismissedByAction: this._dismissedByAction });
    this._afterDismissed.complete();
    this._dismissedByAction = false;
  }

  afterDismissed(): Observable<DlToastDismiss> {
    return this._afterDismissed;
  }

  afterOpened(): Observable<void> {
    return this.containerInstance._onEnter;
  }

  onAction(): Observable<void> {
    return this._onAction;
  }
}
