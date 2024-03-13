import { NgModule } from '@angular/core';
import { DlAutocompleteComponent } from './dl-autocomplete.component';
import { DlOptionComponent } from '../option/dl-option.component';
import { DlOptionsDirective } from '../option/dl-options.directive';

@NgModule({
  imports: [DlAutocompleteComponent, DlOptionsDirective, DlOptionComponent],
  exports: [DlAutocompleteComponent, DlOptionsDirective, DlOptionComponent],
})
export class DlAutocompleteModule {}
