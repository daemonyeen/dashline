import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-error',
  standalone: true,
  templateUrl: './dl-error.component.html',
  styleUrls: ['./dl-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DlErrorComponent {}
