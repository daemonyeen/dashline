import { NgModule } from '@angular/core';
import { DlSelectComponent } from './dl-select.component';
import { DlOptionComponent } from '../option/dl-option.component';
import { DlErrorComponent } from '../error/dl-error.component';
import { DlLabelComponent } from '../label/dl-label.component';

@NgModule({
  imports: [
    DlSelectComponent,
    DlLabelComponent,
    DlOptionComponent,
    DlErrorComponent,
  ],
  exports: [
    DlSelectComponent,
    DlLabelComponent,
    DlOptionComponent,
    DlErrorComponent,
  ],
})
export class DlSelectModule {}
