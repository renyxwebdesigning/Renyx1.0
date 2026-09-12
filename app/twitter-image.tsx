import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, OgContent } from "./og-content";

export const size = OG_IMAGE_SIZE;
export const contentType = "image/png";
export const alt = "Renyx — Webdesign Zürich für Kleinunternehmen";

export default function TwitterImage() {
  return new ImageResponse(<OgContent />, size);
}
