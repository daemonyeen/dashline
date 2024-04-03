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
  selector: 'dl-switch-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dl-switch-label.component.html',
  styleUrls: ['./dl-switch-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-switch-label' },
})
export class DlSwitchLabelComponent implements AfterViewInit {
  @ViewChild(TemplateRef, { read: TemplateRef })
  protected _tabTemplateRef: TemplateRef<any>;
  protected readonly _templateRef$ = new BehaviorSubject<TemplateRef<any>>(
    null,
  );

  readonly templateRef$ = this._templateRef$.asObservable();

  ngAfterViewInit() {
    setTimeout(() => {
      this._templateRef$.next(this._tabTemplateRef);
    });
  }
}
