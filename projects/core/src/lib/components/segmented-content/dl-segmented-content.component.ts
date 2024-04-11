import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  input,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { DlSegmentedLabelComponent } from '../segmented-label/dl-segmented-label.component';
import { takeUntil } from 'rxjs/operators';
import { DlDestroyService } from '../../services/dl-destroy.service';

@Component({
  selector: 'dl-segmented-content',
  standalone: true,
  imports: [],
  templateUrl: './dl-segmented-content.component.html',
  styleUrls: ['./dl-segmented-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
  host: { class: 'dl-segmented-content' },
})
export class DlSegmentedContentComponent
  implements AfterViewInit, AfterContentInit
{
  private readonly _onDestroy$ = inject(DlDestroyService);

  @ViewChild(TemplateRef, { read: TemplateRef })
  protected _tabTemplateRef!: TemplateRef<any>;
  @ContentChild(DlSegmentedLabelComponent, {
    read: DlSegmentedLabelComponent,
  })
  protected _label!: DlSegmentedLabelComponent;
  protected _disabled = false;

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.stateChange$.next();
  }

  id = input.required<string>();
  label = input('');

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
