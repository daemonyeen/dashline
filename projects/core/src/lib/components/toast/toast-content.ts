/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Directive } from '@angular/core';

@Directive({
  selector: '[dl-toast-label]',
  standalone: true,
  host: {
    class: 'dl-toast-label',
  },
})
export class MatSnackBarLabel {}

@Directive({
  selector: '[dl-toast-actions]',
  standalone: true,
  host: {
    class: 'dl-toast-actions',
  },
})
export class MatSnackBarActions {}

@Directive({
  selector: '[dl-toast-action]',
  standalone: true,
  host: {
    class: 'dl-toast-action',
  },
})
export class MatSnackBarAction {}
