import { NextResponse } from "next/server";
import { Resend } from "resend";
import { CONTACT } from "@/lib/constants";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { name, company, email, phone, styleLabel, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, E-Mail und Nachricht sind erforderlich." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Mailversand ist nicht konfiguriert." }, { status: 500 });
  }

  const lines = [
    `Name: ${name}`,
    company ? `Firma: ${company}` : null,
    `E-Mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    styleLabel ? `Bevorzugter Stil: ${styleLabel}` : null,
    "",
    message,
  ].filter(Boolean);

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Renyx Kontaktformular <onboarding@resend.dev>",
      to: CONTACT.email,
      replyTo: email,
      subject: `Projektanfrage von ${name}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Versand fehlgeschlagen." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend threw:", err);
    return NextResponse.json({ error: "Versand fehlgeschlagen." }, { status: 502 });
  }
}
