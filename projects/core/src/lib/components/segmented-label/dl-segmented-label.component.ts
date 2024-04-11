import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dl-segmented-label',
  standalone: true,
  imports: [],
  templateUrl: './dl-segmented-label.component.html',
  styleUrls: ['./dl-segmented-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-segmented-label' },
})
export class DlSegmentedLabelComponent implements AfterViewInit {
  @ViewChild(TemplateRef, { read: TemplateRef })
  protected _tabTemplateRef!: TemplateRef<any>;
  protected readonly _templateRef$ =
    new BehaviorSubject<TemplateRef<any> | null>(null);

  readonly templateRef$ = this._templateRef$.asObservable();

  ngAfterViewInit() {
    setTimeout(() => {
      this._templateRef$.next(this._tabTemplateRef);
    });
  }
}
