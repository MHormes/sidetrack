import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Algemene voorwaarden | Sidetrack Shop",
  description: "Algemene voorwaarden voor bestellingen in de Sidetrack webshop.",
};

export default function VoorwaardenPage() {
  return (
    <div className="bg-base min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-black tracking-widest uppercase text-fg mb-2">
          Algemene voorwaarden
        </h1>
        <p className="text-fg-subtle mb-10 text-sm">Sidetrack Shop — Roermond</p>

        <div className="space-y-8 text-sm text-fg-muted leading-relaxed">

          <div>
            <h2 className="text-base font-bold text-fg mb-3">1. Pre-order systeem</h2>
            <p>
              Alle artikelen in de Sidetrack Shop worden aangeboden als{" "}
              <strong className="text-fg">pre-order</strong>. Dit houdt in dat
              producten nog niet direct beschikbaar zijn bij het plaatsen van je
              bestelling. Door een bestelling te plaatsen reserveer je een artikel;
              betaling vindt <em>niet</em> automatisch plaats bij het afrekenen.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-fg mb-3">2. Betalingsverplichting</h2>
            <p>
              Zodra Sidetrack bevestigt dat jouw bestelling geleverd kan worden,
              ben je als klant verplicht om het verschuldigde bedrag te voldoen.
              Wij nemen hiervoor contact met je op via het opgegeven e-mailadres of
              telefoonnummer. Betaling dient te worden voldaan{" "}
              <strong className="text-fg">
                voordat het product wordt opgestuurd of afgeleverd
              </strong>
              , tenzij wij uitdrukkelijk anders afspreken.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-fg mb-3">3. Annulering door Sidetrack</h2>
            <p>
              Sidetrack behoudt zich het recht voor om een bestelling te annuleren
              in de volgende gevallen:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1.5">
              <li>
                Er worden te weinig bestellingen geplaatst om productie of
                inkoop rendabel te maken.
              </li>
              <li>
                Er worden meer bestellingen geplaatst dan er artikelen beschikbaar
                zijn en jouw bestelling valt buiten de beschikbare voorraad.
              </li>
              <li>
                Er zijn onvoorziene omstandigheden waardoor levering niet mogelijk
                is.
              </li>
            </ul>
            <p className="mt-3">
              In geval van annulering door Sidetrack ontvang je hierover bericht.
              Er zijn geen kosten verbonden aan een dergelijke annulering, aangezien
              er nog geen betaling heeft plaatsgevonden.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-fg mb-3">4. Annulering door de klant</h2>
            <p>
              Zolang Sidetrack jouw bestelling nog niet heeft bevestigd, kun je
              je bestelling annuleren door contact met ons op te nemen via de contactinformatie op de{" "}
              <a href="/#contact" className="underline hover:text-fg transition-colors">
                hoofdpagina
              </a>
              . Na bevestiging van levering is annulering niet meer mogelijk,
              tenzij wij hier in onderling overleg anders over besluiten.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-fg mb-3">5. Levertijd</h2>
            <p>
              Na bevestiging van levering en ontvangst van betaling streven wij
              ernaar de bestelling zo spoedig mogelijk te verzenden of af te
              leveren. Een exacte levertijd kunnen wij op voorhand niet garanderen.
              Wij communiceren de verwachte levertijd bij bevestiging.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-fg mb-3">6. Contact</h2>
            <p>
              Vragen over je bestelling of deze voorwaarden? Neem contact met ons
              op via de contactinformatie op de{" "}
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
      </div>
    </div>
  );
}
