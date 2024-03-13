import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlFormsModule } from '../../../../projects/core/src/lib/components/form-field/dl-forms.module';

@Component({
  selector: 'app-checkbox-page',
  standalone: true,
  imports: [DlFormsModule],
  templateUrl: './checkbox-page.component.html',
  styleUrl: './checkbox-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxPageComponent {}
