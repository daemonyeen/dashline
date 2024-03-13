import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DlToastRef } from './toast-ref';
import { DlButtonModule } from '../button/dl-button.module';
import { DL_TOAST_DATA } from './toast-config';

/**
 * Interface for a simple snack bar component that has a message and a single action.
 */
export interface TextOnlySnackBar {
  data: { message: string; action: string };
  toastRef: DlToastRef<TextOnlySnackBar>;
  action: () => void;
  hasAction: boolean;
}

@Component({
  selector: 'dl-toast',
  templateUrl: 'dl-toast.component.html',
  styleUrl: 'dl-toast.component.scss',
  exportAs: 'dlToast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DlButtonModule],
  standalone: true,
  host: {
    class: 'dl-toast',
  },
})
export class ToastComponent implements TextOnlySnackBar {
  public toastRef: DlToastRef<ToastComponent> = inject(DlToastRef);
  public data: { message: string; action: string } = inject(DL_TOAST_DATA);

  get hasAction(): boolean {
    return !!this.data.action;
  }

  action() {
    this.toastRef.dismissWithAction();
  }
}
