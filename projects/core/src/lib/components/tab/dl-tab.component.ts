import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { DlTabLabelComponent } from '../tab-label/dl-tab-label.component';
import { takeUntil } from 'rxjs/operators';
import { DlDestroyService } from '../../services/dl-destroy.service';

@Component({
  selector: 'dl-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dl-tab.component.html',
  styleUrls: ['./dl-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
  host: { class: 'dl-tab' },
})
export class DlTabComponent implements AfterViewInit, AfterContentInit {
  private readonly _onDestroy$ = inject(DlDestroyService);

  @ViewChild(TemplateRef, { read: TemplateRef })
  protected _tabTemplateRef!: TemplateRef<any>;

  @ContentChild(DlTabLabelComponent, {
    read: DlTabLabelComponent,
  })
  protected _label!: DlTabLabelComponent;
  protected _disabled = false;

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.stateChange$.next();
  }
  @Input({ required: true }) id = '';
  @Input() label = '';

  protected readonly _templateRef$ = new ReplaySubject<TemplateRef<any>>(1);
  protected readonly _labelTemplateRef$ =
    new BehaviorSubject<TemplateRef<any> | null>(null);
  readonly stateChange$ = new Subject<void>();
  readonly templateRef$ = this._templateRef$.asObservable();
  readonly labelTemplateRef$ = this._labelTemplateRef$.asObservable();

  get disabled(): boolean {
    return this._disabled;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this._templateRef$.next(this._tabTemplateRef);
    });
  }

  ngAfterContentInit() {
    if (!this._label) {
      return;
    }

    this._label.templateRef$
      ?.pipe(takeUntil(this._onDestroy$))
      .subscribe(labelTemplateRef => {
        this._labelTemplateRef$.next(labelTemplateRef);
      });
  }
}
