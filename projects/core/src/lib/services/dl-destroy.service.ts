import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Observable abstraction over ngOnDestroy to use with takeUntil
 *
 * @Component({
 *   // ...
 *   providers: [DestroyService],
 * })
 * export class DestroyExample {
 *   constructor(
 *     private readonly destroy$: DestroyService
 *   ) {
 *     fromEvent(document, 'keyup')
 *       .pipe(takeUntil(this.destroy$))
 *       .subscribe((event) => {
 *         console.log(event);
 *       });
 *   }
 * }
 */
@Injectable()
export class DlDestroyService extends Subject<void> implements OnDestroy {
  ngOnDestroy() {
    this.next();
    this.complete();
  }
}
