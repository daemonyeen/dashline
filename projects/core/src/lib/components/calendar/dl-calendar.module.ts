import { NgModule } from '@angular/core';
import { DlCalendarComponent } from './dl-calendar.component';
import { DlCalendarPickerComponent } from '../calendar-picker/dl-calendar-picker.component';

@NgModule({
  imports: [DlCalendarComponent, DlCalendarPickerComponent],
  exports: [DlCalendarComponent, DlCalendarPickerComponent],
})
export class DlCalendarModule {}
