"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-strong sticky top-0 z-50 border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-text"
          onClick={() => setOpen(false)}
        >
          Renyx<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors ${
                    active ? "text-text" : "text-text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/kontakt"
          className="hidden rounded-full bg-accent px-5 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover md:inline-block"
        >
          Projekt starten
        </Link>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`h-px w-6 bg-text transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`}
          />
          <span className={`h-px w-6 bg-text transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 bg-text transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-2.5 text-base font-medium ${
                      pathname === link.href
                        ? "bg-bg-elevated text-text"
                        : "text-text-muted"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
