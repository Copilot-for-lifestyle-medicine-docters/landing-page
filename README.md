# Eliksir Landing Page

Production-ready marketing site for Eliksir built with Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the local dev server:
   ```bash
   npm run dev
   ```
3. Visit `http://localhost:3000`.

### Available commands

- `npm run dev` – start the development server.
- `npm run build` – create an optimized production build.
- `npm run start` – run the production server.
- `npm run lint` – run ESLint using Next.js defaults.
- `npm run format` – check formatting with Prettier + Tailwind plugin.
- `npm run format:write` – auto-format the project.

## Project structure

- `app/` – App Router routes (`/`, `/contact`, `/privacy`) and API stub (`/api/contact`).
- `components/` – UI primitives (shadcn-style button/input components), motion helpers, analytics stub.
- `lib/` – `get-copy.ts` parses `landing-page-copy.md` into structured data used across sections.
- `public/images/` – brand assets and illustrations referenced throughout the page.
- `landing-page-copy.md` – single source of truth for all marketing copy.

## Editing copy & branding

- Update existing copy directly in `landing-page-copy.md`; the page ingests and re-renders it automatically on rebuild.
- Adjust brand colors or typography in `tailwind.config.ts` and `app/globals.css` (CSS variables `--bg`, `--fg`, `--accent`).
- Components rely on the `glass` and `hairline` utilities defined in the Tailwind config for the liquid-glass aesthetic.

## Animations & interactions

- Section entrances use the `MotionFade` component (Framer Motion) with subtle 200–250ms fade/translate.
- Buttons derive from shadcn/ui patterns and include hover lift + focus outline using the accent color.

## Next steps

- Wire `/api/contact` to your CRM or email service.
- Swap in production-ready imagery or WebP assets for improved Lighthouse scores.
- Run `npm run build` + Lighthouse audits before launch (target ≥ 90 across categories).
