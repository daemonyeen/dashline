import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { parse } from 'date-fns';
import { DateFormat } from '../../../../../src/app/config/date-format';
import { dlIsDate } from '../helpers/is-date';

export function dlDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = parse(control.value, DateFormat.DayMonthYear, new Date());

    if (!value) {
      return null;
    }

    return dlIsDate(value)
      ? null
      : {
          date: true,
        };
  };
}
