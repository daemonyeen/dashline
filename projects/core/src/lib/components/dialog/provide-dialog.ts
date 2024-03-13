import {
  EnvironmentProviders,
  importProvidersFrom,
  Provider,
} from '@angular/core';
import {
  DEFAULT_DIALOG_CONFIG,
  DialogConfig,
  DialogModule,
} from '@angular/cdk/dialog';
import { DlDialogService } from './dl-dialog.service';

export const provideDialog = (): (Provider | EnvironmentProviders)[] => [
  DlDialogService,
  {
    provide: DEFAULT_DIALOG_CONFIG,
    useValue: {
      hasBackdrop: true,
      backdropClass: 'overlay-dialog-backdrop',
    } as DialogConfig,
  },
  importProvidersFrom(DialogModule),
];
