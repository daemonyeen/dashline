import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlBadgeModule } from '../../../../projects/core/src/lib/components/badge/dl-badge.module';

@Component({
  selector: 'app-badge-page',
  standalone: true,
  imports: [DlBadgeModule],
  templateUrl: './badge-page.component.html',
  styleUrl: './badge-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgePageComponent {}
