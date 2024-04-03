import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-shortcut',
  standalone: true,
  imports: [],
  templateUrl: './dl-shortcut.component.html',
  styleUrl: './dl-shortcut.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-shortcut' },
})
export class DlShortcutComponent {}
