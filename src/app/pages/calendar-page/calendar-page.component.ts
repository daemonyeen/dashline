import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlCalendarModule } from '../../../../projects/core/src/lib/components/calendar/dl-calendar.module';
import { DlFormsModule } from '../../../../projects/core/src/lib/components/form-field/dl-forms.module';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { format } from 'date-fns';
import { DL_DATE_FORMAT } from '../../../../projects/core/src/lib/components/calendar-picker/dl-calendar-picker.component';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [ReactiveFormsModule, DlFormsModule, DlCalendarModule],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPageComponent {
  dateControl = new FormControl(format(new Date(), DL_DATE_FORMAT));
}
