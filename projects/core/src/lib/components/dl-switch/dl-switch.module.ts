import { NgModule } from '@angular/core';
import { DlSwitchContentComponent } from '../dl-switch-content/dl-switch-content.component';
import { DlSwitchComponent } from './dl-switch.component';
import { DlSwitchLabelComponent } from '../dl-switch-label/dl-switch-label.component';

@NgModule({
  imports: [
    DlSwitchContentComponent,
    DlSwitchLabelComponent,
    DlSwitchComponent,
  ],
  exports: [
    DlSwitchContentComponent,
    DlSwitchLabelComponent,
    DlSwitchComponent,
  ],
})
export class DlSwitchModule {}
