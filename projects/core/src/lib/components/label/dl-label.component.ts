import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'dl-label',
  standalone: true,
  templateUrl: './dl-label.component.html',
  styleUrls: ['./dl-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-label' },
  exportAs: 'dlLabel',
})
export class DlLabelComponent {
  readonly required = input(false);
}
