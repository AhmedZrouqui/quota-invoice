export type Lang = "en" | "fr" | "de" | "es";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "es", label: "Español" },
];

export interface Translations {
  // Sections
  billTo: string;
  invoiceDetails: string;
  lineItems: string;
  notesTerms: string;
  // Fields
  companyName: string;
  email: string;
  address: string;
  phone: string;
  clientName: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  discountPct: string;
  currency: string;
  // Table
  description: string;
  qty: string;
  price: string;
  discCol: string;
  taxCol: string;
  amount: string;
  addItem: string;
  // Summary
  discountSummary: string;
  taxSummary: string;
  rate: string;
  grossAmount: string;
  discount: string;
  netAmount: string;
  tax: string;
  subtotal: string;
  lineDiscounts: string;
  invoiceDiscount: string;
  totalTax: string;
  total: string;
  // Notes
  notes: string;
  paymentTerms: string;
  // Button
  generatePDF: string;
  generatingPDF: string;
  // PDF
  invoiceTitle: string;
  from: string;
  // Misc
  addDiscOrTaxHint: string;
  // Placeholders
  companyPlaceholder: string;
  emailPlaceholder: string;
  addressPlaceholder: string;
  phonePlaceholder: string;
  clientPlaceholder: string;
  clientEmailPlaceholder: string;
  clientAddressPlaceholder: string;
  clientPhonePlaceholder: string;
  invoiceNumberPlaceholder: string;
  notesPlaceholder: string;
  paymentTermsPlaceholder: string;
  itemPlaceholder: string;
}

const en: Translations = {
  billTo: "Bill To",
  invoiceDetails: "Invoice Details",
  lineItems: "Line Items",
  notesTerms: "Notes & Terms",
  companyName: "Company / Your Name",
  email: "Email",
  address: "Address",
  phone: "Phone",
  clientName: "Client Name",
  invoiceNumber: "Invoice #",
  date: "Date",
  dueDate: "Due Date",
  discountPct: "Discount %",
  currency: "Currency",
  description: "Description",
  qty: "Qty",
  price: "Price",
  discCol: "Disc%",
  taxCol: "Tax%",
  amount: "Amount",
  addItem: "+ Add Item",
  discountSummary: "Discount Summary",
  taxSummary: "Tax Summary",
  rate: "Rate",
  grossAmount: "Gross Amount",
  discount: "Discount",
  netAmount: "Net Amount",
  tax: "Tax",
  subtotal: "Subtotal",
  lineDiscounts: "Line Discounts",
  invoiceDiscount: "Invoice Discount",
  totalTax: "Total Tax",
  total: "Total",
  notes: "Notes",
  paymentTerms: "Payment Terms",
  generatePDF: "Generate & Download PDF",
  generatingPDF: "Generating PDF…",
  invoiceTitle: "INVOICE",
  from: "From",
  addDiscOrTaxHint: "Add Disc% or Tax% to a line item to see the summary tables.",
  companyPlaceholder: "Acme Corp",
  emailPlaceholder: "hello@acme.com",
  addressPlaceholder: "123 Main St, City, Country",
  phonePlaceholder: "+1 555 000 0000",
  clientPlaceholder: "Client Company",
  clientEmailPlaceholder: "client@example.com",
  clientAddressPlaceholder: "456 Client Ave, City, Country",
  clientPhonePlaceholder: "+1 555 111 1111",
  invoiceNumberPlaceholder: "INV-001",
  notesPlaceholder: "Thank you for your business!",
  paymentTermsPlaceholder: "Payment due within 30 days.",
  itemPlaceholder: "Item description",
};

const fr: Translations = {
  billTo: "Facturer À",
  invoiceDetails: "Détails de la Facture",
  lineItems: "Lignes",
  notesTerms: "Notes & Conditions",
  companyName: "Société / Votre Nom",
  email: "E-mail",
  address: "Adresse",
  phone: "Téléphone",
  clientName: "Nom du Client",
  invoiceNumber: "N° Facture",
  date: "Date",
  dueDate: "Date d'Échéance",
  discountPct: "Remise %",
  currency: "Devise",
  description: "Description",
  qty: "Qté",
  price: "Prix",
  discCol: "Rem%",
  taxCol: "TVA%",
  amount: "Montant",
  addItem: "+ Ajouter",
  discountSummary: "Récap. Remises",
  taxSummary: "Récap. TVA",
  rate: "Taux",
  grossAmount: "Montant Brut",
  discount: "Remise",
  netAmount: "Montant Net",
  tax: "TVA",
  subtotal: "Sous-total",
  lineDiscounts: "Remises Lignes",
  invoiceDiscount: "Remise Facture",
  totalTax: "Total TVA",
  total: "Total",
  notes: "Notes",
  paymentTerms: "Conditions de Paiement",
  generatePDF: "Générer & Télécharger PDF",
  generatingPDF: "Génération en cours…",
  invoiceTitle: "FACTURE",
  from: "De",
  addDiscOrTaxHint: "Ajoutez Rem% ou TVA% à une ligne pour voir les récapitulatifs.",
  companyPlaceholder: "Acme Corp",
  emailPlaceholder: "contact@acme.com",
  addressPlaceholder: "1 Rue de la Paix, Ville, Pays",
  phonePlaceholder: "+33 1 00 00 00 00",
  clientPlaceholder: "Société Client",
  clientEmailPlaceholder: "client@exemple.com",
  clientAddressPlaceholder: "10 Av. du Client, Ville, Pays",
  clientPhonePlaceholder: "+33 1 11 11 11 11",
  invoiceNumberPlaceholder: "FACT-001",
  notesPlaceholder: "Merci pour votre confiance !",
  paymentTermsPlaceholder: "Paiement sous 30 jours.",
  itemPlaceholder: "Description de l'article",
};

const de: Translations = {
  billTo: "Rechnungsempfänger",
  invoiceDetails: "Rechnungsdetails",
  lineItems: "Positionen",
  notesTerms: "Notizen & Konditionen",
  companyName: "Firma / Ihr Name",
  email: "E-Mail",
  address: "Adresse",
  phone: "Telefon",
  clientName: "Kundenname",
  invoiceNumber: "Rechnungs-Nr.",
  date: "Datum",
  dueDate: "Fälligkeitsdatum",
  discountPct: "Rabatt %",
  currency: "Währung",
  description: "Beschreibung",
  qty: "Menge",
  price: "Preis",
  discCol: "Rab%",
  taxCol: "MwSt%",
  amount: "Betrag",
  addItem: "+ Position hinzufügen",
  discountSummary: "Rabattübersicht",
  taxSummary: "MwSt.-Übersicht",
  rate: "Satz",
  grossAmount: "Bruttobetrag",
  discount: "Rabatt",
  netAmount: "Nettobetrag",
  tax: "MwSt.",
  subtotal: "Zwischensumme",
  lineDiscounts: "Positionsrabatte",
  invoiceDiscount: "Rechnungsrabatt",
  totalTax: "MwSt. gesamt",
  total: "Gesamtbetrag",
  notes: "Notizen",
  paymentTerms: "Zahlungsbedingungen",
  generatePDF: "PDF Erstellen & Herunterladen",
  generatingPDF: "PDF wird erstellt…",
  invoiceTitle: "RECHNUNG",
  from: "Von",
  addDiscOrTaxHint: "Fügen Sie Rab% oder MwSt% zu einer Position hinzu, um die Übersichten zu sehen.",
  companyPlaceholder: "Acme GmbH",
  emailPlaceholder: "info@acme.de",
  addressPlaceholder: "Musterstraße 1, Stadt, Deutschland",
  phonePlaceholder: "+49 30 000 0000",
  clientPlaceholder: "Kundenunternehmen",
  clientEmailPlaceholder: "kunde@beispiel.de",
  clientAddressPlaceholder: "Kundenstraße 1, Stadt, Deutschland",
  clientPhonePlaceholder: "+49 30 111 1111",
  invoiceNumberPlaceholder: "RE-001",
  notesPlaceholder: "Vielen Dank für Ihr Vertrauen!",
  paymentTermsPlaceholder: "Zahlung innerhalb von 30 Tagen.",
  itemPlaceholder: "Artikelbeschreibung",
};

const es: Translations = {
  billTo: "Facturar A",
  invoiceDetails: "Detalles de la Factura",
  lineItems: "Conceptos",
  notesTerms: "Notas & Condiciones",
  companyName: "Empresa / Tu Nombre",
  email: "Correo Electrónico",
  address: "Dirección",
  phone: "Teléfono",
  clientName: "Nombre del Cliente",
  invoiceNumber: "N.° Factura",
  date: "Fecha",
  dueDate: "Fecha de Vencimiento",
  discountPct: "Descuento %",
  currency: "Moneda",
  description: "Descripción",
  qty: "Cant.",
  price: "Precio",
  discCol: "Desc%",
  taxCol: "IVA%",
  amount: "Importe",
  addItem: "+ Añadir Concepto",
  discountSummary: "Resumen de Descuentos",
  taxSummary: "Resumen de IVA",
  rate: "Tasa",
  grossAmount: "Importe Bruto",
  discount: "Descuento",
  netAmount: "Importe Neto",
  tax: "IVA",
  subtotal: "Subtotal",
  lineDiscounts: "Descuentos por Línea",
  invoiceDiscount: "Descuento de Factura",
  totalTax: "IVA Total",
  total: "Total",
  notes: "Notas",
  paymentTerms: "Condiciones de Pago",
  generatePDF: "Generar y Descargar PDF",
  generatingPDF: "Generando PDF…",
  invoiceTitle: "FACTURA",
  from: "De",
  addDiscOrTaxHint: "Añada Desc% o IVA% a un concepto para ver los resúmenes.",
  companyPlaceholder: "Empresa S.L.",
  emailPlaceholder: "hola@empresa.com",
  addressPlaceholder: "Calle Mayor 1, Ciudad, País",
  phonePlaceholder: "+34 600 000 000",
  clientPlaceholder: "Empresa Cliente",
  clientEmailPlaceholder: "cliente@ejemplo.com",
  clientAddressPlaceholder: "Calle del Cliente 1, Ciudad, País",
  clientPhonePlaceholder: "+34 600 111 111",
  invoiceNumberPlaceholder: "FAC-001",
  notesPlaceholder: "¡Gracias por su confianza!",
  paymentTermsPlaceholder: "Pago en 30 días.",
  itemPlaceholder: "Descripción del artículo",
};

export const translations: Record<Lang, Translations> = { en, fr, de, es };

export function getT(lang: Lang): Translations {
  return translations[lang];
}
