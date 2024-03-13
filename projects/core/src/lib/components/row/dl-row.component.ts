import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-row',
  standalone: true,
  imports: [],
  templateUrl: './dl-row.component.html',
  styleUrls: ['./dl-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-row' },
})
export class DlRowComponent {}
