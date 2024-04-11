import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';

export type DlBadgeSize = 'sm' | 'md';

export type DLBadgeAppearance =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'success-alt'
  | 'warning'
  | 'warning-alt'
  | 'destructive'
  | 'destructive-alt'
  | 'outline';

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
  // --- @inputs ---
  appearance = input<DLBadgeAppearance>('primary');
  size = input<DlBadgeSize>('md');

  // --- @protected ---
  @HostBinding('class')
  protected get _hostClasses() {
    return {
      [this.appearance()]: true,
      [this.size()]: true,
    };
  }
}
