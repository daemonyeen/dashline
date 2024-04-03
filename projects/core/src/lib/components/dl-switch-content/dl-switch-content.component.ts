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
import { BehaviorSubject, Subject } from 'rxjs';
import { DlSwitchLabelComponent } from '../dl-switch-label/dl-switch-label.component';
import { takeUntil } from 'rxjs/operators';
import { DlDestroyService } from '../../services/dl-destroy.service';

@Component({
  selector: 'dl-switch-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dl-switch-content.component.html',
  styleUrls: ['./dl-switch-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
  host: { class: 'dl-switch-content' },
})
export class DlSwitchContentComponent
  implements AfterViewInit, AfterContentInit
{
  private readonly _onDestroy$ = inject(DlDestroyService);

  @ViewChild(TemplateRef, { read: TemplateRef })
  protected _tabTemplateRef: TemplateRef<any>;
  @ContentChild(DlSwitchLabelComponent, {
    read: DlSwitchLabelComponent,
  })
  protected _label: DlSwitchLabelComponent;

  protected _disabled = false;

  @Input() set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.stateChange$.next();
  }
  @Input() id: string;
  @Input() label: string;

  protected readonly _templateRef$ = new BehaviorSubject<TemplateRef<any>>(
    null,
  );
  protected readonly _labelTemplateRef$ = new BehaviorSubject<TemplateRef<any>>(
    null,
  );
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