import { isDate } from 'date-fns';

export function dlIsDate(date: any): date is Date {
  return isDate(date) && date.toString() !== 'Invalid Date';
}
