import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'dl-tab-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dl-tab-label.component.html',
  styleUrls: ['./dl-tab-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-tab-label' },
})
export class DlTabLabelComponent implements AfterViewInit {
  @ViewChild(TemplateRef, { read: TemplateRef })
  protected _tabTemplateRef!: TemplateRef<any>;
  protected readonly _templateRef$ =
    new BehaviorSubject<TemplateRef<any> | null>(null);

  readonly templateRef$ = this._templateRef$.asObservable();

  ngAfterViewInit() {
    this._templateRef$.next(this._tabTemplateRef);
  }
}
