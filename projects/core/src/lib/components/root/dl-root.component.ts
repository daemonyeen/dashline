import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dl-root',
  standalone: true,
  imports: [],
  templateUrl: './dl-root.component.html',
  styleUrl: './dl-root.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DlRootComponent {}
