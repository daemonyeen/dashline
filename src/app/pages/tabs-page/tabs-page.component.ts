import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlTabsModule } from '../../../../projects/core/src/lib/components/tabs/dl-tabs.module';

@Component({
  selector: 'app-tab-page',
  standalone: true,
  imports: [DlTabsModule],
  templateUrl: './tabs-page.component.html',
  styleUrl: './tabs-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPageComponent {}
