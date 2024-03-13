import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  inject,
  signal,
} from '@angular/core';
import { DlCheckboxComponent } from '../checkbox/dl-checkbox.component';
import { DlDestroyService } from '../../services/dl-destroy.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'dl-checkbox-label',
  standalone: true,
  imports: [],
  templateUrl: './dl-checkbox-label.component.html',
  styleUrls: ['./dl-checkbox-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
})
export class DlCheckboxLabelComponent implements AfterContentInit {
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _onDestroy$ = inject(DlDestroyService);

  @ContentChild(DlCheckboxComponent, {
    read: DlCheckboxComponent,
  })
  protected readonly _checkbox!: DlCheckboxComponent;
  protected _disabled = signal(false);

  ngAfterContentInit() {
    if (!this._checkbox) {
      return;
    }

    this._checkbox.disabled$
      .pipe(takeUntil(this._onDestroy$))
      .subscribe(disabled => {
        this._disabled.set(disabled);
      });
    this._cdr.markForCheck();
  }

  toggle() {
    this._checkbox?.toggle();
  }
}
