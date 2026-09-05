"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canHover || reduceMotion) return;

    document.documentElement.classList.add("cursor-none-fine");

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, textarea, [data-cursor-hover]");
      targetScale = interactive ? 1.7 : 1;
      if (ringRef.current) {
        ringRef.current.style.opacity = interactive ? "0.7" : "0.3";
        ringRef.current.style.borderColor = interactive
          ? "rgba(249,115,22,0.9)"
          : "rgba(249,115,22,0.6)";
      }
    };

    // All transform state (position + scale) is written together every
    // frame, in a single inline `transform`, so nothing can fight the JS
    // for that property — a class-based scale here would be silently
    // clobbered by the next rAF write and never actually render.
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      scale += (targetScale - scale) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("cursor-none-fine");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-1.5 w-1.5 rounded-full bg-accent hidden md:block"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-8 w-8 rounded-full border border-accent/60 opacity-30 hidden md:block"
        aria-hidden
      />
    </>
  );
}
