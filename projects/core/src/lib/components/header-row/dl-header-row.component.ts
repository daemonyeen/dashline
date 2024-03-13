import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-header-row',
  standalone: true,
  templateUrl: './dl-header-row.component.html',
  styleUrls: ['./dl-header-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-header-row' },
})
export class DlHeaderRowComponent {}
