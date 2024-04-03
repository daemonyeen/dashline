import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DlOverlayService {
  private readonly _closeAll$ = new Subject<void>();

  readonly closeAll$ = this._closeAll$.asObservable();

  closeAll() {
    this._closeAll$.next();
  }
}
