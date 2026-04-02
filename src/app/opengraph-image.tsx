import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Altijd Sfeervol, Altijd Sidetrack!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/logo/fineline.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#111110",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "32px",
        }}
      >
        <img src={logoSrc} height={260} style={{ objectFit: "contain" }} />
        <div
          style={{
            color: "#b0aca6",
            fontSize: "32px",
            letterSpacing: "0.15em",
            fontFamily: "sans-serif",
          }}
        >
          Altijd Sfeervol, Altijd Sidetrack!
        </div>
      </div>
    ),
    { ...size }
  );
}
