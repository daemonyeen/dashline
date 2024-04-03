import { NgModule } from '@angular/core';
import { DlFormFieldComponent } from './dl-form-field.component';
import { DlLabelComponent } from '../label/dl-label.component';
import { DlInputComponent } from '../input/dl-input.component';
import { DlErrorComponent } from '../error/dl-error.component';
import { DlCheckboxComponent } from '../checkbox/dl-checkbox.component';
import { DlCheckboxLabelComponent } from '../checkbox-label/dl-checkbox-label.component';
import { DlHintComponent } from '../hint/dl-hint.component';

@NgModule({
  imports: [
    DlFormFieldComponent,
    DlLabelComponent,
    DlErrorComponent,
    DlHintComponent,
    DlInputComponent,
    DlCheckboxComponent,
    DlCheckboxLabelComponent,
  ],
  exports: [
    DlFormFieldComponent,
    DlLabelComponent,
    DlErrorComponent,
    DlHintComponent,
    DlInputComponent,
    DlCheckboxComponent,
    DlCheckboxLabelComponent,
  ],
})
export class DlFormsModule {}
