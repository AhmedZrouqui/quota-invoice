export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discount: number; // per-line discount %, 0–100
  taxRate: number;  // per-line tax rate %, 0–100
}

export interface InvoiceData {
  senderName: string;
  senderEmail: string;
  senderAddress: string;
  senderPhone: string;

  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientPhone: string;

  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  currencyCode: string;
  discount: number; // invoice-level discount %
  lineItems: LineItem[];

  notes: string;
  paymentTerms: string;
  logoDataUrl: string | null;
}

export interface SummaryGroup {
  rate: number;     // e.g. 20 for 20%
  base: string;     // formatted gross/taxable amount
  amount: string;   // formatted discount/tax amount
}

export interface ComputedTotals {
  subtotal: string;           // gross, before any discounts
  lineDiscountGroups: SummaryGroup[];  // per-line discount breakdown by rate
  totalLineDiscount: string;
  invoiceDiscount: string;    // invoice-level discount amount
  taxGroups: SummaryGroup[];  // tax breakdown by rate (on after-discount bases)
  totalTax: string;
  total: string;
}
