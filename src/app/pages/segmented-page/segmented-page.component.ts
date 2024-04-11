import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlSegmentedModule } from '../../../../projects/core/src/lib/components/segmented/dl-segmented.module';

@Component({
  selector: 'app-segmented-page',
  standalone: true,
  imports: [DlSegmentedModule],
  templateUrl: './segmented-page.component.html',
  styleUrl: './segmented-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegmentedPageComponent {}
