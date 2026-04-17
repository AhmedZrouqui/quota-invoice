import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Quota Invoice",
  description: "Privacy policy for Quota Invoice. No invoice data is collected or stored. Learn how we handle your information.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://quota.live/privacy" },
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-10">Last updated: April 2025</p>

        <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">The short version</h2>
            <p>
              Quota Invoice does not collect, store, or transmit any of your invoice data. Everything
              you type stays in your browser and is gone when you close the tab. We do not run
              analytics. We do not have a user database. The only third-party service on this site is
              Google AdSense, which may use cookies to serve relevant ads.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Invoice data</h2>
            <p>
              All data you enter — company name, client name, addresses, line items, amounts,
              currency, logo — is processed exclusively inside your browser. It is never sent to
              our servers or any third-party service we control. When you close or refresh the
              page, it is permanently gone.
            </p>
            <p className="mt-2">
              The PDF is generated entirely client-side using your browser&rsquo;s processing power.
              No file is uploaded to generate it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Cookies and local storage</h2>
            <p>
              Quota Invoice itself does not set any cookies or use localStorage to store your data.
            </p>
            <p className="mt-2">
              However, this site displays advertisements served by{" "}
              <strong>Google AdSense</strong> (Google LLC). Google may use cookies and similar
              tracking technologies to serve personalized ads based on your browsing history. This
              is the only source of cookies on this site. You can learn more and manage your
              preferences at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5CF6] underline"
              >
                Google Ad Settings
              </a>{" "}
              or opt out of personalized advertising via the{" "}
              <a
                href="https://optout.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8B5CF6] underline"
              >
                Digital Advertising Alliance opt-out
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Analytics and tracking</h2>
            <p>
              We do not use Google Analytics, Mixpanel, or any other analytics service. We do not
              track page views, session durations, or user behaviour. We have no way of knowing
              how many invoices you have created.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Server logs</h2>
            <p>
              Like any website, our hosting provider (Vercel) may retain standard server access
              logs — IP address, browser type, referring URL, and timestamp — for security and
              operational purposes. These logs are not linked to any invoice data and are retained
              according to Vercel&rsquo;s own policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Your rights (GDPR / CCPA)</h2>
            <p>
              Because we do not collect or store personal data about you, most data rights (access,
              deletion, portability) are automatically satisfied — there is simply nothing to
              return or delete on our end.
            </p>
            <p className="mt-2">
              If you have concerns about Google&rsquo;s use of your data for ad personalisation,
              contact Google directly or use the opt-out links in section 2 above.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Changes to this policy</h2>
            <p>
              We may update this policy if our practices change. The date at the top of this page
              reflects when it was last revised. Continued use of Quota Invoice after changes are
              posted constitutes your acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">7. Contact</h2>
            <p>
              Privacy questions? Reach us at{" "}
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
          <Link href="/terms" className="hover:text-[#8B5CF6] transition-colors">Terms of Service</Link>
          <span>© {new Date().getFullYear()} Quota Invoice</span>
        </div>
      </footer>
    </div>
  );
}
