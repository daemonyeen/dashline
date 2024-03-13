import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { DlButtonModule } from '../button/dl-button.module';

export interface DlAlertOptions {
  title: string;
  lead: string;
  action?: string;
  cancel?: string;
}

@Component({
  selector: 'dl-alert-dialog',
  standalone: true,
  imports: [DlButtonModule],
  templateUrl: './dl-alert-dialog.component.html',
  styleUrl: './dl-alert-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DlAlertDialogComponent {
  protected readonly _data: DlAlertOptions = inject(DIALOG_DATA);
  private readonly _dialogRef = inject(DialogRef);

  action() {
    this._dialogRef.close(true);
  }

  close() {
    this._dialogRef.close(false);
  }
}
