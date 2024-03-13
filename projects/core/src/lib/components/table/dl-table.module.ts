import { NgModule } from '@angular/core';
import { DlTableComponent } from './dl-table.component';
import { DlHeaderRowComponent } from '../header-row/dl-header-row.component';
import { DlRowComponent } from '../row/dl-row.component';
import { DlHeaderCellComponent } from '../header-cell/dl-header-cell.component';
import { DlCellComponent } from '../cell/dl-cell.component';

@NgModule({
  imports: [
    DlTableComponent,
    DlHeaderRowComponent,
    DlRowComponent,
    DlHeaderCellComponent,
    DlCellComponent,
  ],
  exports: [
    DlTableComponent,
    DlHeaderRowComponent,
    DlRowComponent,
    DlHeaderCellComponent,
    DlCellComponent,
  ],
})
export class DlTableModule {}
