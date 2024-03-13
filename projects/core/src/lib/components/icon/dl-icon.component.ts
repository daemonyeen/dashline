import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'dl-icon',
  standalone: true,
  imports: [],
  template: ' <i [class]="variant"></i> ',
  styles: `
    :host {
      display: inline-block;

      i {
        color: inherit;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DlIconComponent {
  @Input() variant = '';
}
