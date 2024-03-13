import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlIconComponent } from '../../../../projects/core/src/lib/components/icon/dl-icon.component';
import { DlFormsModule } from '../../../../projects/core/src/lib/components/form-field/dl-forms.module';

@Component({
  selector: 'app-input-page',
  standalone: true,
  imports: [DlIconComponent, DlFormsModule],
  templateUrl: './input-page.component.html',
  styleUrl: './input-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPageComponent {}
