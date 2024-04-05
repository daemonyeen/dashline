import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlToggleModule } from '../../../../projects/core/src/lib/components/toggle/dl-toggle.module';

@Component({
  selector: 'app-toggle-page',
  standalone: true,
  imports: [DlToggleModule],
  templateUrl: './toggle-page.component.html',
  styleUrl: './toggle-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TogglePageComponent {}
