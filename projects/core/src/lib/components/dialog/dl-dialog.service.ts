import { inject, Injectable } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { DlDialogContainerComponent } from './dl-dialog-container.component';

export type DlDialogOptions<T = any> = {
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
      data: options?.data,
    });

    const originalClose = dialogRef.close.bind(dialogRef);

    dialogRef.close = () => {
      (dialogRef.containerInstance as DlDialogContainerComponent)
        .animateClose()
        .subscribe(() => {
          originalClose();
        });
    };

    return dialogRef;
  }
}
