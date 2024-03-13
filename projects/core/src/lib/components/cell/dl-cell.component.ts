import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-cell',
  standalone: true,
  templateUrl: './dl-cell.component.html',
  styleUrls: ['./dl-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-cell' },
})
export class DlCellComponent {}
