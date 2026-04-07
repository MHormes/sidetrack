import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacyverklaring | Sidetrack",
  description: "Privacyverklaring van Sidetrack — hoe wij omgaan met gegevens op sidetracksounds.nl.",
};

export default function PrivacyPage() {
  return (
    <section className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-fg mb-8">Privacyverklaring</h1>

      <div className="space-y-6 text-fg-muted text-sm leading-relaxed">
        <p>
          Sidetrack hecht waarde aan de privacy van bezoekers van{" "}
          <span className="text-fg">sidetracksounds.nl</span>. Op deze pagina
          leggen wij uit welke gegevens wij verzamelen en hoe wij daarmee
          omgaan.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-fg mb-2">Google Analytics</h2>
          <p>
            Wij gebruiken Google Analytics om bij te houden hoeveel bezoekers
            onze website bezoeken en welke pagina's het meest worden bekeken.
            Dit helpt ons de website te verbeteren. Google Analytics maakt
            gebruik van cookies — kleine tekstbestanden die op uw apparaat
            worden opgeslagen.
          </p>
          <ul className="list-disc list-inside mt-3 space-y-1">
            <li>De gegevens worden anoniem verwerkt; wij identificeren geen individuele personen.</li>
            <li>Cookies van Google Analytics worden maximaal 2 jaar bewaard.</li>
            <li>Google Analytics wordt alleen geladen na uw toestemming.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-fg mb-2">Toestemming intrekken</h2>
          <p>
            U kunt uw toestemming op elk moment intrekken door de cookies in uw
            browser te verwijderen. Bij uw volgende bezoek wordt opnieuw om
            toestemming gevraagd.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-fg mb-2">Contact</h2>
          <p>
            Heeft u vragen over deze privacyverklaring? Neem contact met ons op
            via de contact informatie op de{" "}
            <a href="/#contact" className="underline hover:text-fg transition-colors">
              hoofdpagina
            </a>
            .
          </p>
        </div>

        <p className="text-fg-subtle text-xs pt-4 border-t border-edge">
          Laatst bijgewerkt: april 2026
        </p>
      </div>
    </section>
  );
}
