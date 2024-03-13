import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  input,
  OnChanges,
} from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'button[dl-button], a[dl-button]',
  standalone: true,
  imports: [NgClass],
  templateUrl: './dl-button.component.html',
  styleUrl: './dl-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-button transition-colors', '[attr.tabindex]': '0' },
  exportAs: 'dlButton',
})
export class DlButtonComponent implements OnChanges {
  private readonly el = inject(ElementRef);

  readonly grow = input<'default' | 'full-width'>('default');
  readonly appearance = input<
    'primary' | 'secondary' | 'destructive' | 'ghost' | 'link'
  >('primary');
  readonly size = input<'default' | 'icon'>('default');
  readonly disabled = input(false);

  @HostBinding('class')
  get hostClasses() {
    return {
      'full-width': this.grow() === 'full-width',
      disabled: this.disabled(),
      icon: this.size() === 'icon',
      [this.appearance()]: this.appearance(),
    };
  }

  ngOnChanges() {
    const htmlEl = this.el.nativeElement as HTMLButtonElement;

    if (htmlEl.tagName === 'BUTTON') {
      htmlEl.disabled = this.disabled();
    }
  }
}
