"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import type { NavCopy } from "@/components/home/types";

const locales: Locale[] = ["az", "ru", "en"];

export function SiteHeader({
  locale,
  copy,
  isVisible,
}: {
  locale: Locale;
  copy: NavCopy;
  isVisible: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const links = [
    [copy.projects, "#projects"],
    [copy.services, "#services"],
    [copy.about, "#about"],
    [copy.contact, "#contact"],
  ];

  return (
    <header
      className={`site-header ${isVisible ? "site-header--visible" : ""} ${isScrolled ? "site-header--scrolled" : ""}`}
    >
      <div className="site-header__inner page-shell">
        <a href={`/${locale}`} className="brand" aria-label="VINIL DESIGN home">
          <Image
            src="/branding/vinil-design-logo.svg"
            alt="VINIL DESIGN"
            width={1920}
            height={480}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => (
            <a href={href} key={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="locale-switch" aria-label="Language">
            {locales.map((item) => (
              <a
                href={`/${item}`}
                key={item}
                className={item === locale ? "is-active" : ""}
                aria-current={item === locale ? "page" : undefined}
              >
                {item}
              </a>
            ))}
          </div>
          <a className="header-cta" href="#contact">
            {copy.contact}
          </a>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setIsOpen(true)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            <span>{copy.menu}</span>
            <i aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="mobile-menu__top page-shell">
          <Image
            src="/branding/vinil-design-logo.svg"
            alt="VINIL DESIGN"
            width={1920}
            height={480}
          />
          <button type="button" onClick={() => setIsOpen(false)} aria-label={copy.close}>
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="mobile-menu__nav page-shell" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a href={href} key={href} onClick={() => setIsOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__footer page-shell">
          {locales.map((item) => (
            <a href={`/${item}`} key={item} className={item === locale ? "is-active" : ""}>
              {item.toUpperCase()}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
