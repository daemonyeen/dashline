import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

@Component({
  selector: 'dl-badge',
  standalone: true,
  imports: [],
  templateUrl: './dl-badge.component.html',
  styleUrl: './dl-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-badge' },
})
export class DlBadgeComponent {
  appearance = input<
    'primary' | 'secondary' | 'destructive' | 'outline' | 'primary-outline'
  >('primary');

  @HostBinding('class')
  get hostClasses() {
    return {
      [this.appearance()]: this.appearance(),
    };
  }
}
