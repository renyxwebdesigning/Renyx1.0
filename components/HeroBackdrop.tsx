"use client";

import { useEffect, useState } from "react";

// Der Partikel-Loop läuft nur auf grossen Bildschirmen und ohne «reduzierte Bewegung»;
// sonst bleibt das Standbild, damit das Handy keine Videodaten laden muss.
export default function HeroBackdrop() {
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const big = window.matchMedia("(min-width: 768px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (big && !calm) {
      const id = requestAnimationFrame(() => setPlay(true));
      return () => cancelAnimationFrame(id);
    }
  }, []);

  return (
    <div aria-hidden className="absolute inset-0">
      {/* Das Material hat harte Bildkanten: vergrössert liegen sie ausserhalb, die Maske lässt den Rest auslaufen */}
      <div
        className="absolute inset-0 origin-[40%_60%] scale-[1.24]"
        style={{
          maskImage: "radial-gradient(ellipse 38% 70% at 58% 42%, #000 45%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 38% 70% at 58% 42%, #000 45%, transparent 100%)",
        }}
      >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/hero/gold-particles-poster.jpg" alt="" className="h-full w-full object-cover opacity-80" />
      {play && (
        <video
          src="/hero/gold-particles-loop.mp4"
          poster="/hero/gold-particles-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-80"
        />
      )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/10" />
    </div>
  );
}
