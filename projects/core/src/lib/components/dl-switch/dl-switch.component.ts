import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { DlSwitchContentComponent } from '../dl-switch-content/dl-switch-content.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DlLetDirective } from '../../directives/let/dl-let.directive';
import { DlDestroyService } from '../../services/dl-destroy.service';
import { DlNavModule } from '../nav/dl-nav.module';

interface DlSwitchMetadata {
  id: string;
  label: string;
  labelTemplate: Observable<TemplateRef<any>>;
  disabled?: boolean;
}

@Component({
  selector: 'dl-switch',
  standalone: true,
  imports: [CommonModule, DlNavModule, DlLetDirective],
  templateUrl: './dl-switch.component.html',
  styleUrls: ['./dl-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
  host: {
    class: 'dl-switch',
    ngSkipHydration: 'true',
  },
})
export class DlSwitchComponent implements AfterContentInit {
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _onDestroy$ = inject(DlDestroyService);

  @Output()
  switchContentChange = new EventEmitter<string | null>();

  @ContentChildren(DlSwitchContentComponent, {
    read: DlSwitchContentComponent,
  })
  protected _switchContent!: QueryList<DlSwitchContentComponent>;

  protected _switchMetadata$ = new BehaviorSubject<DlSwitchMetadata[]>([]);
  protected _activeSwitchContent$ = new BehaviorSubject<string | null>(null);
  protected _activeSwitchContentTemplateRef$: Observable<TemplateRef<any> | null> =
    of(null);

  get activeSwitchContent(): string | null {
    return this._activeSwitchContent$.value;
  }

  ngAfterContentInit() {
    this._updateSwitchMetadata();

    merge(...this._switchContent.map(step => step.stateChange$))
      .pipe(debounceTime(50), takeUntil(this._onDestroy$))
      .subscribe(() => {
        this._updateSwitchMetadata();
      });

    if (!this._switchContent || !this._switchContent.length) {
      return;
    }

    this.setActiveSwitchContent(this._switchContent.first.id());
  }

  private _updateSwitchMetadata() {
    this._switchMetadata$.next(
      this._switchContent.reduce(
        (switchMetadata, switchContent) =>
          [
            ...switchMetadata,
            {
              id: switchContent.id(),
              label: switchContent.label(),
              labelTemplate: switchContent.labelTemplateRef$,
              disabled: switchContent.disabled,
            } as DlSwitchMetadata,
          ].filter(({ disabled }) => !disabled),
        [] as DlSwitchMetadata[],
      ),
    );
  }

  setActiveSwitchContent(activeSwitchContentId: string) {
    this._activeSwitchContent$.next(activeSwitchContentId || null);
    this._activeSwitchContentTemplateRef$ = of(null);

    if (
      !activeSwitchContentId ||
      !this._switchContent ||
      !this._switchContent.length
    ) {
      return;
    }

    this._switchContent.forEach(switchContent => {
      if (switchContent.id() === activeSwitchContentId) {
        this._activeSwitchContentTemplateRef$ = switchContent.templateRef$;
      }
    });

    this.switchContentChange.next(this.activeSwitchContent);
    this._cdr.detectChanges();
  }
}
