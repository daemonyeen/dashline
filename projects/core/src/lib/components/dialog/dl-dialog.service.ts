import { inject, Injectable } from '@angular/core';
import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { DlDialogContainerComponent } from './dl-dialog-container.component';
import { Subject } from 'rxjs';

export type DlDialogOptions<T = any> = DialogConfig & {
  data?: T;
};

@Injectable()
export class DlDialogService {
  private readonly _dialog = inject(Dialog);

  open<T, R = any>(
    component: ComponentType<any>,
    options?: DlDialogOptions<R>,
  ): DialogRef<T> {
    const dialogRef = this._dialog.open<T>(component, {
      container: DlDialogContainerComponent,
      ...(options || Object.create(null)),
    });

    const originalClose = dialogRef.close.bind(dialogRef);

    dialogRef.close = result => {
      const closedSubject = dialogRef.closed as Subject<any>;

      closedSubject.next(result);
      closedSubject.complete();

      (dialogRef.containerInstance as DlDialogContainerComponent)
        .animateClose()
        .subscribe(() => {
          originalClose();
        });
    };

    return dialogRef;
  }
}
