import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlButtonComponent } from '../../../../projects/core/src/lib/components/button/dl-button.component';
import { DlMenuModule } from '../../../../projects/core/src/lib/components/menu/dl-menu.module';
import { DlIconModule } from '../../../../projects/core/src/lib/components/icon/dl-icon.module';

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [DlButtonComponent, DlIconModule, DlMenuModule],
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPageComponent {}
