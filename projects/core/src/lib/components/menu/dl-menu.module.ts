import { NgModule } from '@angular/core';
import { DlOptionComponent } from '../option/dl-option.component';
import { DlMenuComponent } from './dl-menu.component';
import { DlOptionsDirective } from '../option/dl-options.directive';

@NgModule({
  imports: [
    DlOptionsDirective,
    DlOptionComponent,
    DlOptionsDirective,
    DlMenuComponent,
  ],
  exports: [
    DlOptionsDirective,
    DlOptionComponent,
    DlOptionsDirective,
    DlMenuComponent,
  ],
})
export class DlMenuModule {}
