import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlSwitchModule } from '../../../../projects/core/src/lib/components/dl-switch/dl-switch.module';

@Component({
  selector: 'app-switch-page',
  standalone: true,
  imports: [DlSwitchModule],
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchPageComponent {}
