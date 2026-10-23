"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowDownRight, ArrowUpRight, Instagram } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SiteHeader } from "@/components/layout/site-header";
import type { Locale } from "@/i18n/routing";
import { siteLinks } from "@/lib/site-links";
import type { HomeCopy } from "./types";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HomePage({ locale, copy }: { locale: Locale; copy: HomeCopy }) {
  const root = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  const enterSite = useCallback(() => setHasEntered(true), []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const frame = window.requestAnimationFrame(() => {
      setCanPlayVideo(!reducedMotion && !connection?.saveData);
      if (reducedMotion) setHasEntered(true);
    });

    if (reducedMotion) {
      return () => window.cancelAnimationFrame(frame);
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "Enter"].includes(event.key)) enterSite();
    };
    const timer = window.setTimeout(enterSite, 5000);

    window.addEventListener("wheel", enterSite, { passive: true, once: true });
    window.addEventListener("touchmove", enterSite, { passive: true, once: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      window.removeEventListener("wheel", enterSite);
      window.removeEventListener("touchmove", enterSite);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enterSite]);

  useEffect(() => {
    document.body.classList.toggle("intro-active", !hasEntered);
    return () => document.body.classList.remove("intro-active");
  }, [hasEntered]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        gsap.set("[data-reveal], [data-hero], .site-header", { clearProps: "all" });
        setIntroComplete(true);
        return;
      }

      if (!hasEntered) {
        gsap.set(".site-header, [data-hero]", { autoAlpha: 0 });
        return;
      }

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero
        .to(".intro-logo", { scale: 0.72, autoAlpha: 0, duration: 0.65 })
        .to(
          ".intro-overlay",
          { autoAlpha: 0, duration: 0.5, onComplete: () => setIntroComplete(true) },
          "-=0.3",
        )
        .fromTo(".site-header", { y: -20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, "-=0.22")
        .fromTo("[data-hero='eyebrow']", { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.28")
        .fromTo("[data-hero='line']", { yPercent: 115 }, { yPercent: 0, duration: 0.85, stagger: 0.1 }, "-=0.18")
        .fromTo("[data-hero='detail']", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.07 }, "-=0.35");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 64,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: 7,
          ease: "none",
          scrollTrigger: { trigger: element.parentElement, scrub: 0.6 },
        });
      });
    },
    { scope: root, dependencies: [hasEntered], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={`site-root ${hasEntered ? "" : "site-root--intro"}`}>
      <SiteHeader locale={locale} copy={copy.nav} isVisible={hasEntered} />

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero__media" aria-hidden="true">
            <Image
              src="/images/demo/hero-poster.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="hero__image"
            />
            {canPlayVideo && (
              <video autoPlay muted loop playsInline preload="metadata" poster="/images/demo/hero-poster.png">
                <source media="(max-width: 767px)" src="/videos/vinil-hero-mobile.mp4" type="video/mp4" />
                <source src="/videos/vinil-hero.mp4" type="video/mp4" />
              </video>
            )}
          </div>
          <div className="hero__shade" aria-hidden="true" />
          <div className="hero__grid" aria-hidden="true" />

          <div className="hero__content page-shell">
            <div className="hero__copy">
              <p className="eyebrow" data-hero="eyebrow">
                <span /> {copy.hero.eyebrow}
              </p>
              <h1 id="hero-title">
                <span className="hero__title-mask"><span data-hero="line">{copy.hero.titleTop}</span></span>
                <span className="hero__title-mask"><span data-hero="line">{copy.hero.titleBottom}</span></span>
              </h1>
              <p className="hero__subtitle" data-hero="detail">{copy.hero.subtitle}</p>
              <div className="hero__buttons" data-hero="detail">
                <a className="button button--light" href="#projects">
                  {copy.hero.primary}<ArrowDownRight size={17} />
                </a>
                <a className="button button--ghost" href="#contact">{copy.hero.secondary}</a>
              </div>
            </div>

            <div className="hero__bottom" data-hero="detail">
              <p>{copy.hero.location}</p>
              <a href="#philosophy" className="scroll-cue">
                {copy.hero.scroll}<ArrowDown size={16} />
              </a>
            </div>
          </div>

          {!introComplete && (
            <button className="intro-overlay" type="button" onClick={enterSite} aria-label={copy.hero.primary}>
              <Image
                className="intro-logo"
                src="/branding/vinil-design-logo.svg"
                alt="VINIL DESIGN"
                width={1920}
                height={480}
                priority
              />
            </button>
          )}
        </section>

        <section className="statement section-pad" id="philosophy">
          <div className="page-shell">
            <p className="section-index" data-reveal>{copy.statement.index}</p>
            <div className="statement__layout">
              <h2 data-reveal>
                <span>{copy.statement.lineOne}</span>
                <span className="muted-line">{copy.statement.lineTwo}</span>
              </h2>
              <p className="section-copy" data-reveal>{copy.statement.body}</p>
            </div>
          </div>
        </section>

        <section className="projects section-pad" id="projects">
          <div className="page-shell">
            <div className="section-heading" data-reveal>
              <div>
                <p className="section-index">{copy.projects.index}</p>
                <h2>{copy.projects.heading}</h2>
              </div>
              <p>{copy.projects.intro}</p>
            </div>

            <div className="project-grid">
              {copy.projects.items.map((project, index) => (
                <article className={`project-card project-card--${index + 1}`} key={project.number} data-reveal>
                  <a
                    href={siteLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${copy.projects.view}: ${project.title}`}
                  >
                    <div className="project-card__media">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${copy.projects.demo}`}
                        fill
                        sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 45vw"}
                        className="project-card__image"
                      />
                    </div>
                    <div className="project-card__meta">
                      <span>{project.number}</span>
                      <div><p>{project.make} / {project.model}</p><h3>{project.title}</h3></div>
                      <p>{project.category}</p>
                      <ArrowUpRight size={22} strokeWidth={1.4} />
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="instagram-section section-pad" aria-labelledby="instagram-title">
          <div className="page-shell">
            <div className="instagram-section__intro" data-reveal>
              <p className="section-index">{copy.instagram.index}</p>
              <h2 id="instagram-title">{copy.instagram.heading}</h2>
              <div>
                <p>{copy.instagram.body}</p>
                <a href={siteLinks.instagram} target="_blank" rel="noreferrer">
                  <Instagram size={17} strokeWidth={1.5} />
                  {copy.instagram.button}
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </div>
            </div>
            <div className="instagram-grid" data-reveal>
              {copy.projects.items.map((project) => (
                <a
                  href={siteLinks.instagram}
                  target="_blank"
                  rel="noreferrer"
                  key={`instagram-${project.number}`}
                  aria-label={`${copy.instagram.itemLabel}: ${project.title}`}
                >
                  <Image src={project.image} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
                  <span><Instagram size={18} strokeWidth={1.5} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="services section-pad" id="services">
          <div className="page-shell">
            <div className="section-heading services__heading" data-reveal>
              <div><p className="section-index">{copy.services.index}</p><h2>{copy.services.heading}</h2></div>
              <p>{copy.services.note}</p>
            </div>
            {copy.services.items.map((service) => (
              <article className="service-row" key={service.number} data-reveal>
                <span>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ArrowDownRight size={26} strokeWidth={1.2} />
              </article>
            ))}
          </div>
        </section>

        <section className="about section-pad" id="about">
          <div className="page-shell about__grid">
            <div className="about__media" data-reveal>
              <Image
                src="/images/demo/project-satin-black.png"
                alt="VINIL DESIGN studio development visual"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                data-parallax
              />
              <span>{copy.about.note}</span>
            </div>
            <div className="about__content" data-reveal>
              <p className="section-index">{copy.about.index}</p>
              <h2>{copy.about.heading}</h2>
              <p className="section-copy">{copy.about.body}</p>
              <div className="material-swatch" aria-hidden="true"><i /><i /><i /></div>
            </div>
          </div>
        </section>

        <section className="process section-pad">
          <div className="page-shell">
            <div className="section-heading process__heading" data-reveal>
              <div><p className="section-index">{copy.process.index}</p><h2>{copy.process.heading}</h2></div>
              <p>{copy.process.note}</p>
            </div>
            <div className="process-grid">
              {copy.process.items.map((item) => (
                <article key={item.number} data-reveal>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="closing" id="contact">
          <Image src="/images/demo/hero-poster.png" alt="" fill sizes="100vw" data-parallax />
          <div className="closing__shade" aria-hidden="true" />
          <div className="page-shell closing__content" data-reveal>
            <p className="eyebrow"><span /> {copy.cta.eyebrow}</p>
            <h2><span>{copy.cta.lineOne}</span><span>{copy.cta.lineTwo}</span></h2>
            <div className="closing__actions">
              <a className="button button--light" href="#contact-details">{copy.cta.button}<ArrowUpRight size={17} /></a>
              <div className="pending-socials" aria-label={copy.footer.contactPending}>
                <span>{copy.cta.whatsapp}</span>
                <a href={siteLinks.instagram} target="_blank" rel="noreferrer">{copy.cta.instagram}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact-details">
        <div className="page-shell footer__top">
          <Image src="/branding/vinil-design-logo.svg" alt="VINIL DESIGN" width={1920} height={480} />
          <p>{copy.footer.tagline}<br />{copy.footer.location}</p>
          <p className="footer__pending">{copy.footer.contactPending}</p>
        </div>
        <div className="page-shell footer__bottom">
          <p>© {new Date().getFullYear()} {copy.footer.rights}</p>
          <span>{copy.footer.privacy}</span>
          <div className="footer__locales">
            {(["az", "ru", "en"] as Locale[]).map((item) => <a href={`/${item}`} key={item}>{item.toUpperCase()}</a>)}
          </div>
        </div>
      </footer>
    </div>
  );
}
