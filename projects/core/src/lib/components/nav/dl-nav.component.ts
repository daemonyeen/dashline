import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-nav',
  standalone: true,
  templateUrl: './dl-nav.component.html',
  styleUrl: './dl-nav.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-nav' },
})
export class DlNavComponent {}
