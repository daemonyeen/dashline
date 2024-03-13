import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { OverlayModule, ScrollStrategyOptions } from '@angular/cdk/overlay';
import {
  DL_DATE_FORMAT,
  DlCalendarPickerComponent,
} from '../calendar-picker/dl-calendar-picker.component';
import { DlIconModule } from '../icon/dl-icon.module';
import { DlButtonModule } from '../button/dl-button.module';
import { DlInputComponent } from '../input/dl-input.component';
import { DL_CALENDAR_POSITIONS } from '../menu/dl-overlay-positions';
import { format, parse } from 'date-fns';
import { dlIsDate } from '../../helpers/is-date';
import { overlayAnimation } from '../../animations/overlay-animation';
import { DL_OVERLAY_HOST, DlOverlayHost } from '../../classes/dl-overlay-host';

@Component({
  selector: 'dl-calendar',
  standalone: true,
  imports: [
    OverlayModule,
    DlIconModule,
    DlButtonModule,
    DlCalendarPickerComponent,
  ],
  templateUrl: './dl-calendar.component.html',
  styleUrls: ['./dl-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [overlayAnimation],
  providers: [
    {
      provide: DL_OVERLAY_HOST,
      useExisting: DlCalendarComponent,
    },
  ],
  host: { class: 'dl-calendar' },
  exportAs: 'dlCalendar',
})
export class DlCalendarComponent extends DlOverlayHost {
  // --- @inputs ---
  readonly dateFormat = input(DL_DATE_FORMAT);
  readonly target = input<DlInputComponent>();

  // --- @protected ---
  protected readonly _positions = DL_CALENDAR_POSITIONS;
  protected readonly _scrollStrategy = inject(
    ScrollStrategyOptions,
  ).reposition();

  // --- @public ---
  override select() {}

  get selectedDate(): Date {
    const target = this.target();

    if (!target || !target.ngControl) {
      return new Date();
    }

    const selectedDate = parse(
      target.ngControl.value,
      this.dateFormat(),
      new Date(),
    );

    return dlIsDate(selectedDate) ? selectedDate : new Date();
  }

  setDate(date: Date) {
    const target = this.target();

    if (!target || !target.ngControl) {
      return;
    }

    target.ngControl.form.patchValue(format(date, this.dateFormat()));
    this.close();
  }
}
