import { ViewContainerRef, InjectionToken } from '@angular/core';

export const DL_TOAST_DATA = new InjectionToken<any>('dl-toast-data');

export type DlToastHorizontalPosition =
  | 'start'
  | 'center'
  | 'end'
  | 'left'
  | 'right';

export type DlToastVerticalPosition = 'top' | 'bottom';

export class DlToastConfig<D = any> {
  viewContainerRef?: ViewContainerRef;
  duration? = 5000;
  panelClass?: string | string[];
  data?: D | null = null;
  horizontalPosition?: DlToastHorizontalPosition = 'center';
  verticalPosition?: DlToastVerticalPosition = 'top';
}
