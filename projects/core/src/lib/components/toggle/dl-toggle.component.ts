import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DlCheckboxComponent } from '../checkbox/dl-checkbox.component';
import { toggleAnimation } from '../../animations/toggle-animation';

@Component({
  selector: 'dl-toggle',
  standalone: true,
  templateUrl: './dl-toggle.component.html',
  styleUrl: './dl-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [toggleAnimation],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DlToggleComponent,
      multi: true,
    },
  ],
  host: { class: 'dl-toggle' },
  exportAs: 'dlToggle',
})
export class DlToggleComponent extends DlCheckboxComponent {}
