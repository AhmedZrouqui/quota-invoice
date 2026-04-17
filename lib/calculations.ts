import { dinero, add, multiply, subtract, toDecimal } from "dinero.js";
import type { Dinero } from "dinero.js";
import { getDineroCurrency, formatAmount } from "./currencies";
import type { LineItem, ComputedTotals } from "./types";

type DineroNum = Dinero<number>;

function toDinero(amount: number, currencyCode: string): DineroNum {
  const currency = getDineroCurrency(currencyCode);
  const base = Array.isArray(currency.base) ? currency.base[0] : currency.base;
  const factor = Math.pow(base as number, currency.exponent);
  return dinero({ amount: Math.round(amount * factor), currency });
}

function dineroToNumber(d: DineroNum): number {
  return parseFloat(toDecimal(d));
}

/** Gross line total: qty × unitPrice (before any discounts or tax) */
export function computeLineGross(
  quantity: number,
  unitPrice: number,
  currencyCode: string
): number {
  return dineroToNumber(multiply(toDinero(unitPrice, currencyCode), quantity));
}

/** Net line total: qty × unitPrice × (1 - discount%) — after discount, before tax */
export function computeLineNet(
  quantity: number,
  unitPrice: number,
  discountRate: number,
  currencyCode: string
): number {
  const gross = multiply(toDinero(unitPrice, currencyCode), quantity);
  if (discountRate <= 0) return dineroToNumber(gross);
  const discFactor = Math.round(discountRate * 100);
  const discAmt = multiply(gross, { amount: discFactor, scale: 4 });
  return dineroToNumber(subtract(gross, discAmt));
}

export function computeInvoiceTotals(
  items: LineItem[],
  currencyCode: string,
  invoiceDiscountRate: number
): ComputedTotals {
  const currency = getDineroCurrency(currencyCode);
  const zero = dinero({ amount: 0, currency });
  const fmt = (d: DineroNum) => formatAmount(dineroToNumber(d), currencyCode);

  const itemRows = items;

  // ── Subtotal: gross sum before any discounts ──
  const subtotalDinero = itemRows.reduce((acc, item) => {
    return add(acc, multiply(toDinero(item.unitPrice, currencyCode), item.quantity));
  }, zero);

  // ── Per-line discount groups (grouped by discount rate) ──
  const lineDiscMap = new Map<number, { gross: DineroNum; disc: DineroNum }>();
  let totalLineDiscountDinero = zero;

  for (const item of itemRows) {
    const rate = Number(item.discount) || 0;
    const gross = multiply(toDinero(item.unitPrice, currencyCode), item.quantity);
    const discFactor = Math.round(rate * 100);
    const discAmt = rate > 0 ? multiply(gross, { amount: discFactor, scale: 4 }) : zero;
    totalLineDiscountDinero = add(totalLineDiscountDinero, discAmt);

    const existing = lineDiscMap.get(rate);
    if (existing) {
      lineDiscMap.set(rate, {
        gross: add(existing.gross, gross),
        disc: add(existing.disc, discAmt),
      });
    } else {
      lineDiscMap.set(rate, { gross, disc: discAmt });
    }
  }

  // ── Invoice-level discount applied on (subtotal − line discounts) ──
  const afterLineDiscount = subtract(subtotalDinero, totalLineDiscountDinero);
  const invDiscFactor = Math.round(invoiceDiscountRate * 100);
  const invoiceDiscountDinero =
    invoiceDiscountRate > 0
      ? multiply(afterLineDiscount, { amount: invDiscFactor, scale: 4 })
      : zero;

  // ── Net taxable base per line (after per-line discount) ──
  // Tax groups are computed on net per-line amounts
  const taxMap = new Map<number, DineroNum>();
  for (const item of itemRows) {
    const lineDisc = Number(item.discount) || 0;
    const taxRate = Number(item.taxRate) || 0;
    const gross = multiply(toDinero(item.unitPrice, currencyCode), item.quantity);
    const discFactor = Math.round(lineDisc * 100);
    const lineNet =
      lineDisc > 0
        ? subtract(gross, multiply(gross, { amount: discFactor, scale: 4 }))
        : gross;

    const existing = taxMap.get(taxRate);
    taxMap.set(taxRate, existing ? add(existing, lineNet) : lineNet);
  }

  let totalTaxDinero = zero;
  const taxGroups: ComputedTotals["taxGroups"] = [];
  for (const [rate, baseDinero] of Array.from(taxMap.entries()).sort((a, b) => b[0] - a[0])) {
    const taxFactor = Math.round(rate * 100);
    const taxAmt = rate > 0 ? multiply(baseDinero, { amount: taxFactor, scale: 4 }) : zero;
    totalTaxDinero = add(totalTaxDinero, taxAmt);
    taxGroups.push({ rate, base: fmt(baseDinero), amount: fmt(taxAmt) });
  }

  // ── Grand total ──
  const afterAllDiscounts = subtract(afterLineDiscount, invoiceDiscountDinero);
  const totalDinero = add(afterAllDiscounts, totalTaxDinero);

  // ── Build line discount groups for summary table ──
  const lineDiscountGroups: ComputedTotals["lineDiscountGroups"] = [];
  for (const [rate, { gross, disc }] of Array.from(lineDiscMap.entries())
    .filter(([r]) => r > 0)
    .sort((a, b) => b[0] - a[0])) {
    lineDiscountGroups.push({ rate, base: fmt(gross), amount: fmt(disc) });
  }

  return {
    subtotal: fmt(subtotalDinero),
    lineDiscountGroups,
    totalLineDiscount: fmt(totalLineDiscountDinero),
    invoiceDiscount: fmt(invoiceDiscountDinero),
    taxGroups,
    totalTax: fmt(totalTaxDinero),
    total: fmt(totalDinero),
  };
}
