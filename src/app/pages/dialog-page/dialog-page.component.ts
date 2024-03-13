import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DlButtonComponent } from '../../../../projects/core/src/lib/components/button/dl-button.component';
import { DlDialogService } from '../../../../projects/core/src/lib/components/dialog/dl-dialog.service';
import { ExampleDialogComponent } from './example-dialog/example-dialog.component';

@Component({
  selector: 'app-dialog-page',
  standalone: true,
  imports: [DlButtonComponent],
  templateUrl: './dialog-page.component.html',
  styleUrl: './dialog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPageComponent {
  private readonly _dialog = inject(DlDialogService);

  open() {
    this._dialog.open(ExampleDialogComponent);
  }
}
