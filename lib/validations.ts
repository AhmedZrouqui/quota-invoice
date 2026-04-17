import { z } from "zod";

export const lineItemSchema = z.object({
  id: z.string(),
  description: z.string().min(1, "Required"),
  quantity: z.coerce.number().min(1, "Min 1"),
  unitPrice: z.coerce.number().min(0, "Min 0"),
  discount: z.coerce.number().min(0).max(100),
  taxRate: z.coerce.number().min(0).max(100),
});

export const invoiceSchema = z.object({
  senderName: z.string().min(1, "Company name is required"),
  senderEmail: z.string().email("Invalid email").or(z.literal("")),
  senderAddress: z.string(),
  senderPhone: z.string(),

  clientName: z.string().min(1, "Client name is required"),
  clientEmail: z.string().email("Invalid email").or(z.literal("")),
  clientAddress: z.string(),
  clientPhone: z.string(),

  invoiceNumber: z.string(),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  dueDate: z.string(),

  currencyCode: z.string().length(3, "Select a currency"),
  discount: z.coerce.number().min(0).max(100),
  lineItems: z.array(lineItemSchema).min(1, "At least one item is required"),

  notes: z.string(),
  paymentTerms: z.string(),
  logoDataUrl: z.string().nullable(),
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
