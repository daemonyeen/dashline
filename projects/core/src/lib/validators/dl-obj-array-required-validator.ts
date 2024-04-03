import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isArray, isNil, isObject } from 'lodash-es';

export function dlObjArrayRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    return !isArray(value) || !value.every(val => !isNil(val) && isObject(val))
      ? ({ objectArr: true } as ValidationErrors)
      : null;
  };
}
