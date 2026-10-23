import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: `https://vinildesign.az/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: {
        az: "https://vinildesign.az/az",
        ru: "https://vinildesign.az/ru",
        en: "https://vinildesign.az/en",
      },
    },
  }));
}
