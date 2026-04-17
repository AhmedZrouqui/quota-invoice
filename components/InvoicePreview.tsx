"use client";

import dynamic from "next/dynamic";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { computeInvoiceTotals } from "@/lib/calculations";
import { PDFDocument } from "./PDFDocument";
import type { InvoiceFormValues } from "@/lib/validations";
import type { Lang } from "@/lib/i18n";

// Must be dynamically imported — BlobProvider uses browser APIs
const BlobProvider = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.BlobProvider),
  { ssr: false }
);

interface Props {
  data: InvoiceFormValues;
  lang: Lang;
}

export function InvoicePreview({ data, lang }: Props) {
  const debouncedData = useDebouncedValue(data, 500);

  const calculations = computeInvoiceTotals(
    debouncedData.lineItems ?? [],
    debouncedData.currencyCode || "USD",
    Number(debouncedData.discount) || 0
  );

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
        Preview
      </h2>
      {/* A4 aspect ratio container */}
      <div
        className="relative w-full flex-1 bg-white border border-gray-200 rounded shadow-sm overflow-hidden"
        style={{ aspectRatio: "1 / 1.414" }}
      >
        <BlobProvider
          document={
            <PDFDocument data={debouncedData} calculations={calculations} lang={lang} />
          }
        >
          {({ url, loading }: { url: string | null; loading: boolean; error: Error | null }) => {
            if (loading || !url) {
              return (
                <div className="absolute inset-0 flex items-center justify-center bg-[#F8FAFC]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-[#8B5CF6] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-gray-400">
                      Rendering preview…
                    </span>
                  </div>
                </div>
              );
            }
            return (
              <iframe
                src={url}
                title="Invoice preview"
                className="absolute inset-0 w-full h-full"
              />
            );
          }}
        </BlobProvider>
      </div>
    </div>
  );
}
