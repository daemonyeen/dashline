import { NgModule } from '@angular/core';
import { DlTabsComponent } from './dl-tabs.component';
import { DlTabComponent } from '../tab/dl-tab.component';
import { DlTabLabelComponent } from '../tab-label/dl-tab-label.component';

@NgModule({
  imports: [DlTabComponent, DlTabLabelComponent, DlTabsComponent],
  exports: [DlTabComponent, DlTabLabelComponent, DlTabsComponent],
})
export class DlTabsModule {}
