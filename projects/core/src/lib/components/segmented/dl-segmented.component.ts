import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  inject,
  input,
  NgZone,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { DlSegmentedContentComponent } from '../segmented-content/dl-segmented-content.component';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, merge, Observable, of } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DlLetDirective } from '../../directives/let/dl-let.directive';
import { DlDestroyService } from '../../services/dl-destroy.service';
import { DlNavModule } from '../nav/dl-nav.module';

interface DlSegmentedContentMetadata {
  id: string;
  label: string;
  labelTemplate: Observable<TemplateRef<any>>;
  disabled?: boolean;
}

@Directive({
  selector: '[dl-segmented-tab]',
  standalone: true,
})
class DlSegmentedTab {}

@Directive({
  selector: '[dl-segmented-indicator]',
  standalone: true,
})
class DlSegmentedIndicator {}

@Component({
  selector: 'dl-segmented',
  standalone: true,
  imports: [
    CommonModule,
    DlNavModule,
    DlLetDirective,
    DlSegmentedTab,
    DlSegmentedIndicator,
  ],
  templateUrl: './dl-segmented.component.html',
  styleUrls: ['./dl-segmented.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DlDestroyService],
  host: {
    class: 'dl-segmented',
    ngSkipHydration: 'true',
  },
})
export class DlSegmentedComponent implements AfterViewInit, AfterContentInit {
  // --- @deps ---
  private readonly _zone = inject(NgZone);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _onDestroy$ = inject(DlDestroyService);

  // --- @inputs ---
  @Output()
  activeContentChange = new EventEmitter<string | null>();

  appearance = input<'nav' | 'tabs'>('nav');

  // --- @template ---
  @ContentChildren(DlSegmentedContentComponent, {
    read: DlSegmentedContentComponent,
  })
  protected _children!: QueryList<DlSegmentedContentComponent>;

  @ViewChildren(DlSegmentedTab, {
    read: ElementRef,
  })
  protected _tabs!: QueryList<ElementRef<HTMLButtonElement>>;

  @ViewChild(DlSegmentedIndicator, {
    read: ElementRef<HTMLElement>,
  })
  protected _indicator!: ElementRef;

  // --- @protected ---
  protected _childrenMetadata$ = new BehaviorSubject<
    DlSegmentedContentMetadata[]
  >([]);
  protected _activeContent$ = new BehaviorSubject<string | null>(null);
  protected _activeContentTemplateRef$: Observable<TemplateRef<any> | null> =
    of(null);

  @HostBinding('class')
  protected get _hostClasses() {
    return {
      [this.appearance()]: true,
    };
  }

  // --- @public ---
  get activeContent(): string | null {
    return this._activeContent$.value;
  }

  ngAfterViewInit() {
    if (this.appearance() !== 'tabs') {
      return;
    }

    this.update();
  }

  ngAfterContentInit() {
    this._updateMetadata();

    merge(...this._children.map(step => step.stateChange$))
      .pipe(debounceTime(50), takeUntil(this._onDestroy$))
      .subscribe(() => {
        this._updateMetadata();
      });

    if (!this._children || !this._children.length) {
      return;
    }

    this.setActiveContent(this._children.first.id());
  }

  private _updateMetadata() {
    this._childrenMetadata$.next(
      this._children.reduce(
        (metaData, segmentedContent) =>
          [
            ...metaData,
            {
              id: segmentedContent.id(),
              label: segmentedContent.label(),
              labelTemplate: segmentedContent.labelTemplateRef$,
              disabled: segmentedContent.disabled,
            } as DlSegmentedContentMetadata,
          ].filter(({ disabled }) => !disabled),
        [] as DlSegmentedContentMetadata[],
      ),
    );
  }

  setActiveContent(activeContentId: string) {
    this._activeContent$.next(activeContentId || null);
    this._activeContentTemplateRef$ = of(null);

    if (!activeContentId || !this._children || !this._children.length) {
      return;
    }

    this._children.forEach(segmentedContent => {
      if (segmentedContent.id() === activeContentId) {
        this._activeContentTemplateRef$ = segmentedContent.templateRef$;
      }
    });

    this.activeContentChange.next(this.activeContent);
    this._cdr.detectChanges();

    if (this.appearance() !== 'tabs') {
      return;
    }

    this.update();
  }

  update() {
    this._zone.runOutsideAngular(() => {
      requestAnimationFrame(() => {
        const tabs = this._tabs.toArray().map(tab => tab.nativeElement);
        const selectedIndex = this._childrenMetadata$.value.findIndex(
          metaData => metaData.id === this.activeContent,
        );
        const selectedTab = tabs[selectedIndex] || tabs[0];
        const indicator = this._indicator.nativeElement;

        if (!selectedTab) {
          return;
        }

        indicator.style.width =
          selectedTab.getBoundingClientRect().width + 'px';
        indicator.style.height = selectedTab.offsetHeight + 'px';
        indicator.style.left =
          selectedTab.getBoundingClientRect().left -
          selectedTab.parentElement!.getBoundingClientRect().left +
          'px';
      });
    });
  }
}
