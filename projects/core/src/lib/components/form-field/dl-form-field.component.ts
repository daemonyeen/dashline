import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DlInputComponent, DlInputState } from '../input/dl-input.component';
import { takeUntil } from 'rxjs/operators';
import { DlDestroyService } from '../../services/dl-destroy.service';

@Component({
  selector: 'dl-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dl-form-field.component.html',
  styleUrls: ['./dl-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
  host: { class: 'dl-form-field' },
  exportAs: 'dlFormField',
})
export class DlFormFieldComponent implements AfterContentInit {
  // --- @deps ---
  private readonly _onDestroy$ = inject(DlDestroyService);
  private readonly _cdr = inject(ChangeDetectorRef);

  // --- @template ---
  @ContentChild(DlInputComponent, { read: DlInputComponent })
  input!: DlInputComponent;

  // --- @inputs ---
  formSubmitted = input(true);
  manualInvalid = input<boolean>();

  // --- @protected ---
  protected _state = signal<DlInputState>('idle');
  protected _valid = signal(true);

  protected get _formFieldClasses() {
    return {
      [this._state()]: this._state(),
      invalid: !this._valid(),
      'is-textarea': this.input?.isTextarea,
    };
  }

  // --- @public ---
  readonly state = this._state.asReadonly();

  get invalid(): boolean {
    if (typeof this.manualInvalid() === 'boolean') {
      return Boolean(this.formSubmitted() && this.manualInvalid());
    }

    return this.formSubmitted() && !this._valid();
  }

  ngAfterContentInit() {
    if (!this.input) {
      return;
    }
    this.input.state$.pipe(takeUntil(this._onDestroy$)).subscribe(state => {
      this._state.set(state);
      this._cdr.detectChanges();
    });
    this.input.valid$.pipe(takeUntil(this._onDestroy$)).subscribe(valid => {
      this._valid.set(valid);
      this._cdr.detectChanges();
    });
  }
}
