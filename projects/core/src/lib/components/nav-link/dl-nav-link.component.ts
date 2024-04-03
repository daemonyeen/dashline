import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: '[dl-nav-link]',
  standalone: true,
  imports: [],
  templateUrl: './dl-nav-link.component.html',
  styleUrl: './dl-nav-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // No encapsulation to utilize routing classes
  encapsulation: ViewEncapsulation.None,
  host: { class: 'dl-nav-link' },
})
export class DlNavLinkComponent {}
