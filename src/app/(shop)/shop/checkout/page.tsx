import CheckoutForm from "@/components/shop/CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="bg-base min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black tracking-widest uppercase text-fg mb-2">
          Bestelling afronden
        </h1>
        <p className="text-fg-subtle mb-10">
          Vul je gegevens in. Wij nemen contact op voor betaling &amp; levering.
        </p>
        <CheckoutForm />
      </div>
    </div>
  );
}
