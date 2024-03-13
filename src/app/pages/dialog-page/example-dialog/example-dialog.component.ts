import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-example-dialog',
  standalone: true,
  imports: [],
  templateUrl: './example-dialog.component.html',
  styleUrl: './example-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleDialogComponent implements OnInit {
  private readonly _dialogRef = inject(DialogRef);

  ngOnInit() {
    this._dialogRef.updateSize(425);
  }
}
