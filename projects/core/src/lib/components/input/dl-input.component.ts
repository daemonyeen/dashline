import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Injector,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';

import { FormControlDirective, NgControl } from '@angular/forms';
import { DlFormFieldComponent } from '../form-field/dl-form-field.component';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';

export type DlInputState = 'idle' | 'focused' | 'disabled';

@Component({
  selector: 'input[dl-input], textarea[dl-input]',
  standalone: true,
  imports: [],
  templateUrl: './dl-input.component.html',
  styleUrls: ['./dl-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-input' },
  exportAs: 'dlInput',
})
export class DlInputComponent implements OnInit, OnDestroy {
  private readonly _document = inject(DOCUMENT);
  private readonly _injector = inject(Injector);
  private readonly _platform = inject(PLATFORM_ID);
  private readonly _host = inject(DlFormFieldComponent, {
    host: true,
    optional: true,
  });
  readonly elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);

  private readonly _state = signal<DlInputState>('idle');
  private readonly _valid = signal(true);

  readonly state$ = toObservable(this._state);
  readonly valid$ = toObservable(this._valid);

  private _interval: any;

  isTextarea = false;
  ngControl: FormControlDirective | null = null;

  ngOnInit() {
    const input = this.elementRef.nativeElement;

    this.isTextarea = input.tagName === 'TEXTAREA';
    this.ngControl = this._injector.get(NgControl, null, {
      optional: true,
    }) as FormControlDirective;

    if (isPlatformBrowser(this._platform)) {
      this._interval = setInterval(this.update.bind(this), 50);
    }
  }

  ngOnDestroy() {
    clearInterval(this._interval);
  }

  update() {
    const input = this.elementRef.nativeElement;
    const focused = input === this._document.activeElement;
    const formSubmitted = this._host ? this._host.formSubmitted() : true;
    const manualInvalid = this._host ? this._host.manualInvalid() : false;

    let state: DlInputState = 'idle';

    if (focused) {
      state = 'focused';
    }

    if (input.disabled) {
      state = 'disabled';
    }

    this._state.set(state);

    this._valid.set(
      manualInvalid
        ? !formSubmitted || !manualInvalid
        : !formSubmitted || !input.classList.contains('ng-invalid'),
    );
  }

  clear() {
    const input = this.elementRef.nativeElement;

    input.value = '';
  }

  set(value: string) {
    if (!this.ngControl) {
      const input = this.elementRef.nativeElement;

      input.value = value;

      return;
    }

    this.ngControl.control.setValue(value);
  }

  blur() {
    const input = this.elementRef.nativeElement;

    input.blur();
  }
}
