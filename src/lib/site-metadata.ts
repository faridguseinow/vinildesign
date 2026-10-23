import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://vinildesign.az"),
  title: {
    default: "VINIL DESIGN — Automotive Styling Studio",
    template: "%s — VINIL DESIGN",
  },
  description:
    "Automotive vinyl wrapping and styling studio in Baku, Azerbaijan.",
};
