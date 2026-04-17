"use client";

import { useFieldArray, UseFormReturn } from "react-hook-form";
import type { InvoiceFormValues } from "@/lib/validations";
import type { Lang, Translations } from "@/lib/i18n";
import { computeLineNet, computeInvoiceTotals } from "@/lib/calculations";
import { LogoUpload } from "./LogoUpload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CurrencySelect } from "./CurrencySelect";

interface Props {
  form: UseFormReturn<InvoiceFormValues>;
  onSubmit: (data: InvoiceFormValues) => void;
  isGenerating: boolean;
  lang: Lang;
  t: Translations;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function Field({
  label,
  htmlFor,
  required,
  children,
  error,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div>
      <Label className="text-sm text-gray-600" htmlFor={htmlFor}>
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </Label>
      <div className="mt-1">{children}</div>
      <FieldError message={error} />
    </div>
  );
}

// Column widths — shared between header and rows so they always align
const COL = "grid-cols-[1fr_48px_86px_54px_54px_80px_28px]";

export function InvoiceForm({ form, onSubmit, isGenerating, t }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = form;

  const { fields, append, remove } = useFieldArray({ control, name: "lineItems" });

  const watchedItems = watch("lineItems");
  const watchedCurrency = watch("currencyCode") || "USD";
  const watchedDiscount = watch("discount");

  const totals = computeInvoiceTotals(
    watchedItems ?? [],
    watchedCurrency,
    Number(watchedDiscount) || 0
  );

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: watchedCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    }).format(n);

  function addItem() {
    append({ id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0, discount: 0, taxRate: 0 });
  }

  const hasLineDiscount = totals.lineDiscountGroups.length > 0;
  const hasTax = totals.taxGroups.some((g) => g.rate > 0);
  const hasInvoiceDiscount = Number(watchedDiscount) > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

      {/* ── Row 1: Sender + Client ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <section className="rounded-lg border border-gray-200 bg-[#F8FAFC] p-5 space-y-4">
          <LogoUpload
            value={watch("logoDataUrl")}
            onChange={(url) => setValue("logoDataUrl", url)}
          />
          <Field label={t.companyName} htmlFor="senderName" required error={errors.senderName?.message}>
            <Input id="senderName" placeholder={t.companyPlaceholder} {...register("senderName")} />
          </Field>
          <Field label={t.email} htmlFor="senderEmail" error={errors.senderEmail?.message}>
            <Input id="senderEmail" type="email" placeholder={t.emailPlaceholder} {...register("senderEmail")} />
          </Field>
          <Field label={t.address} htmlFor="senderAddress">
            <Textarea id="senderAddress" rows={2} className="resize-none" placeholder={t.addressPlaceholder} {...register("senderAddress")} />
          </Field>
          <Field label={t.phone} htmlFor="senderPhone">
            <Input id="senderPhone" placeholder={t.phonePlaceholder} {...register("senderPhone")} />
          </Field>
        </section>

        <section className="rounded-lg border border-gray-200 bg-[#F8FAFC] p-5 space-y-4">
          <h2 className="text-sm font-semibold text-gray-700">{t.billTo}</h2>
          <Field label={t.clientName} htmlFor="clientName" required error={errors.clientName?.message}>
            <Input id="clientName" placeholder={t.clientPlaceholder} {...register("clientName")} />
          </Field>
          <Field label={t.email} htmlFor="clientEmail" error={errors.clientEmail?.message}>
            <Input id="clientEmail" type="email" placeholder={t.clientEmailPlaceholder} {...register("clientEmail")} />
          </Field>
          <Field label={t.address} htmlFor="clientAddress">
            <Textarea id="clientAddress" rows={2} className="resize-none" placeholder={t.clientAddressPlaceholder} {...register("clientAddress")} />
          </Field>
          <Field label={t.phone} htmlFor="clientPhone">
            <Input id="clientPhone" placeholder={t.clientPhonePlaceholder} {...register("clientPhone")} />
          </Field>
        </section>
      </div>

      {/* ── Row 2: Invoice Details ── */}
      <section className="rounded-lg border border-gray-200 bg-[#F8FAFC] p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700">{t.invoiceDetails}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Field label={t.invoiceNumber} htmlFor="invoiceNumber">
            <Input id="invoiceNumber" placeholder={t.invoiceNumberPlaceholder} {...register("invoiceNumber")} />
          </Field>
          <Field label={t.date} htmlFor="invoiceDate" required error={errors.invoiceDate?.message}>
            <Input id="invoiceDate" type="date" {...register("invoiceDate")} />
          </Field>
          <Field label={t.dueDate} htmlFor="dueDate">
            <Input id="dueDate" type="date" {...register("dueDate")} />
          </Field>
          <Field label={t.discountPct} htmlFor="discount" error={errors.discount?.message}>
            <Input id="discount" type="number" min="0" max="100" step="0.01" placeholder="0" {...register("discount")} />
          </Field>
        </div>
        <div className="sm:w-1/2">
          <Field label={t.currency} error={errors.currencyCode?.message}>
            <CurrencySelect
              value={watch("currencyCode")}
              onChange={(val) => setValue("currencyCode", val)}
              placeholder={t.currency}
            />
          </Field>
        </div>
      </section>

      {/* ── Row 3: Line Items ── */}
      <section className="rounded-lg border border-gray-200 bg-[#F8FAFC] p-5 space-y-3">
        <h2 className="text-sm font-semibold text-gray-700">{t.lineItems}</h2>

        {/* Scrollable table wrapper */}
        <div className="overflow-x-auto">
          <div style={{ minWidth: 560 }}>
            {/* Table header */}
            <div className={`grid ${COL} gap-2 text-xs text-gray-500 font-medium px-1 mb-1`}>
              <span>{t.description}</span>
              <span className="text-center">{t.qty}</span>
              <span className="text-right">{t.price}</span>
              <span className="text-center">{t.discCol}</span>
              <span className="text-center">{t.taxCol}</span>
              <span className="text-right">{t.amount}</span>
              <span />
            </div>

            {/* Rows */}
            <div className="space-y-1.5">
              {fields.map((field, index) => {
                const item = watchedItems?.[index];
                const qty = Number(item?.quantity) || 0;
                const price = Number(item?.unitPrice) || 0;
                const disc = Number(item?.discount) || 0;
                const lineNet = computeLineNet(qty, price, disc, watchedCurrency);

                return (
                  <div key={field.id} className={`grid ${COL} gap-2 items-center`}>
                    <Input
                      className="h-8 text-sm"
                      placeholder={t.itemPlaceholder}
                      {...register(`lineItems.${index}.description`)}
                    />
                    <Input
                      type="number" min="1" step="1"
                      className="h-8 text-center text-sm px-1"
                      placeholder="1"
                      {...register(`lineItems.${index}.quantity`)}
                    />
                    <Input
                      type="number" min="0" step="0.01"
                      className="h-8 text-right text-sm px-1"
                      placeholder="0.00"
                      {...register(`lineItems.${index}.unitPrice`)}
                    />
                    <Input
                      type="number" min="0" max="100" step="0.01"
                      className="h-8 text-center text-sm px-1"
                      placeholder="0"
                      {...register(`lineItems.${index}.discount`)}
                    />
                    <Input
                      type="number" min="0" max="100" step="0.01"
                      className="h-8 text-center text-sm px-1"
                      placeholder="0"
                      {...register(`lineItems.${index}.taxRate`)}
                    />
                    <span className="text-right text-sm font-medium text-gray-700 tabular-nums pr-0.5">
                      {fmt(lineNet)}
                    </span>
                    <button
                      type="button"
                      onClick={() => fields.length > 1 && remove(index)}
                      disabled={fields.length <= 1}
                      className="w-7 h-7 flex items-center justify-center rounded text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {errors.lineItems && (
          <FieldError message={errors.lineItems.message as string | undefined} />
        )}

        <div className="pt-1">
          <Button type="button" variant="outline" size="sm" onClick={addItem}>
            {t.addItem}
          </Button>
        </div>

        {/* ── Summary: Discount table + Tax table (left) | Totals (right) ── */}
        <div className="mt-5 pt-5 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">

          {/* Summary tables (left) */}
          <div className="space-y-5">
            {hasLineDiscount && (
              <SummaryTable
                title={t.discountSummary}
                col1={t.rate}
                col2={t.grossAmount}
                col3={t.discount}
                rows={totals.lineDiscountGroups.map((g) => ({
                  label: `${g.rate}%`,
                  base: g.base,
                  amount: g.amount,
                }))}
                accentClass="text-orange-600"
              />
            )}

            {hasTax && (
              <SummaryTable
                title={t.taxSummary}
                col1={t.rate}
                col2={t.netAmount}
                col3={t.tax}
                rows={totals.taxGroups
                  .filter((g) => g.rate > 0)
                  .map((g) => ({
                    label: `${g.rate}%`,
                    base: g.base,
                    amount: g.amount,
                  }))}
                accentClass="text-gray-700"
              />
            )}

            {!hasLineDiscount && !hasTax && (
              <p className="text-xs text-gray-400 italic">{t.addDiscOrTaxHint}</p>
            )}
          </div>

          {/* Totals (right) */}
          <div className="space-y-1.5 text-sm">
            <TotalsRow label={t.subtotal} value={totals.subtotal} />
            {hasLineDiscount && (
              <TotalsRow label={t.lineDiscounts} value={`−${totals.totalLineDiscount}`} muted />
            )}
            {hasInvoiceDiscount && (
              <TotalsRow label={`${t.invoiceDiscount} (${watchedDiscount}%)`} value={`−${totals.invoiceDiscount}`} muted />
            )}
            {hasTax && (
              <TotalsRow label={t.totalTax} value={totals.totalTax} />
            )}
            <div className="flex justify-between font-semibold text-gray-900 text-base pt-2 border-t border-gray-300">
              <span>{t.total}</span>
              <span className="tabular-nums">{totals.total}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Row 5: Notes & Terms ── */}
      <section className="rounded-lg border border-gray-200 bg-[#F8FAFC] p-5 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700">{t.notesTerms}</h2>
        <Field label={t.notes} htmlFor="notes">
          <Textarea id="notes" rows={3} className="resize-none" placeholder={t.notesPlaceholder} {...register("notes")} />
        </Field>
        <Field label={t.paymentTerms} htmlFor="paymentTerms">
          <Textarea id="paymentTerms" rows={2} className="resize-none" placeholder={t.paymentTermsPlaceholder} {...register("paymentTerms")} />
        </Field>
      </section>

      {/* ── Submit ── */}
      <Button
        type="submit"
        disabled={isGenerating}
        className="w-full h-12 bg-[#8B5CF6] hover:bg-[#6D28D9] focus-visible:ring-[#4C1D95] text-white font-semibold text-base transition-colors"
      >
        {isGenerating ? t.generatingPDF : t.generatePDF}
      </Button>
    </form>
  );
}

// ── Shared sub-components ──

function TotalsRow({
  label,
  value,
  muted,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className={`flex justify-between ${muted ? "text-gray-400" : "text-gray-600"}`}>
      <span>{label}</span>
      <span className="tabular-nums">{value}</span>
    </div>
  );
}

function SummaryTable({
  title,
  col1,
  col2,
  col3,
  rows,
  accentClass,
}: {
  title: string;
  col1: string;
  col2: string;
  col3: string;
  rows: { label: string; base: string; amount: string }[];
  accentClass: string;
}) {
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
        {title}
      </p>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-gray-400 border-b border-gray-200">
            <th className="text-left pb-1.5 font-medium">{col1}</th>
            <th className="text-right pb-1.5 font-medium">{col2}</th>
            <th className="text-right pb-1.5 font-medium">{col3}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-gray-100">
              <td className="py-1.5 text-gray-600">{row.label}</td>
              <td className="py-1.5 text-right text-gray-500 tabular-nums">{row.base}</td>
              <td className={`py-1.5 text-right font-medium tabular-nums ${accentClass}`}>
                {row.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
