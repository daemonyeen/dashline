import { NgModule } from '@angular/core';
import { DlSegmentedContentComponent } from '../segmented-content/dl-segmented-content.component';
import { DlSegmentedComponent } from './dl-segmented.component';
import { DlSegmentedLabelComponent } from '../segmented-label/dl-segmented-label.component';

@NgModule({
  imports: [
    DlSegmentedContentComponent,
    DlSegmentedLabelComponent,
    DlSegmentedComponent,
  ],
  exports: [
    DlSegmentedContentComponent,
    DlSegmentedLabelComponent,
    DlSegmentedComponent,
  ],
})
export class DlSegmentedModule {}
