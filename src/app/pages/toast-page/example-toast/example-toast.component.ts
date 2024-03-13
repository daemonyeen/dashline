import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlButtonModule } from '../../../../../projects/core/src/lib/components/button/dl-button.module';

@Component({
  selector: 'app-example-toast',
  standalone: true,
  imports: [DlButtonModule],
  templateUrl: './example-toast.component.html',
  styleUrl: './example-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-toast' },
})
export class ExampleToastComponent {}
