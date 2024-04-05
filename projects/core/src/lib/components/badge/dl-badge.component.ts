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
  // --- @inputs ---
  appearance = input<'primary' | 'secondary' | 'destructive' | 'outline'>(
    'primary',
  );

  // --- @protected ---
  @HostBinding('class')
  protected get _hostClasses() {
    return {
      [this.appearance()]: true,
    };
  }
}
