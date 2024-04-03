import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { EMPTY, fromEvent } from 'rxjs';
import { DlCheckboxComponent } from '../checkbox/dl-checkbox.component';
import { DlCheckboxLabelComponent } from '../checkbox-label/dl-checkbox-label.component';
import { DOCUMENT } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { DlDestroyService } from '../../services/dl-destroy.service';
import { DlIconModule } from '../icon/dl-icon.module';
import {
  DL_OVERLAY_CONFIG,
  DL_OVERLAY_DEFAULT_CONFIG,
  DL_OVERLAY_HOST,
  DlOverlayHost,
} from '../../classes/dl-overlay-host';

@Component({
  selector: 'dl-option, [dl-option]',
  standalone: true,
  imports: [DlCheckboxComponent, DlCheckboxLabelComponent, DlIconModule],
  templateUrl: './dl-option.component.html',
  styleUrls: ['./dl-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'dl-option',
    '[class.selectable]': '_config.selectable',
    '[class.active]': '_active()',
  },
  exportAs: 'dlOption',
})
export class DlOptionComponent<T> implements OnInit {
  // --- @deps ---
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _el = inject(ElementRef);
  private readonly _document = inject(DOCUMENT);
  private readonly _onDestroy$ = inject(DlDestroyService, {
    optional: true,
  });
  protected readonly _host: DlOverlayHost<T> | null = inject(DL_OVERLAY_HOST, {
    optional: true,
    host: true,
  });
  protected readonly _defaultConfig = inject(DL_OVERLAY_DEFAULT_CONFIG);
  protected readonly _hostConfig = inject(DL_OVERLAY_CONFIG, {
    optional: true,
    host: true,
  });

  protected _config = {
    ...this._defaultConfig,
    ...(this._hostConfig || {}),
  };

  protected _active = signal(false);

  // --- @inputs ---
  value = input<T | null>(null);

  // --- @public ---
  index = 0;

  get active(): boolean {
    return this._active();
  }

  set active(selected: boolean) {
    this._active.set(selected);
    this._cdr.markForCheck();
  }

  @HostListener('click', ['$event'])
  hostClick(event?: Event) {
    if (!this._host) {
      return;
    }

    event?.stopPropagation();
    this._host.select(this.value());
    this._cdr.detectChanges();

    if (this._host.multiple()) {
      return;
    }
    this._host.close();
  }

  ngOnInit() {
    fromEvent(this._el.nativeElement, 'mouseenter')
      .pipe(takeUntil(this._onDestroy$ || EMPTY))
      .subscribe(() => {
        if (!this._host) {
          return;
        }

        this._host.activeIndex = this.index;
      });

    fromEvent<KeyboardEvent>(this._document, 'keydown')
      .pipe(takeUntil(this._onDestroy$ || EMPTY))
      .subscribe(event => {
        if (event.code === 'Enter' && this.active) {
          this.hostClick();
        }
      });
  }
}
