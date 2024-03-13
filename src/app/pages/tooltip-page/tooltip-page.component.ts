import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlTooltipModule } from '../../../../projects/core/src/lib/components/tooltip/dl-tooltip.module';
import { DlButtonModule } from '../../../../projects/core/src/lib/components/button/dl-button.module';

@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  imports: [DlTooltipModule, DlButtonModule],
  templateUrl: './tooltip-page.component.html',
  styleUrl: './tooltip-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPageComponent {}
