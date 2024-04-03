import { NgModule } from '@angular/core';
import { DlNavComponent } from './dl-nav.component';
import { DlNavLinkComponent } from '../nav-link/dl-nav-link.component';

@NgModule({
  imports: [DlNavComponent, DlNavLinkComponent],
  exports: [DlNavComponent, DlNavLinkComponent],
})
export class DlNavModule {}
