import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const postcode = searchParams.get("postcode")?.replace(/\s/g, "").toUpperCase();
  const huisnummer = searchParams.get("huisnummer");

  if (!postcode || !huisnummer) {
    return NextResponse.json({ error: "Postcode en huisnummer zijn verplicht." }, { status: 400 });
  }

  // Strip any extension (e.g. "3c" → "3") — the API only accepts a numeric house number
  const houseNumber = huisnummer.match(/^\d+/)?.[0];
  if (!houseNumber) {
    return NextResponse.json({ error: "Ongeldig huisnummer." }, { status: 400 });
  }

  const apiKey = process.env.POSTCODE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Postcode API niet geconfigureerd." }, { status: 500 });
  }

  try {
    const url = `https://postcode.tech/api/v1/postcode?postcode=${postcode}&number=${houseNumber}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 86400 }, // cache per address for 24h
    });

    if (res.status === 404 || !res.ok) {
      return NextResponse.json({ error: "Adres niet gevonden." }, { status: 404 });
    }

    const data = await res.json();

    if (!data.street || !data.city) {
      return NextResponse.json({ error: "Adres niet gevonden." }, { status: 404 });
    }

    return NextResponse.json({ street: data.street, city: data.city });
  } catch {
    return NextResponse.json({ error: "Adres opzoeken mislukt." }, { status: 500 });
  }
}
