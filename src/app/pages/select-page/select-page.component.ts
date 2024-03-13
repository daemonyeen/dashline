import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlSelectModule } from '../../../../projects/core/src/lib/components/select/dl-select.module';

@Component({
  selector: 'app-select-page',
  standalone: true,
  imports: [DlSelectModule],
  templateUrl: './select-page.component.html',
  styleUrl: './select-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPageComponent {}
