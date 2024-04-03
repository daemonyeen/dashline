import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  inject,
  InjectionToken,
  input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { DlDestroyService } from '../services/dl-destroy.service';
import { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { DlOptionComponent } from '../components/option/dl-option.component';
import { takeUntil } from 'rxjs/operators';
import { EMPTY, fromEvent } from 'rxjs';

export const DL_OVERLAY_HOST = new InjectionToken<DlOverlayHost>(
  'dl-dropdown-host',
);

export class DlDropdownConfig {
  selectable = false;
}

export const DL_OVERLAY_DEFAULT_CONFIG = new InjectionToken<DlDropdownConfig>(
  'dl-dropdown-default-config',
  {
    providedIn: 'root',
    factory: () => new DlDropdownConfig(),
  },
);
export const DL_OVERLAY_CONFIG = new InjectionToken<DlDropdownConfig>(
  'dl-dropdown-config',
);
export type DlValue<T> = T | null;

@Component({ selector: '', template: '' })
export abstract class DlOverlayHost<T = any> implements AfterViewInit {
  // --- @deps ---
  protected readonly _cdr = inject(ChangeDetectorRef);
  protected readonly _onDestroy$ = inject(DlDestroyService, {
    optional: true,
  });

  // --- @template ---
  @ContentChildren(DlOptionComponent)
  protected readonly _options!: QueryList<DlOptionComponent<T>>;

  @ViewChild(CdkConnectedOverlay, { read: CdkConnectedOverlay })
  readonly overlayHost!: CdkConnectedOverlay;

  // --- @private ---
  private _activeIndex = -1;

  // --- @protected ---
  protected _opened = false;

  // --- @public ---
  multiple = input(false);
  value: DlValue<T> | Array<DlValue<T>> = null;

  get opened(): boolean {
    return this._opened;
  }

  get animationState(): 'void' | 'enter' {
    return this._opened ? 'enter' : 'void';
  }

  get activeIndex(): number {
    return this._activeIndex;
  }

  set activeIndex(selectedIndex: number) {
    this._activeIndex = selectedIndex;
    this._options.forEach(option => {
      option.active = false;
    });

    const activeOption = this._options.get(this._activeIndex);

    if (!activeOption) {
      return;
    }

    activeOption.active = true;
  }

  updateOptionIndexes() {
    this._options.forEach((option, i) => {
      option.index = i;
    });
  }

  ngAfterViewInit() {
    this.overlayHost.overlayKeydown
      .pipe(takeUntil(this._onDestroy$ || EMPTY))
      .subscribe(event => {
        if (!this._opened) {
          return;
        }

        switch (event.code) {
          case 'ArrowDown':
            event.preventDefault();
            this.activeIndex =
              this.activeIndex + 1 >= this._options.length
                ? 0
                : this.activeIndex + 1;
            break;
          case 'ArrowUp':
            event.preventDefault();
            this.activeIndex =
              this.activeIndex - 1 < 0
                ? this._options.length - 1
                : this.activeIndex - 1;
            break;
        }
      });
  }

  // Since options can have any type of value, we don't really
  // control what would be passed here
  abstract select(value: unknown): void;

  hasValue(val: unknown): boolean {
    if (!Array.isArray(this.value)) {
      return this.value === (val as T);
    }

    return this.value.includes(val as T);
  }

  open() {
    if (this.opened) {
      return;
    }

    this._opened = !this._opened;
    this.updateOptionIndexes();
    this._cdr.detectChanges();

    setTimeout(() => {
      fromEvent(this.overlayHost.overlayRef.overlayElement, 'mouseleave')
        .pipe(takeUntil(this._onDestroy$ || EMPTY))
        .subscribe(() => {
          this.activeIndex = -1;
        });
    });
  }

  close() {
    if (!this.opened) {
      return;
    }

    this._opened = false;
    this.activeIndex = -1;
    this._cdr.detectChanges();
  }
}
