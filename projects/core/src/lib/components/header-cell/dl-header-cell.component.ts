import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-header-cell',
  standalone: true,
  templateUrl: './dl-header-cell.component.html',
  styleUrls: ['./dl-header-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-header-cell' },
})
export class DlHeaderCellComponent {}
