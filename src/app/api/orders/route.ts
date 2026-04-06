import { NextRequest, NextResponse } from "next/server";
import { db, orders, orderItems } from "@/db";
import { sendOrderEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { customer, items } = body as {
    customer: {
      naam: string;
      email: string;
      telefoon?: string;
      straat: string;
      postcode: string;
      stad: string;
      opmerking?: string;
    };
    items: {
      productId: number;
      productName: string;
      size: string | null;
      quantity: number;
      priceCents: number;
    }[];
  };

  if (!customer?.naam || !customer?.email || !customer?.straat || !customer?.postcode || !customer?.stad) {
    return NextResponse.json({ error: "Verplichte velden ontbreken." }, { status: 400 });
  }
  if (!items?.length) {
    return NextResponse.json({ error: "Geen items in bestelling." }, { status: 400 });
  }

  const [order] = await db.insert(orders).values({
    naam:      customer.naam,
    email:     customer.email,
    telefoon:  customer.telefoon ?? null,
    straat:    customer.straat,
    postcode:  customer.postcode,
    stad:      customer.stad,
    opmerking: customer.opmerking ?? null,
  }).returning({ id: orders.id });

  await db.insert(orderItems).values(
    items.map((item) => ({
      orderId:     order.id,
      productId:   item.productId,
      productName: item.productName,
      size:        item.size ?? null,
      quantity:    item.quantity,
      priceCents:  item.priceCents,
    }))
  );

  await sendOrderEmails(order.id, customer, items);

  return NextResponse.json({ orderId: order.id }, { status: 201 });
}
