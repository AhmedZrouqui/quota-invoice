import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — Quota Invoice",
  description: "Terms of service for Quota Invoice, the free online invoice generator.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://quota.live/terms" },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-[#8B5CF6]">
            Quota Invoice
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-[#8B5CF6] transition-colors">
            ← Back to invoice generator
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">1. What Quota Invoice is</h2>
            <p>
              Quota Invoice is a free, browser-based invoice generator. You fill in your details, and the
              application generates a PDF invoice entirely inside your browser. No account is needed. No
              invoice data is sent to or stored on any server.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Your data</h2>
            <p>
              All invoice data you enter — company name, client details, line items, amounts — is processed
              exclusively on your device. When you close or refresh the page, it is gone. We have no access
              to it, we do not store it, and we do not transmit it anywhere.
            </p>
            <p className="mt-2">
              The PDF is also generated entirely on your device using your browser. Nothing is uploaded to
              generate it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Your responsibility for invoice accuracy</h2>
            <p>
              Quota Invoice is a formatting and calculation tool. You are solely responsible for the accuracy,
              legality, and completeness of the invoices you create. This includes but is not limited to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Correct tax rates applicable in your jurisdiction</li>
              <li>Required legal fields for your country or industry</li>
              <li>Correct currency and amounts</li>
              <li>Any regulatory or accounting requirements</li>
            </ul>
            <p className="mt-2">
              We do not provide legal, tax, or accounting advice. When in doubt, consult a qualified professional.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">4. No warranties</h2>
            <p>
              Quota Invoice is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied.
              We do not guarantee that the service will be available at all times, error-free, or suitable for
              any particular purpose. We reserve the right to modify, suspend, or discontinue the service at
              any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Quota Invoice and its operators shall not be liable for
              any direct, indirect, incidental, or consequential damages arising from your use of this service,
              including but not limited to errors in generated invoices, loss of data, or financial loss.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Advertising</h2>
            <p>
              This site displays advertisements served by Google AdSense. These ads are provided by a
              third party (Google LLC) and are subject to{" "}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5CF6] underline"
              >
                Google&rsquo;s advertising policies
              </a>
              . We do not control the content of these ads and do not share any of your invoice data with
              advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">7. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. Continued use of Quota Invoice after changes are
              posted constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">8. Contact</h2>
            <p>
              Questions about these terms? Reach us at{" "}
              <a href="mailto:hello@quota.live" className="text-[#8B5CF6] underline">
                hello@quota.live
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-gray-100 px-4 py-6 mt-8">
        <div className="max-w-3xl mx-auto flex flex-wrap gap-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#8B5CF6] transition-colors">Home</Link>
          <Link href="/privacy" className="hover:text-[#8B5CF6] transition-colors">Privacy Policy</Link>
          <span>© {new Date().getFullYear()} Quota Invoice</span>
        </div>
      </footer>
    </div>
  );
}
