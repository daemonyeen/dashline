import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlPopoverModule } from '../../../../projects/core/src/lib/components/popover/dl-popover.module';
import { DlButtonModule } from '../../../../projects/core/src/lib/components/button/dl-button.module';
import { DlFormsModule } from '../../../../projects/core/src/lib/components/form-field/dl-forms.module';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [DlButtonModule, DlPopoverModule, DlFormsModule],
  templateUrl: './popover-page.component.html',
  styleUrl: './popover-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverPageComponent {}
