import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import "@/lib/pdf-fonts";
import type { InvoiceFormValues } from "@/lib/validations";
import type { ComputedTotals } from "@/lib/types";
import type { Lang } from "@/lib/i18n";
import { getT } from "@/lib/i18n";

// ── Monochrome palette ──
const BLACK = "#111827";
const DARK = "#374151";
const MID = "#6B7280";
const LIGHT = "#9CA3AF";
const RULE = "#E5E7EB";
const FAINT = "#F3F4F6";
const CARD = "#F8FAFC";

const s = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 10,
    color: BLACK,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 50,
    backgroundColor: "#FFFFFF",
  },

  // ── Row 1: Sender + Client ──
  topRow: { flexDirection: "row", gap: 24, marginBottom: 24 },
  senderBlock: { flex: 1 },
  clientBlock: { flex: 1, alignItems: "flex-end" },
  logo: { maxWidth: 140, maxHeight: 52, objectFit: "contain", marginBottom: 8 },
  invoiceTitle: { fontSize: 28, fontWeight: 700, color: BLACK, letterSpacing: 1, marginBottom: 2 },
  invoiceNumber: { fontSize: 10, color: MID },
  blockLabel: { fontSize: 8, fontWeight: 600, color: MID, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 },
  blockName: { fontSize: 11, fontWeight: 600, color: BLACK, marginBottom: 2 },
  blockLine: { fontSize: 9, color: DARK, lineHeight: 1.5 },

  // ── Row 2: Meta strip ──
  metaStrip: { flexDirection: "row", backgroundColor: CARD, borderRadius: 6, paddingHorizontal: 16, paddingVertical: 10, marginBottom: 24, gap: 20 },
  metaItem: { flex: 1 },
  metaLabel: { fontSize: 8, fontWeight: 600, color: MID, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 3 },
  metaValue: { fontSize: 10, fontWeight: 600, color: BLACK },

  // ── Row 3: Line items table ──
  tableHeader: { flexDirection: "row", backgroundColor: BLACK, borderRadius: 4, paddingHorizontal: 10, paddingVertical: 7, marginBottom: 2 },
  tableHeaderText: { fontSize: 9, fontWeight: 600, color: "#FFFFFF" },
  tableRow: { flexDirection: "row", paddingHorizontal: 10, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: FAINT },
  tableRowAlt: { backgroundColor: CARD },
  // Cols
  colDesc: { flex: 3 },
  colQty: { width: 28, textAlign: "center" },
  colPrice: { width: 56, textAlign: "right" },
  colDisc: { width: 36, textAlign: "center" },
  colTax: { width: 36, textAlign: "center" },
  colAmount: { width: 64, textAlign: "right" },
  cellText: { fontSize: 9, color: DARK },
  cellCenter: { fontSize: 9, color: DARK, textAlign: "center" },
  cellRight: { fontSize: 9, color: DARK, textAlign: "right" },

  // ── Row 4: Summary + Totals ──
  bottomRow: { flexDirection: "row", marginTop: 16, gap: 24, alignItems: "flex-start" },

  // Summary tables (left)
  summaryLeft: { flex: 1, gap: 14 },
  summaryBlock: {},
  summaryTitle: { fontSize: 8, fontWeight: 600, color: MID, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 },
  summaryTableHeader: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: RULE, paddingBottom: 3, marginBottom: 2 },
  summaryHeaderText: { fontSize: 8, fontWeight: 600, color: LIGHT },
  summaryRow: { flexDirection: "row", paddingVertical: 3, borderBottomWidth: 1, borderBottomColor: FAINT },
  sColRate: { width: 32 },
  sColBase: { flex: 1, textAlign: "right" },
  sColAmt: { width: 58, textAlign: "right" },
  sCellLabel: { fontSize: 9, color: MID },
  sCellBase: { fontSize: 9, color: DARK, textAlign: "right" },
  sCellAmt: { fontSize: 9, color: BLACK, fontWeight: 600, textAlign: "right" },

  // Totals (right)
  totalsBox: { width: 195 },
  totalsRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  totalsLabel: { fontSize: 10, color: MID },
  totalsValue: { fontSize: 10, color: DARK },
  totalsMuted: { fontSize: 10, color: LIGHT },
  totalsFinalRow: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1.5, borderTopColor: BLACK, marginTop: 6, paddingTop: 6 },
  totalsFinalLabel: { fontSize: 12, fontWeight: 700, color: BLACK },
  totalsFinalValue: { fontSize: 12, fontWeight: 700, color: BLACK },

  // ── Footer ──
  footer: { marginTop: 28, paddingTop: 16, borderTopWidth: 1, borderTopColor: RULE, flexDirection: "row", gap: 24 },
  footerSection: { flex: 1 },
  footerLabel: { fontSize: 8, fontWeight: 600, color: MID, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 },
  footerText: { fontSize: 9, color: MID, lineHeight: 1.6 },
});

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m, 10) - 1]} ${parseInt(d, 10)}, ${y}`;
}

interface Props {
  data: InvoiceFormValues;
  calculations: ComputedTotals;
  lang: Lang;
}

export function PDFDocument({ data, calculations, lang }: Props) {
  const t = getT(lang);
  const hasLineDiscount = calculations.lineDiscountGroups.length > 0;
  const hasTax = calculations.taxGroups.some((g) => g.rate > 0);
  const hasInvoiceDiscount = Number(data.discount) > 0;

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: data.currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    }).format(n);

  return (
    <Document
      title={`${t.invoiceTitle}${data.invoiceNumber ? ` ${data.invoiceNumber}` : ""}`}
      author={data.senderName}
    >
      <Page size="A4" style={s.page}>

        {/* ── Row 1: Sender (left) + Client (right) ── */}
        <View style={s.topRow}>
          <View style={s.senderBlock}>
            {data.logoDataUrl ? <Image src={data.logoDataUrl} style={s.logo} /> : null}
            {!data.logoDataUrl && <Text style={s.invoiceTitle}>{t.invoiceTitle}</Text>}
            {data.invoiceNumber ? <Text style={s.invoiceNumber}>#{data.invoiceNumber}</Text> : null}
            <View style={{ marginTop: 10 }}>
              <Text style={s.blockLabel}>{t.from}</Text>
              <Text style={s.blockName}>{data.senderName}</Text>
              {data.senderAddress ? <Text style={s.blockLine}>{data.senderAddress}</Text> : null}
              {data.senderEmail ? <Text style={s.blockLine}>{data.senderEmail}</Text> : null}
              {data.senderPhone ? <Text style={s.blockLine}>{data.senderPhone}</Text> : null}
            </View>
          </View>
          <View style={s.clientBlock}>
            {data.logoDataUrl ? <Text style={s.invoiceTitle}>{t.invoiceTitle}</Text> : null}
            {data.logoDataUrl && data.invoiceNumber ? <Text style={s.invoiceNumber}>#{data.invoiceNumber}</Text> : null}
            <View style={{ marginTop: data.logoDataUrl ? 10 : 0 }}>
              <Text style={s.blockLabel}>{t.billTo}</Text>
              <Text style={s.blockName}>{data.clientName}</Text>
              {data.clientAddress ? <Text style={s.blockLine}>{data.clientAddress}</Text> : null}
              {data.clientEmail ? <Text style={s.blockLine}>{data.clientEmail}</Text> : null}
              {data.clientPhone ? <Text style={s.blockLine}>{data.clientPhone}</Text> : null}
            </View>
          </View>
        </View>

        {/* ── Row 2: Meta strip ── */}
        <View style={s.metaStrip}>
          <View style={s.metaItem}>
            <Text style={s.metaLabel}>{t.date}</Text>
            <Text style={s.metaValue}>{formatDate(data.invoiceDate)}</Text>
          </View>
          {data.dueDate ? (
            <View style={s.metaItem}>
              <Text style={s.metaLabel}>{t.dueDate}</Text>
              <Text style={s.metaValue}>{formatDate(data.dueDate)}</Text>
            </View>
          ) : null}
          <View style={s.metaItem}>
            <Text style={s.metaLabel}>{t.currency}</Text>
            <Text style={s.metaValue}>{data.currencyCode}</Text>
          </View>
          {hasInvoiceDiscount ? (
            <View style={s.metaItem}>
              <Text style={s.metaLabel}>{t.discountPct}</Text>
              <Text style={s.metaValue}>{data.discount}%</Text>
            </View>
          ) : null}
        </View>

        {/* ── Row 3: Line items table ── */}
        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderText, s.colDesc]}>{t.description}</Text>
          <Text style={[s.tableHeaderText, s.colQty]}>{t.qty}</Text>
          <Text style={[s.tableHeaderText, s.colPrice]}>{t.price}</Text>
          <Text style={[s.tableHeaderText, s.colDisc]}>{t.discCol}</Text>
          <Text style={[s.tableHeaderText, s.colTax]}>{t.taxCol}</Text>
          <Text style={[s.tableHeaderText, s.colAmount]}>{t.amount}</Text>
        </View>

        {data.lineItems.map((item, i) => {
          const disc = Number(item.discount) || 0;
          const gross = item.quantity * item.unitPrice;
          const net = gross * (1 - disc / 100);

          return (
            <View key={item.id} style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}>
              <Text style={[s.cellText, s.colDesc]}>{item.description || "—"}</Text>
              <Text style={[s.cellCenter, s.colQty]}>{item.quantity}</Text>
              <Text style={[s.cellRight, s.colPrice]}>{fmt(item.unitPrice)}</Text>
              <Text style={[s.cellCenter, s.colDisc]}>
                {disc > 0 ? `${disc}%` : "—"}
              </Text>
              <Text style={[s.cellCenter, s.colTax]}>
                {Number(item.taxRate) > 0 ? `${item.taxRate}%` : "—"}
              </Text>
              <Text style={[s.cellRight, s.colAmount]}>{fmt(net)}</Text>
            </View>
          );
        })}

        {/* ── Row 4: Summary tables (left) + Totals (right) ── */}
        <View style={s.bottomRow}>
          {/* Summary tables */}
          <View style={s.summaryLeft}>
            {hasLineDiscount && (
              <View style={s.summaryBlock}>
                <Text style={s.summaryTitle}>{t.discountSummary}</Text>
                <View style={s.summaryTableHeader}>
                  <Text style={[s.summaryHeaderText, s.sColRate]}>{t.rate}</Text>
                  <Text style={[s.summaryHeaderText, s.sColBase]}>{t.grossAmount}</Text>
                  <Text style={[s.summaryHeaderText, s.sColAmt]}>{t.discount}</Text>
                </View>
                {calculations.lineDiscountGroups.map((g) => (
                  <View key={g.rate} style={s.summaryRow}>
                    <Text style={[s.sCellLabel, s.sColRate]}>{g.rate}%</Text>
                    <Text style={[s.sCellBase, s.sColBase]}>{g.base}</Text>
                    <Text style={[s.sCellAmt, s.sColAmt]}>{g.amount}</Text>
                  </View>
                ))}
              </View>
            )}

            {hasTax && (
              <View style={s.summaryBlock}>
                <Text style={s.summaryTitle}>{t.taxSummary}</Text>
                <View style={s.summaryTableHeader}>
                  <Text style={[s.summaryHeaderText, s.sColRate]}>{t.rate}</Text>
                  <Text style={[s.summaryHeaderText, s.sColBase]}>{t.netAmount}</Text>
                  <Text style={[s.summaryHeaderText, s.sColAmt]}>{t.tax}</Text>
                </View>
                {calculations.taxGroups
                  .filter((g) => g.rate > 0)
                  .map((g) => (
                    <View key={g.rate} style={s.summaryRow}>
                      <Text style={[s.sCellLabel, s.sColRate]}>{g.rate}%</Text>
                      <Text style={[s.sCellBase, s.sColBase]}>{g.base}</Text>
                      <Text style={[s.sCellAmt, s.sColAmt]}>{g.amount}</Text>
                    </View>
                  ))}
              </View>
            )}
          </View>

          {/* Totals */}
          <View style={s.totalsBox}>
            <View style={s.totalsRow}>
              <Text style={s.totalsLabel}>{t.subtotal}</Text>
              <Text style={s.totalsValue}>{calculations.subtotal}</Text>
            </View>
            {hasLineDiscount && (
              <View style={s.totalsRow}>
                <Text style={s.totalsMuted}>{t.lineDiscounts}</Text>
                <Text style={s.totalsMuted}>−{calculations.totalLineDiscount}</Text>
              </View>
            )}
            {hasInvoiceDiscount && (
              <View style={s.totalsRow}>
                <Text style={s.totalsMuted}>{t.invoiceDiscount} ({data.discount}%)</Text>
                <Text style={s.totalsMuted}>−{calculations.invoiceDiscount}</Text>
              </View>
            )}
            {hasTax && (
              <View style={s.totalsRow}>
                <Text style={s.totalsLabel}>{t.totalTax}</Text>
                <Text style={s.totalsValue}>{calculations.totalTax}</Text>
              </View>
            )}
            <View style={s.totalsFinalRow}>
              <Text style={s.totalsFinalLabel}>{t.total}</Text>
              <Text style={s.totalsFinalValue}>{calculations.total}</Text>
            </View>
          </View>
        </View>

        {/* ── Footer: Notes & Terms ── */}
        {(data.notes || data.paymentTerms) && (
          <View style={s.footer}>
            {data.notes ? (
              <View style={s.footerSection}>
                <Text style={s.footerLabel}>{t.notes}</Text>
                <Text style={s.footerText}>{data.notes}</Text>
              </View>
            ) : null}
            {data.paymentTerms ? (
              <View style={s.footerSection}>
                <Text style={s.footerLabel}>{t.paymentTerms}</Text>
                <Text style={s.footerText}>{data.paymentTerms}</Text>
              </View>
            ) : null}
          </View>
        )}
      </Page>
    </Document>
  );
}
