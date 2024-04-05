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
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DlDestroyService } from '../../services/dl-destroy.service';
import { DlTabComponent } from '../tab/dl-tab.component';
import { CommonModule } from '@angular/common';
import { DlLetDirective } from '../../directives/let/dl-let.directive';

export type DlTabMetadata = Readonly<{
  id: string;
  label: string;
  labelTemplate: Observable<TemplateRef<any>>;
  disabled?: boolean;
}>;

@Component({
  selector: 'dl-tabs',
  standalone: true,
  imports: [CommonModule, DlLetDirective],
  templateUrl: './dl-tabs.component.html',
  styleUrls: ['./dl-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
  host: { class: 'dl-tabs' },
})
export class DlTabsComponent implements AfterContentInit {
  // --- @deps ---
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _onDestroy$ = inject(DlDestroyService);

  // --- @template ---
  @ContentChildren(DlTabComponent, {
    read: DlTabComponent,
  })
  protected _tabs!: QueryList<DlTabComponent>;

  // --- @inputs ---
  @Output()
  tabChange = new EventEmitter<string>();

  // --- @protected---
  protected _tabsMetadata$ = new BehaviorSubject<DlTabMetadata[]>([]);
  protected _activeTab$ = new BehaviorSubject<string | null>(null);
  protected _activeTabTemplateRef$: Observable<TemplateRef<any> | null> =
    of(null);

  get activeTab(): string | null {
    return this._activeTab$.value;
  }

  // --- @public ---
  ngAfterContentInit() {
    this._updateTabsMetadata();

    merge(...this._tabs.map(tab => tab.stateChange$))
      .pipe(debounceTime(50), takeUntil(this._onDestroy$))
      .subscribe(() => {
        this._updateTabsMetadata();
      });

    if (!this._tabs || !this._tabs.length) {
      return;
    }

    this.setActiveTab(this._tabs.first.id());
  }

  private _updateTabsMetadata() {
    this._tabsMetadata$.next(
      this._tabs.reduce(
        (tabsMetadata, tab) =>
          [
            ...tabsMetadata,
            {
              id: tab.id(),
              label: tab.label(),
              labelTemplate: tab.labelTemplateRef$,
              disabled: tab.disabled,
            } as DlTabMetadata,
          ].filter(({ disabled }) => !disabled),
        [] as DlTabMetadata[],
      ),
    );
  }

  setActiveTab(activeTabId: string) {
    this._activeTab$.next(activeTabId || null);
    this._activeTabTemplateRef$ = of(null);

    if (!activeTabId || !this._tabs || !this._tabs.length) {
      return;
    }

    this._tabs.forEach(tab => {
      if (tab.id() === activeTabId) {
        this._activeTabTemplateRef$ = tab.templateRef$;
      }
    });

    this.tabChange.next(activeTabId);
    this._cdr.detectChanges();
  }
}
