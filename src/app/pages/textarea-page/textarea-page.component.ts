import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlFormsModule } from '../../../../projects/core/src/lib/components/form-field/dl-forms.module';

@Component({
  selector: 'app-textarea-page',
  standalone: true,
  imports: [DlFormsModule],
  templateUrl: './textarea-page.component.html',
  styleUrl: './textarea-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaPageComponent {}
