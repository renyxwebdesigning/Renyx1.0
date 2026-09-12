import type { JSX } from "react";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export function OgContent(): JSX.Element {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#0f0c0a",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "radial-gradient(circle at 12% 18%, rgba(249,115,22,0.28), transparent 55%)",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: "#f97316",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 42,
            fontWeight: 700,
            color: "#0f0c0a",
          }}
        >
          R
        </div>
        <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#f5f5f0" }}>
          Renyx
        </div>
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 48,
          fontSize: 58,
          fontWeight: 700,
          color: "#f5f5f0",
          maxWidth: 920,
          lineHeight: 1.15,
        }}
      >
        Webdesign Zürich für Kleinunternehmen
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 26,
          fontSize: 30,
          color: "#a8a29e",
          maxWidth: 820,
        }}
      >
        Von der Analyse bis zum Launch — persönlich, direkt, ohne Agentur-Aufpreis.
      </div>
    </div>
  );
}
