"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

const CONSENT_KEY = "cookie_consent";

export default function CookieBanner() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted" || stored === "declined") {
      setConsent(stored);
    } else {
      setConsent(null);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
  }

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-070CGE8L1R"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-070CGE8L1R');
          `}</Script>
        </>
      )}

      {consent === null && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-base border-t border-edge">
          <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-sm text-fg-muted flex-1">
              Wij gebruiken cookies om bezoeken aan onze website bij te houden.{" "}
              <Link href="/privacy" className="underline hover:text-fg transition-colors">
                Meer informatie
              </Link>
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={decline}
                className="px-4 py-1.5 text-sm text-fg-subtle hover:text-fg border border-edge rounded transition-colors"
              >
                Weigeren
              </button>
              <button
                onClick={accept}
                className="px-4 py-1.5 text-sm bg-accent hover:bg-accent-hover text-inverse rounded transition-colors"
              >
                Accepteren
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
