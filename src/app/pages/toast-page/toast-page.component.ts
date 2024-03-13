import {
  ChangeDetectionStrategy,
  Component,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DlButtonModule } from '../../../../projects/core/src/lib/components/button/dl-button.module';
import { DlToastService } from '../../../../projects/core/src/lib/components/toast/dl-toast.service';
import { DlDestroyService } from '../../../../projects/core/src/lib/services/dl-destroy.service';
import { takeUntil } from 'rxjs/operators';
import { ExampleToastComponent } from './example-toast/example-toast.component';

@Component({
  selector: 'app-toast-page',
  standalone: true,
  imports: [DlButtonModule],
  templateUrl: './toast-page.component.html',
  styleUrl: './toast-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
})
export class ToastPageComponent {
  private readonly _toast = inject(DlToastService);
  private readonly _onDestroy$ = inject(DlDestroyService);

  @ViewChild('toast', {
    read: TemplateRef,
  })
  readonly template!: TemplateRef<any>;

  openToast() {
    this._toast.open('Event successfully added to calendar');
  }

  openActionToast() {
    this._toast
      .open('Event successfully added to calendar', 'Undo')
      .onAction()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(() => {
        alert('Toast action');
      });
  }

  openFromComponent() {
    this._toast.openFromComponent(ExampleToastComponent);
  }

  openFromTemplate() {
    this._toast.openFromTemplate(this.template);
  }
}
