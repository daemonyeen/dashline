import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isNil, isObject } from 'lodash-es';

export function dlObjRequiredValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    return isNil(value) || !isObject(value)
      ? ({ object: true } as ValidationErrors)
      : null;
  };
}
