import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DlDialogService } from '../../../../projects/core/src/lib/components/dialog/dl-dialog.service';
import {
  DlAlertDialogComponent,
  DlAlertOptions,
} from '../../../../projects/core/src/lib/components/alert-dialog/dl-alert-dialog.component';
import { DlButtonModule } from '../../../../projects/core/src/lib/components/button/dl-button.module';

@Component({
  selector: 'app-alert-dialog-page',
  standalone: true,
  imports: [DlButtonModule],
  templateUrl: './alert-dialog-page.component.html',
  styleUrl: './alert-dialog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertDialogPageComponent {
  private readonly _dialog = inject(DlDialogService);

  open() {
    this._dialog.open<DlAlertDialogComponent, DlAlertOptions>(
      DlAlertDialogComponent,
      {
        data: {
          title: 'Are you absolutely sure?',
          lead: 'This action cannot be undone. This will permanently delete your account and remove your data from our servers',
          action: 'Continue',
          cancel: 'Cancel',
        },
      },
    );
  }
}
