import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DlTableModule } from '../../../../projects/core/src/lib/components/table/dl-table.module';

type Invoice = Readonly<{
  invoice: string;
  paymentStatus: string;
  totalAmount: string;
  paymentMethod: string;
}>;

@Component({
  selector: 'app-table-page',
  standalone: true,
  imports: [DlTableModule],
  templateUrl: './table-page.component.html',
  styleUrl: './table-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablePageComponent {
  invoices: Invoice[] = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ];
}
