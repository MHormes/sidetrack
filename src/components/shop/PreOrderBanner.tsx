/**
 * Reusable banner notifying users about the pre-order deadline.
 */
export default function PreOrderBanner({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      className={`bg-elevated border border-edge py-3 px-4 text-center ${className}`}
    >
      <p className="text-xs sm:text-sm font-bold tracking-wide text-accent max-w-3xl mx-auto">
        De eerste pre-order sluit op 10-06-2026 om 23.59u. Daarna is bestellen
        nog mogelijk, maar voldoening van de order wordt niet gegarandeerd.
      </p>
    </div>
  );
}
