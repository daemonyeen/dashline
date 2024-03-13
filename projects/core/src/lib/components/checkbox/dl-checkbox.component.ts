import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  model,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { JsonPipe, NgClass } from '@angular/common';
import { checkAnimation } from '../../animations/check-animation';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dl-checkbox',
  standalone: true,
  imports: [NgClass, JsonPipe],
  templateUrl: './dl-checkbox.component.html',
  styleUrls: ['./dl-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [checkAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DlCheckboxComponent,
      multi: true,
    },
  ],
  host: { class: 'dl-checkbox transition-colors' },
  exportAs: 'dlCheckbox',
})
export class DlCheckboxComponent implements ControlValueAccessor {
  protected _checked = signal(false);

  disabled = model(false);

  readonly disabled$ = toObservable(this.disabled);

  onChange?: (value: boolean) => {};
  onTouched?: () => {};

  get animationState(): 'checked' | 'unchecked' {
    return this._checked() ? 'checked' : 'unchecked';
  }

  @HostListener('click')
  toggle() {
    if (this.disabled()) {
      return;
    }

    this._checked.set(!this._checked());

    if (!this.onChange) {
      return;
    }

    this.onChange(this._checked());
  }

  registerOnChange(fn: typeof this.onChange) {
    this.onChange = fn;
  }

  registerOnTouched(fn: typeof this.onTouched) {
    this.onTouched = fn;
  }

  writeValue(checked: boolean): void {
    this._checked.set(checked);
  }

  setDisabledState(disabled: boolean): void {
    this.disabled.set(disabled);
  }
}
