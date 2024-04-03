import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  inject,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { DlSwitchContentComponent } from '../dl-switch-content/dl-switch-content.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { DlLetDirective } from '../../directives/let/dl-let.directive';
import { DlDestroyService } from '../../services/dl-destroy.service';

interface SwitchMetadata {
  id: string;
  label: string;
  labelTemplate: Observable<TemplateRef<any>>;
  disabled?: boolean;
}

@Component({
  selector: 'dl-switch',
  standalone: true,
  imports: [CommonModule, DlLetDirective],
  templateUrl: './dl-switch.component.html',
  styleUrls: ['./dl-switch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
  host: { class: 'dl-switch' },
})
export class DlSwitchComponent implements AfterContentInit {
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _onDestroy$ = inject(DlDestroyService);

  @ContentChildren(DlSwitchContentComponent, {
    read: DlSwitchContentComponent,
  })
  protected _switchContent: QueryList<DlSwitchContentComponent>;

  protected _switchMetadata$ = new BehaviorSubject<SwitchMetadata[]>([]);
  protected _activeSwitchContent$ = new BehaviorSubject<string>(null);
  protected _activeSwitchContentTemplateRef$: Observable<TemplateRef<any>> =
    of(null);

  activeSwitchContentChange$ = this._activeSwitchContent$.pipe(
    distinctUntilChanged(),
  );

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

    this.setActiveSwitchContent(this._switchContent.first?.id);
  }

  private _updateSwitchMetadata() {
    this._switchMetadata$.next(
      this._switchContent.reduce(
        (switchMetadata, switchContent) =>
          [
            ...switchMetadata,
            {
              id: switchContent.id,
              label: switchContent.label,
              labelTemplate: switchContent.labelTemplateRef$,
              disabled: switchContent.disabled,
            } as SwitchMetadata,
          ].filter(({ disabled }) => !disabled),
        [] as SwitchMetadata[],
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
      if (switchContent.id === activeSwitchContentId) {
        this._activeSwitchContentTemplateRef$ = switchContent.templateRef$;
      }
    });

    this._cdr.detectChanges();
  }
}
