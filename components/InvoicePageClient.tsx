"use client";

import Link from "next/link";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { invoiceSchema } from "@/lib/validations";
import type { InvoiceFormValues } from "@/lib/validations";
import { computeInvoiceTotals } from "@/lib/calculations";
import { InvoiceForm } from "./InvoiceForm";
import { InvoicePreview } from "./InvoicePreview";
import { PDFDocument } from "./PDFDocument";
import { LANGUAGES, getT } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";

const today = new Date().toISOString().split("T")[0];

const defaultValues: InvoiceFormValues = {
  senderName: "",
  senderEmail: "",
  senderAddress: "",
  senderPhone: "",
  clientName: "",
  clientEmail: "",
  clientAddress: "",
  clientPhone: "",
  invoiceNumber: "",
  invoiceDate: today,
  dueDate: "",
  currencyCode: "USD",
  discount: 0,
  lineItems: [
    { id: crypto.randomUUID(), description: "", quantity: 1, unitPrice: 0, discount: 0, taxRate: 0 },
  ],
  notes: "",
  paymentTerms: "",
  logoDataUrl: null,
};

export function InvoicePageClient() {
  const [lang, setLang] = useState<Lang>("en");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  const t = getT(lang);

  const form = useForm<InvoiceFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(invoiceSchema) as Resolver<InvoiceFormValues>,
    defaultValues,
    mode: "onBlur",
  });

  const watchedData = form.watch();

  async function onSubmit(data: InvoiceFormValues) {
    setIsGenerating(true);
    try {
      const calculations = computeInvoiceTotals(
        data.lineItems,
        data.currencyCode,
        Number(data.discount)
      );
      const { pdf } = await import("@react-pdf/renderer");
      const blob = await pdf(
        <PDFDocument data={data} calculations={calculations} lang={lang} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = data.invoiceNumber ? `invoice-${data.invoiceNumber}.pdf` : "invoice.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#8B5CF6] leading-tight">
              Free Invoice Generator
            </h1>
            <h2 className="text-xs text-gray-400 mt-0.5">
              Quota Invoice - Free invoice generator — no sign-up, instant PDF
            </h2>
          </div>

          {/* Language selector */}
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs text-gray-400">Select your language</span>
            <div className="flex items-center gap-1">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => setLang(l.code)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors ${
                    lang === l.code
                      ? "bg-[#8B5CF6] text-white"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Top leaderboard ad — 728×90 */}
      <div
        className="border-b border-dashed border-gray-200 bg-gray-50 flex items-center justify-center h-[90px]"
        aria-label="Advertisement"
        data-ad-slot="top-leaderboard"
        data-ad-format="leaderboard"
        data-ad-size="728x90"
      >
        <span className="text-xs text-gray-300">Advertisement</span>
      </div>

      {/*
        Full-width grid: gutter-left | form (same width as header) | gutter-right
        The center column uses the same max-width as the header's max-w-6xl (1152px).
        Ads sit in the 1fr gutter columns and are hidden when there isn't enough space.
      */}
      <div
        className="w-full"
        style={{ display: "grid", gridTemplateColumns: "1fr minmax(0, 1152px) 1fr" }}
      >
        {/* Left gutter ad */}
        <aside
          className="hidden xl:block py-6 pl-3 pr-2"
          aria-label="Advertisement"
          data-ad-slot="left-sidebar"
          data-ad-format="half-page"
          data-ad-size="300x600"
        >
          <div className="sticky top-4 h-[600px] rounded border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
            <span className="text-xs text-gray-300 [writing-mode:vertical-lr]">Advertisement</span>
          </div>
        </aside>

        {/* Form — center column, aligned with header */}
        <div className="px-4 py-6">
          <InvoiceForm
            form={form}
            onSubmit={onSubmit}
            isGenerating={isGenerating}
            lang={lang}
            t={t}
          />
        </div>

        {/* Right gutter ad */}
        <aside
          className="hidden xl:block py-6 pl-2 pr-3"
          aria-label="Advertisement"
          data-ad-slot="right-sidebar"
          data-ad-format="half-page"
          data-ad-size="300x600"
        >
          <div className="sticky top-4 h-[600px] rounded border border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
            <span className="text-xs text-gray-300 [writing-mode:vertical-lr]">Advertisement</span>
          </div>
        </aside>
      </div>

      {/* Bottom leaderboard ad */}
      <div
        className="border-t border-dashed border-gray-200 bg-gray-50 flex items-center justify-center h-[90px] mt-6"
        aria-label="Advertisement"
        data-ad-slot="bottom-leaderboard"
        data-ad-format="leaderboard"
        data-ad-size="728x90"
      >
        <span className="text-xs text-gray-300">Advertisement</span>
      </div>

      <footer className="border-t border-gray-100 px-4 py-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4 text-xs text-gray-400">
          <Link href="/terms" className="hover:text-[#8B5CF6] transition-colors">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-[#8B5CF6] transition-colors">Privacy Policy</Link>
          <span>© {new Date().getFullYear()} Quota Invoice</span>
        </div>
      </footer>

      {/* Preview button */}
      <button
        type="button"
        className="fixed bottom-6 right-4 z-40 bg-[#8B5CF6] hover:bg-[#6D28D9] text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg transition-colors"
        onClick={() => setShowMobilePreview(true)}
      >
        Preview
      </button>

      {/* Preview modal */}
      {showMobilePreview && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col">
          <div className="flex items-center justify-between bg-white px-4 py-3 border-b shrink-0">
            <span className="font-semibold text-gray-800">Invoice Preview</span>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-800 text-2xl leading-none w-8 h-8 flex items-center justify-center"
              onClick={() => setShowMobilePreview(false)}
            >
              ×
            </button>
          </div>
          <div className="flex-1 overflow-auto bg-gray-100 p-4">
            <div className="max-w-2xl mx-auto">
              <InvoicePreview data={watchedData} lang={lang} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
