import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-hint',
  standalone: true,
  imports: [],
  templateUrl: './dl-hint.component.html',
  styleUrl: './dl-hint.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'dl-hint' },
})
export class DlHintComponent {}
