import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-table',
  standalone: true,
  imports: [],
  templateUrl: './dl-table.component.html',
  styleUrls: ['./dl-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dl-table',
  },
})
export class DlTableComponent {}
