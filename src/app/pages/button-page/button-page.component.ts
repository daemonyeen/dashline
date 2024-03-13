import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlButtonModule } from '../../../../projects/core/src/lib/components/button/dl-button.module';
import { DlLoaderModule } from '../../../../projects/core/src/lib/components/loader/dl-loader.module';
import { DlIconModule } from '../../../../projects/core/src/lib/components/icon/dl-icon.module';

@Component({
  selector: 'app-button-page',
  standalone: true,
  imports: [DlButtonModule, DlLoaderModule, DlIconModule],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPageComponent {}
