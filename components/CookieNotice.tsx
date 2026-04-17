"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem("cookie-notice-dismissed")) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable — don't show
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem("cookie-notice-dismissed", "1");
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
        <p className="flex-1 min-w-0">
          Your invoice data never leaves your browser — we store nothing.{" "}
          <span className="text-gray-400">
            Ads on this page are served by Google AdSense, which may use cookies.{" "}
          </span>
          <Link href="/privacy" className="text-[#8B5CF6] underline whitespace-nowrap">
            Privacy policy
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 bg-[#8B5CF6] hover:bg-[#6D28D9] text-white text-xs font-medium px-4 py-1.5 rounded transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
