import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  addDays,
  addMonths,
  isSameDay,
  isSameMonth,
  isSameWeek,
  parse,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns';
import { DlButtonModule } from '../button/dl-button.module';
import { DlIconModule } from '../icon/dl-icon.module';
import { dlIsDate } from '../../helpers/is-date';

export const DL_DATE_FORMAT = 'dd.MM.yyyy';

@Component({
  selector: 'dl-calendar-picker',
  standalone: true,
  imports: [CommonModule, DlButtonModule, DlIconModule],
  templateUrl: './dl-calendar-picker.component.html',
  styleUrls: ['./dl-calendar-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DlCalendarPickerComponent implements OnInit {
  readonly dateFormat = input(DL_DATE_FORMAT);

  @Input()
  set selectedDate(date: Date | string) {
    if (typeof date === 'string') {
      date = parse(date, this.dateFormat(), new Date()) as Date;
    }

    if (!dlIsDate(date)) {
      return;
    }

    this._selectedDate = date;

    if (this._initial) {
      this._screenDate = date;
      this._initial = false;
    }
  }

  @Output()
  dateChange = new EventEmitter<Date>();

  weeks: Date[][] = [];

  _initial = true;
  _selectedDate = new Date();
  _screenDate = new Date();

  ngOnInit() {
    this.weeks = this._getCalendarScreen();
  }

  isSelectedDate(day: Date): boolean {
    return isSameDay(day, this._selectedDate);
  }

  isSameMonth(day: Date): boolean {
    return isSameMonth(day, this._screenDate);
  }

  nextMonth() {
    this._screenDate = addMonths(this._screenDate, 1);
    this.weeks = this._getCalendarScreen();
  }

  prevMonth() {
    this._screenDate = subMonths(this._screenDate, 1);
    this.weeks = this._getCalendarScreen();
  }

  onSelect(date: Date) {
    this.dateChange.emit(date);
  }

  getScreenDate(): Date {
    return this._screenDate;
  }

  private _getCalendarScreen(): Date[][] {
    const days: Date[][] = [];
    const currentMonth = startOfMonth(this._screenDate);
    let currentWeek = currentMonth;
    let currentDay = currentWeek;

    while (isSameMonth(currentMonth, currentWeek)) {
      days.push([]);

      while (
        isSameWeek(currentWeek, currentDay) &&
        isSameMonth(currentMonth, currentDay)
      ) {
        days[days.length - 1].push(currentDay);
        currentDay = addDays(currentDay, 1);
      }

      currentWeek = currentDay;
    }

    if (days[days.length - 1].length < 7) {
      days[days.length - 1] = [
        ...days[days.length - 1],
        ...Array.from(Array(7 - days[days.length - 1].length))
          .map((v, i) => i)
          .map(i => addDays(currentDay, i)),
      ];
    }

    if (days[0].length < 7) {
      currentDay = currentMonth;
      days[0] = [
        ...Array.from(Array(7 - days[0].length))
          .map((v, i) => i + 1)
          .map(i => subDays(currentDay, i)),
        ...days[0],
      ];
    }

    return days;
  }
}
