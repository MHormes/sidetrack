'use client';

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart";

type FormData = {
  naam: string;
  email: string;
  telefoon: string;
  huisnummer: string;
  straat: string;
  postcode: string;
  stad: string;
  opmerking: string;
};

const empty: FormData = {
  naam: "", email: "", telefoon: "",
  huisnummer: "", straat: "", postcode: "", stad: "", opmerking: "",
};

const COUNTRIES = [
  { code: "NL", prefix: "+31",  label: "🇳🇱 +31"  },
  { code: "BE", prefix: "+32",  label: "🇧🇪 +32"  },
  { code: "DE", prefix: "+49",  label: "🇩🇪 +49"  },
  { code: "FR", prefix: "+33",  label: "🇫🇷 +33"  },
  { code: "GB", prefix: "+44",  label: "🇬🇧 +44"  },
  { code: "LU", prefix: "+352", label: "🇱🇺 +352" },
  { code: "ES", prefix: "+34",  label: "🇪🇸 +34"  },
  { code: "IT", prefix: "+39",  label: "🇮🇹 +39"  },
  { code: "PT", prefix: "+351", label: "🇵🇹 +351" },
];

const DUTCH_POSTCODE = /^\d{4}\s?[A-Z]{2}$/i;

type LookupStatus = "idle" | "loading" | "found" | "not-found" | "manual";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// E.164: total digits (prefix + local) ≤ 15. Local part: 4–13 digits covers every real number.
function isValidPhone(value: string) {
  return value.length >= 4 && value.length <= 13;
}

export default function CheckoutForm() {
  const { items, removeItem, clearCart } = useCart();
  const [form, setForm] = useState<FormData>(empty);
  const [prefix, setPrefix] = useState("+31");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [lookupStatus, setLookupStatus] = useState<LookupStatus>("idle");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lookupStatusRef = useRef<LookupStatus>("idle");
  lookupStatusRef.current = lookupStatus;

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  // Postcode lookup — only fires when the user changes postcode or huisnummer
  useEffect(() => {
    const status = lookupStatusRef.current;
    if (status === "manual") return;

    const { postcode, huisnummer } = form;
    const isDutch = DUTCH_POSTCODE.test(postcode.trim());

    // Non-Dutch postcode (complete but wrong format) → manual
    if (postcode.trim().length >= 6 && !isDutch) {
      setLookupStatus("manual");
      return;
    }

    // Not enough info yet
    if (!isDutch || !huisnummer.trim()) {
      if (status !== "idle") setLookupStatus("idle");
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLookupStatus("loading");
      try {
        const res = await fetch(
          `/api/address-lookup?postcode=${encodeURIComponent(postcode.trim())}&huisnummer=${encodeURIComponent(huisnummer.trim())}`
        );
        if (res.ok) {
          const data = await res.json();
          setForm((prev) => ({ ...prev, straat: data.street, stad: data.city }));
          setLookupStatus("found");
        } else {
          setLookupStatus("not-found");
        }
      } catch {
        setLookupStatus("not-found");
      }
    }, 400);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.postcode, form.huisnummer]);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const digits = e.target.value.replace(/\D/g, "");
    set("telefoon", digits);
    if (phoneError) setPhoneError(null);
  }

  function handlePhoneBlur() {
    if (!isValidPhone(form.telefoon)) {
      setPhoneError("Vul een geldig telefoonnummer in.");
    } else {
      setPhoneError(null);
    }
  }

  function handleEmailBlur() {
    if (form.email && !isValidEmail(form.email)) {
      setEmailError("Vul een geldig e-mailadres in.");
    } else {
      setEmailError(null);
    }
  }

  function handlePostcodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    set("postcode", e.target.value);
    // Reset to idle so lookup re-triggers; unless already manual
    if (lookupStatus !== "manual") setLookupStatus("idle");
    // Clear auto-filled fields when postcode changes
    if (lookupStatus === "found") {
      setForm((prev) => ({ ...prev, postcode: e.target.value, straat: "", stad: "" }));
    }
  }

  function handleHuisnummerChange(e: React.ChangeEvent<HTMLInputElement>) {
    set("huisnummer", e.target.value);
    if (lookupStatus === "found") {
      setForm((prev) => ({ ...prev, huisnummer: e.target.value, straat: "", stad: "" }));
      setLookupStatus("idle");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let valid = true;
    if (!isValidEmail(form.email)) {
      setEmailError("Vul een geldig e-mailadres in.");
      valid = false;
    }
    if (!isValidPhone(form.telefoon)) {
      setPhoneError("Vul een geldig telefoonnummer in.");
      valid = false;
    }
    if (!termsAccepted) {
      setTermsError(true);
      valid = false;
    }
    if (!valid) return;

    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            naam: form.naam,
            email: form.email,
            telefoon: form.telefoon ? `${prefix} ${form.telefoon}` : "",
            straat: `${form.straat} ${form.huisnummer}`.trim(),
            postcode: form.postcode,
            stad: form.stad,
            opmerking: form.opmerking,
          },
          items: items.map((i) => ({
            productId:   i.product.id,
            productName: i.product.name,
            size:        i.size,
            quantity:    i.quantity,
            priceCents:  Math.round(i.product.price * 100),
          })),
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Er is iets misgegaan. Probeer het opnieuw.");
        return;
      }
      clearCart();
      setSubmitted(true);
    } catch {
      setError("Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center gap-6 py-24">
        <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl">
          ✓
        </div>
        <div>
          <h2 className="text-xl font-black tracking-widest uppercase text-fg mb-2">
            Bestelling ontvangen!
          </h2>
          <p className="text-fg-muted max-w-sm">
            Bedankt voor je bestelling. We nemen zo snel mogelijk contact op via <span className="text-fg font-medium">{form.email} </span> voor betaling &amp; levering.
          </p>
        </div>
        <Link
          href="/shop"
          className="mt-4 text-xs font-bold tracking-widest uppercase text-fg-subtle hover:text-fg transition-colors border border-edge-mid hover:border-edge-soft px-6 py-3"
        >
          Terug naar shop
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-24">
        <p className="text-fg-subtle">Je winkelmandje is leeg.</p>
        <Link
          href="/shop"
          className="text-xs font-bold tracking-widest uppercase text-fg-subtle hover:text-fg transition-colors border border-edge-mid hover:border-edge-soft px-6 py-3"
        >
          Terug naar shop
        </Link>
      </div>
    );
  }

  const inputClass = "bg-subtle border border-edge text-fg placeholder:text-fg-faint px-4 py-3 text-sm focus:outline-none focus:border-edge-soft w-full resize-none";
  const disabledClass = "disabled:opacity-50 disabled:cursor-not-allowed";
  const addressEditable = lookupStatus === "not-found" || lookupStatus === "manual";
  const addressLoading = lookupStatus === "loading";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">

      {/* Personal info */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xs font-bold tracking-widest uppercase text-fg-subtle border-b border-edge pb-3">
          Persoonlijke gegevens
        </h2>

        <Field label="Naam" required>
          <input
            type="text"
            value={form.naam}
            onChange={(e) => set("naam", e.target.value)}
            required
            placeholder="Voor- en achternaam"
          />
        </Field>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-widest uppercase text-fg-muted">
            E-mailadres<span className="text-accent ml-1">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => { set("email", e.target.value); if (emailError) setEmailError(null); }}
            onBlur={handleEmailBlur}
            required
            placeholder="jouw@email.nl"
            className={`${inputClass} ${emailError ? "border-red-400" : ""}`}
          />
          {emailError && <p className="text-xs text-red-400">{emailError}</p>}
        </div>

        {/* Phone with country prefix */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-widest uppercase text-fg-muted">
            Telefoonnummer<span className="text-accent ml-1">*</span>
          </label>
          <div className="flex gap-2">
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="bg-subtle border border-edge text-fg text-sm px-2 py-3 focus:outline-none focus:border-edge-soft shrink-0"
            >
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.prefix}>{c.label}</option>
              ))}
            </select>
            <input
              type="text"
              inputMode="numeric"
              value={form.telefoon}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              placeholder="6 12 34 56 78"
              className={`${inputClass} ${phoneError ? "border-red-400" : ""}`}
            />
          </div>
          {phoneError && <p className="text-xs text-red-400">{phoneError}</p>}
        </div>

        <h2 className="text-xs font-bold tracking-widest uppercase text-fg-subtle border-b border-edge pb-3 mt-2">
          Bezorgadres
        </h2>

        {/* Postcode + huisnummer row */}
        <div className="grid grid-cols-[2fr_1fr] gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest uppercase text-fg-muted">
              Postcode<span className="text-accent ml-1">*</span>
            </label>
            <input
              type="text"
              value={form.postcode}
              onChange={handlePostcodeChange}
              required
              placeholder="1234 AB"
              className={inputClass}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold tracking-widest uppercase text-fg-muted">
              Huisnummer<span className="text-accent ml-1">*</span>
            </label>
            <input
              type="text"
              value={form.huisnummer}
              onChange={handleHuisnummerChange}
              required
              placeholder="10A"
              className={inputClass}
            />
          </div>
        </div>

        {/* Lookup status messages */}
        {addressLoading && (
          <p className="text-xs text-fg-subtle -mt-3">Adres opzoeken...</p>
        )}
        {lookupStatus === "not-found" && (
          <p className="text-xs text-fg-subtle -mt-3">Adres niet gevonden. Vul straat en stad handmatig in.</p>
        )}

        {/* Straat */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-widest uppercase text-fg-muted">
            Straat<span className="text-accent ml-1">*</span>
          </label>
          <input
            type="text"
            value={form.straat}
            onChange={(e) => set("straat", e.target.value)}
            required
            disabled={!addressEditable}
            placeholder="Straatnaam"
            className={`${inputClass} ${disabledClass}`}
          />
          {lookupStatus === "found" && (
            <button
              type="button"
              onClick={() => { setLookupStatus("manual"); }}
              className="text-xs text-fg-subtle hover:text-fg transition-colors self-start"
            >
              Wijzigen
            </button>
          )}
        </div>

        {/* Stad */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold tracking-widest uppercase text-fg-muted">
            Stad<span className="text-accent ml-1">*</span>
          </label>
          <input
            type="text"
            value={form.stad}
            onChange={(e) => set("stad", e.target.value)}
            required
            disabled={!addressEditable}
            placeholder="Amsterdam"
            className={`${inputClass} ${disabledClass}`}
          />
        </div>

        <Field label="Opmerking">
          <textarea
            value={form.opmerking}
            onChange={(e) => set("opmerking", e.target.value)}
            rows={3}
            placeholder="Eventuele opmerkingen..."
          />
        </Field>
      </div>

      {/* Order summary */}
      <div className="flex flex-col gap-6">
        <h2 className="text-xs font-bold tracking-widest uppercase text-fg-subtle border-b border-edge pb-3">
          Jouw bestelling
        </h2>

        <ul className="flex flex-col divide-y divide-edge">
          {items.map((item) => (
            <li key={`${item.product.id}-${item.size}`} className="flex gap-4 py-4">
              <div className="relative w-16 h-16 bg-subtle shrink-0 overflow-hidden">
                {item.product.image ? (
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image src="/images/logo/fineline.png" alt="" width={24} height={32} className="opacity-10" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-fg text-sm">{item.product.name}</p>
                {item.size && <p className="text-xs text-fg-subtle mt-0.5">Maat: {item.size}</p>}
                <p className="text-xs text-fg-muted mt-1">{item.quantity} × €{item.product.price.toFixed(2)}</p>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.product.id, item.size)}
                className="text-fg-faint hover:text-fg transition-colors text-sm shrink-0 self-start"
                aria-label="Verwijder"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between border-t border-edge pt-4 text-fg">
          <span className="text-sm font-bold tracking-widest uppercase">Totaal</span>
          <span className="font-black text-xl">€{subtotal.toFixed(2)}</span>
        </div>

        <p className="text-xs text-fg-subtle leading-relaxed border border-edge p-4">
          Dit is een pre-order. Betaling vindt plaats na contact met ons over levering. Hier kunnen een aantal dagen overheen gaan.
        </p>

        <div className="flex flex-col gap-1.5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => { setTermsAccepted(e.target.checked); if (e.target.checked) setTermsError(false); }}
              className="mt-0.5 shrink-0 accent-[var(--color-accent)] w-4 h-4 cursor-pointer"
            />
            <span className="text-xs text-fg-muted leading-relaxed">
              Ik ga akkoord met de{" "}
              <Link href="/shop/voorwaarden" className="underline hover:text-fg transition-colors" target="_blank">
                algemene voorwaarden
              </Link>
              , waaronder de pre-order voorwaarden en betalingsverplichting bij levering.
              <span className="text-accent ml-1">*</span>
            </span>
          </label>
          {termsError && (
            <p className="text-xs text-red-400 pl-7">Je moet akkoord gaan met de voorwaarden om een bestelling te plaatsen.</p>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-400 border border-red-400/30 px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-accent text-on-accent font-black text-sm tracking-widest uppercase hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Bestelling wordt geplaatst..." : "Bestelling plaatsen"}
        </button>

        <Link
          href="/shop"
          className="text-center text-xs font-bold tracking-widest uppercase text-fg-subtle hover:text-fg transition-colors"
        >
          ← Terug naar shop
        </Link>
      </div>

    </form>
  );
}

function Field({ label, required, children }: {
  label: string;
  required?: boolean;
  children: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold tracking-widest uppercase text-fg-muted">
        {label}{required && <span className="text-accent ml-1">*</span>}
      </label>
      {React.cloneElement(children, {
        className: "bg-subtle border border-edge text-fg placeholder:text-fg-faint px-4 py-3 text-sm focus:outline-none focus:border-edge-soft w-full resize-none",
      } as React.HTMLAttributes<HTMLElement>)}
    </div>
  );
}
