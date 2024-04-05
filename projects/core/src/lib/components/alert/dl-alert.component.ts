import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  input,
} from '@angular/core';
import { DlIconModule } from '../icon/dl-icon.module';

export type DlAlertAppearance = 'info' | 'warning' | 'success' | 'error';

@Component({
  selector: 'dl-alert',
  standalone: true,
  imports: [DlIconModule],
  templateUrl: './dl-alert.component.html',
  styleUrl: './dl-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-alert' },
})
export class DlAlertComponent {
  // --- @inputs ---
  appearance = input<DlAlertAppearance>('info');
  icon = input<string>();
  rounded = input(true);
  compact = input(false);

  // --- @protected ---
  @HostBinding('class')
  protected get _hostClasses() {
    return {
      [this.appearance()]: true,
      rounded: this.rounded(),
      compact: this.compact(),
    };
  }
}
