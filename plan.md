Here’s a **copy-paste prompt** you can give to any LLM to generate the site.

---

# SYSTEM / ROLE

You are a senior Frontend Engineer and Product Designer. Build a production-ready **Next.js** landing page for **Eliksir** using **Apple-inspired “liquid glass” aesthetics** and our brand guide.

# INPUT FILES

* `landing-page-copy.md` → canonical copy to use verbatim (headings, sections, FAQs, CTA).

## Available Assets

**Logo:**
- [images/logo/Transparent Logo.png](images/logo/Transparent Logo.png)

**Other images:**
- images/
Make sure to use the images for the project. Check out the name of the image for what copy it is good to be placed with. 

# OUTPUT / DELIVERABLES

1. A runnable **Next.js (App Router) + TypeScript** project using:

   * **Next.js 14**, **App Router**, **Server Components**
   * **Tailwind CSS** (configured) + **Framer Motion** (subtle animations)
   * **shadcn/ui** for basic components
   * **ESLint + Prettier** configured
2. Pages/components wired to the provided copy + branding.
3. **README.md** with setup steps and where to edit copy/styles.
4. Lighthouse-friendly, accessible, responsive.

# DESIGN LANGUAGE (Apple “Liquid Glass”)

* Minimal, high-contrast, generous whitespace, smooth micro-interactions.
* **Liquid glass cards/nav/CTA**: translucent surfaces (`backdrop-blur`, subtle inner/outer shadows), thin 1px borders with low-alpha white, soft gradients on hover, light depth.
* Motion: 150–250ms ease-out; entrance fade+rise; hover lift (2–4px).
* Iconography: simple, thin-line vector.
* Avoid skeuomorphism; keep flat, crisp edges with 20–24px radii.

# BRANDING (from branding-guidelines.md)

* **Background:** `#05292D`
* **Text:** `#F5F5F5`
* **Subtle highlights / accents:** `#E5BD84`
* **Typography:** **Open Sans** (400/600/700). Base leading 1.5.
* Use accent sparingly for focus states, key metrics, and CTAs.

# INFORMATION ARCHITECTURE (map from landing-page-copy.md)

Create everything in this order, don't use multiple components.:

1. **Hero** (heading, subheading, primary CTA “Request a pilot”, secondary CTA “How it works”)
2. **Who it’s for**
3. **The problem today**
4. **Our solution**
5. **Why labs/clinics choose us**
6. **Why physicians rely on it**
7. **How it works** (4 steps)
8. **Compliance by design**
9. **Early access pilots** (What you’ll get / What we’ll measure)
10. **FAQ**
11. **Call to action** (final)


# PAGES / ROUTES

* `/` → assembled sections using content parsed from `landing-page-copy.md`.
* `/contact` → simple lead form (name, org, email, message). Client-only stub; POST to `/api/contact` placeholder.
* `/privacy` → stub.

# STYLES / THEME

* Tailwind config with CSS variables: `--bg:#05292D`, `--fg:#F5F5F5`, `--accent:#E5BD84`.
* Glass token utilities:

  * `.glass` → `backdrop-blur-md bg-white/6 border border-white/10 shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_10px_30px_-10px_rgba(0,0,0,0.4)]`
  * `.hairline` → `border border-white/10`
* Focus rings: `outline-2 outline-offset-2 outline-[#E5BD84]`.

# ACCESSIBILITY & PERFORMANCE

* Semantic HTML, landmark roles, keyboard nav, visible focus.
* Color contrast ≥ WCAG AA on the dark background.
* Lazy-load non-critical images, use Next/Image.
* Prefetch above-the-fold fonts; `font-display: swap`.

# DATA INGEST

* Parse `landing-page-copy.md` at build-time (MDX or gray-matter).
* Do **not** invent copy; use the file as source of truth. Small missing bits may be inferred minimally.

# ACCEPTANCE CRITERIA (must pass)

* Lighthouse (Desktop) ≥ 90 in Performance/Accessibility/Best Practices/SEO.
* All sections render and match the provided copy.
* Hero CTAs visible above the fold on 1440×900 and 390×844.
* No CLS on hero.


# IMPLEMENTATION NOTES

* Import **Open Sans** via `next/font/google`.
* Use `MotionFade` for section entrances; keep motion subtle.
* Buttons: primary (accent bg on dark), secondary (transparent glass outline).
* Illustrations: placeholders with glass frames; swap later.
* Keep bundle small; tree-shake shadcn components used.
* Place everything inside 1 component. Don't split components. 

