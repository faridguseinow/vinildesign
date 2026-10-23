# VINIL DESIGN

Premium multilingual automotive website for VINIL DESIGN, built with Next.js App Router.

## Current scope

Implemented Phase 1 (foundation) and Phase 2 (cinematic homepage):

- Azerbaijani, Russian and English routes
- responsive header and mobile navigation
- cinematic responsive hero video with a static reduced-motion/data-saving fallback
- intro scene that reveals navigation and content on first interaction or after five seconds
- Instagram portfolio handoff to `@vinildesign`
- editorial homepage sections
- GSAP entrance, reveal and parallax animation
- reduced-motion support
- localized metadata and language alternates

The public project pages, contact form, Supabase integration and admin dashboard belong to later phases.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000/az`. Production validation:

```bash
npm run lint
npm run build
```

## Required production assets

The following approved business assets are connected:

- `public/branding/vinil-design-logo.svg`
- `public/videos/vinil-hero.mp4`
- `public/videos/vinil-hero-mobile.mp4`

Still required for production:

- `public/images/hero-poster.webp`
- real project and studio photography
- verified phone, WhatsApp and address

The current automotive photography remains development material. Replace it with approved project photography before production.

## Generated demo imagery

Temporary automotive visuals in `public/images/demo/` were generated specifically for this prototype. They do not represent completed VINIL DESIGN projects.
