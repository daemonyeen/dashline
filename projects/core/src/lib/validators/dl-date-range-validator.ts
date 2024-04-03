import { FormGroup, ValidationErrors } from '@angular/forms';
import { parse } from 'date-fns';
import { dlIsDate } from '../helpers/is-date';

/**
 * Проверяет что дата `to` раньше даты `from`
 * @param fromControl Название элемента формы `from` в `FormGroup`
 * @param toControl Название элемента формы `to` в `FormGroup`
 * @param parseFormat Формат даты который используется для элементов формы
 * @return `{ 'dateRange': true }` в случае ошибки, `null` в противном случае
 * @example
 * ```
 * readonly form = new FormGroup({
 *  fromDate: new FormControl(),
 *  toDate: new FormControl(),
 * }, [dlDateRangeValidator('fromDate', 'toDate')])
 * ```
 */
export function dlDateRangeValidator(
  fromControl: string,
  toControl: string,
  parseFormat: string,
) {
  return (control: FormGroup): ValidationErrors | null => {
    const from = control.get(fromControl);
    const to = control.get(toControl);

    if (!from || !to || !parseFormat) {
      return null;
    }

    const fromDate = parse(from.value, parseFormat, new Date());
    const toDate = parse(to.value, parseFormat, new Date());

    if (
      !dlIsDate(fromDate) ||
      !dlIsDate(toDate) ||
      fromDate.getTime() <= toDate.getTime()
    ) {
      return null;
    }

    return { dateRange: true };
  };
}
