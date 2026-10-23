import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { HomePage } from "@/components/home/home-page";
import type { HomeCopy } from "@/components/home/types";
import { routing, type Locale } from "@/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: { az: "/az", ru: "/ru", en: "/en" },
    },
    openGraph: {
      title: `VINIL DESIGN — ${t("title")}`,
      description: t("description"),
      locale,
      type: "website",
      images: ["/images/unsplash/studio.jpg"],
    },
  };
}

export default async function LocalizedHome({ params }: PageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const copy = messages.Home as unknown as HomeCopy;

  return <HomePage locale={locale as Locale} copy={copy} />;
}
