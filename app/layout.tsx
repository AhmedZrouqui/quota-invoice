import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CookieNotice } from "@/components/CookieNotice";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Free Invoice Generator (No Sign-Up) — Create & Download PDF Invoices",
  description:
    "Free online invoice generator. No sign-up required. Create, customize, and download professional PDF invoices instantly.",
  keywords: [
    "free invoice generator",
    "online invoice maker",
    "create invoice PDF",
    "invoice template free",
    "freelance invoice generator",
    "small business invoice",
    "PDF invoice maker",
    "invoice creator online",
    "no registration invoice",
    "instant invoice download",
    "professional invoice template",
    "invoice with tax",
    "invoice generator",
    "invoice easy",
    "invoice online",
    "invoice PDF",
    "multi-currency invoice",
  ],
  openGraph: {
    title: "Free Invoice Generator (No Sign-Up) — Create & Download PDF Invoices",
    description:
      "Free online invoice generator. No sign-up required. Create, customize, and download professional PDF invoices instantly.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Invoice Generator (No Sign-Up) — Create & Download PDF Invoices",
    description:
      "Free online invoice generator. No sign-up required. Create, customize, and download professional PDF invoices instantly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://quota.live",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <Script
          id="adsense-init"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6248403565159369`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
        <CookieNotice />
      </body>
    </html>
  );
}
