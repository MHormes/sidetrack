import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? "noreply@sidetracksounds.nl";
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL ?? "sidetrack.roermond@gmail.com";

type Customer = {
  naam: string;
  email: string;
  telefoon?: string | null;
  straat: string;
  postcode: string;
  stad: string;
  opmerking?: string | null;
};

type OrderItem = {
  productId: number;
  productName: string;
  size: string | null;
  quantity: number;
  priceCents: number;
};

function formatPrice(cents: number): string {
  return `€ ${(cents / 100).toFixed(2).replace(".", ",")}`;
}

function totalCents(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}

function customerItemsTable(items: OrderItem[]): string {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #272523;color:#f5f2ef;">${item.productName}${item.size ? ` (${item.size})` : ""}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #272523;text-align:center;color:#b0aca6;">${item.quantity}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #272523;text-align:right;color:#b0aca6;">${formatPrice(item.priceCents)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #272523;text-align:right;color:#f5f2ef;">${formatPrice(item.priceCents * item.quantity)}</td>
      </tr>`
    )
    .join("");

  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <thead>
        <tr style="background:#272523;">
          <th style="padding:8px 12px;text-align:left;font-weight:600;color:#b0aca6;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Product</th>
          <th style="padding:8px 12px;text-align:center;font-weight:600;color:#b0aca6;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Aantal</th>
          <th style="padding:8px 12px;text-align:right;font-weight:600;color:#b0aca6;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Stukprijs</th>
          <th style="padding:8px 12px;text-align:right;font-weight:600;color:#b0aca6;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;">Totaal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr style="background:#272523;">
          <td colspan="3" style="padding:10px 12px;text-align:right;font-weight:700;color:#b0aca6;">Totaal</td>
          <td style="padding:10px 12px;text-align:right;font-weight:700;color:#b87058;">${formatPrice(totalCents(items))}</td>
        </tr>
      </tfoot>
    </table>`;
}

function bandItemsTable(items: OrderItem[]): string {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;">${item.productName}${item.size ? ` (${item.size})` : ""}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(item.priceCents)}</td>
        <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(item.priceCents * item.quantity)}</td>
      </tr>`
    )
    .join("");

  return `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th style="padding:8px 12px;text-align:left;font-weight:600;">Product</th>
          <th style="padding:8px 12px;text-align:center;font-weight:600;">Aantal</th>
          <th style="padding:8px 12px;text-align:right;font-weight:600;">Stukprijs</th>
          <th style="padding:8px 12px;text-align:right;font-weight:600;">Totaal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="padding:10px 12px;text-align:right;font-weight:700;">Totaal:</td>
          <td style="padding:10px 12px;text-align:right;font-weight:700;">${formatPrice(totalCents(items))}</td>
        </tr>
      </tfoot>
    </table>`;
}

function customerEmailHtml(orderId: number, customer: Customer, items: OrderItem[]): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#111110;font-family:Arial,Helvetica,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111110;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#1c1b19;border-top:3px solid #b87058;padding:28px 32px 24px;">
            <p style="margin:0;font-size:20px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#f5f2ef;">Sidetrack</p>
            <p style="margin:6px 0 0;font-size:13px;color:#b0aca6;">Bevestiging van je bestelling</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#1c1b19;padding:0 32px 32px;">

            <h1 style="margin:0 0 4px;font-size:18px;color:#f5f2ef;">Bedankt, ${customer.naam}!</h1>
            <p style="margin:0 0 20px;font-size:13px;color:#6b6760;">Bestelnummer: <span style="color:#b87058;font-weight:600;">#${orderId}</span></p>

            <p style="margin:0 0 24px;font-size:14px;color:#b0aca6;line-height:1.6;">
              We hebben je bestelling goed ontvangen. We nemen zo snel mogelijk contact op via dit e-mailadres voor betaling en levering.
            </p>

            <!-- Divider -->
            <div style="border-top:1px solid #272523;margin-bottom:24px;"></div>

            <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b6760;">Bestelde artikelen</p>
            ${customerItemsTable(items)}
            ${customer.opmerking ? `
            <p style="margin:8px 0 0;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b6760;">Opmerking</p>
            <p style="margin:6px 0 0;font-size:14px;color:#b0aca6;">${customer.opmerking}</p>
            ` : ""}

            <!-- Divider -->
            <div style="border-top:1px solid #272523;margin:24px 0;"></div>

            <p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#6b6760;">Bezorgadres</p>
            <p style="margin:0;font-size:14px;color:#b0aca6;line-height:1.8;">
              ${customer.naam}<br>
              ${customer.straat}<br>
              ${customer.postcode} ${customer.stad}
            </p>

            <!-- Divider -->
            <div style="border-top:1px solid #272523;margin:24px 0;"></div>

            <p style="margin:0;font-size:13px;color:#6b6760;">
              Vragen? Mail ons op <a href="mailto:${NOTIFICATION_EMAIL}" style="color:#b87058;text-decoration:none;">${NOTIFICATION_EMAIL}</a>
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#111110;padding:20px 32px;border-top:1px solid #272523;">
            <p style="margin:0;font-size:12px;color:#4a4744;">Sidetrack &mdash; sidetracksounds.nl</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}

function bandEmailHtml(orderId: number, customer: Customer, items: OrderItem[]): string {
  const now = new Date().toLocaleString("nl-NL", { timeZone: "Europe/Amsterdam" });
  return `
<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"></head>
<body style="font-family:sans-serif;color:#1a1a1a;max-width:600px;margin:0 auto;padding:24px;">
  <h1 style="font-size:20px;">Nieuwe bestelling #${orderId}</h1>
  <p style="color:#555;font-size:13px;">Ontvangen op: ${now}</p>

  <h2 style="font-size:16px;margin-bottom:8px;">Klantgegevens</h2>
  <table style="border-collapse:collapse;">
    <tr><td style="padding:4px 16px 4px 0;color:#555;">Naam</td><td>${customer.naam}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#555;">E-mail</td><td><a href="mailto:${customer.email}">${customer.email}</a></td></tr>
    ${customer.telefoon ? `<tr><td style="padding:4px 16px 4px 0;color:#555;">Telefoon</td><td>${customer.telefoon}</td></tr>` : ""}
    <tr><td style="padding:4px 16px 4px 0;color:#555;">Adres</td><td>${customer.straat}, ${customer.postcode} ${customer.stad}</td></tr>
  </table>

  <h2 style="font-size:16px;margin-top:24px;margin-bottom:8px;">Bestelling</h2>
  ${bandItemsTable(items)}
  ${customer.opmerking ? `<p style="margin:8px 0 0;font-size:13px;"><strong>Opmerking:</strong> ${customer.opmerking}</p>` : ""}
</body>
</html>`;
}

export async function sendOrderEmails(
  orderId: number,
  customer: Customer,
  items: OrderItem[]
): Promise<void> {
  try {
    await Promise.all([
      resend.emails.send({
        from: FROM_EMAIL,
        to: customer.email,
        subject: `Bestelling #${orderId} ontvangen — Sidetrack`,
        html: customerEmailHtml(orderId, customer, items),
      }),
      resend.emails.send({
        from: FROM_EMAIL,
        to: NOTIFICATION_EMAIL,
        subject: `Nieuwe bestelling #${orderId} — ${customer.naam}`,
        html: bandEmailHtml(orderId, customer, items),
      }),
    ]);
  } catch (err) {
    console.error("[email] Failed to send order emails for order", orderId, err);
  }
}
