import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlAlertModule } from '../../../../projects/core/src/lib/components/alert/dl-alert.module';
import { DlButtonModule } from '../../../../projects/core/src/lib/components/button/dl-button.module';

@Component({
  selector: 'app-alert-page',
  standalone: true,
  imports: [DlAlertModule, DlButtonModule],
  templateUrl: './alert-page.component.html',
  styleUrl: './alert-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPageComponent {}
