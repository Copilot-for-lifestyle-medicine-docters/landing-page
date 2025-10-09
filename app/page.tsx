import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Mail, Quote, Sparkles, Workflow } from "lucide-react";

import { AlgorithmSection } from "@/components/algorithm-section";
import { MotionFade } from "@/components/motion-fade";
import { Button } from "@/components/ui/button";
import { getLandingContent } from "@/lib/get-copy";

const navItems = [
  { label: "Algorithm", href: "#algorithm" },
  { label: "FAQ", href: "#faq" }
];

const founders = [
  {
    name: "Francisco de los Santos",
    role: "Co-founder",
    image: "/founders/francisco.png"
  },
  {
    name: "Maxim Laryn",
    role: "Co-founder",
    image: "/founders/maxim.png"
  },
  {
    name: "Yannick Lansink",
    role: "Co-founder",
    image: "/founders/yannick.jpeg"
  }
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingContent();
  const title = `${content.hero.title} | Eliksir`;
  return {
    title,
    description: content.hero.subline,
    openGraph: {
      title,
      description: content.hero.subline,
      url: "https://www.eliksir.health",
      type: "website",
      images: [
        {
          url: "/images/yanuzay_three_physicians_looking_at_a_shared_digital_medical__b68691ed-78bf-42e4-bf92-ca43904b9cc9_2.png",
          width: 1200,
          height: 630,
          alt: content.hero.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: content.hero.subline,
      images: ["/images/yanuzay_three_physicians_looking_at_a_shared_digital_medical__b68691ed-78bf-42e4-bf92-ca43904b9cc9_2.png"]
    }
  };
}

export default async function Home() {
  const content = await getLandingContent();
  const heroSubline = content.hero.subline.trim();
  const heroTransformation = content.hero.transformation.trim();
  const showHeroSubline = heroSubline.length > 0 && heroSubline !== heroTransformation;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.hero.title,
    url: "https://www.eliksir.health",
    potentialAction: {
      "@type": "ContactAction",
      target: content.hero.primaryCta.href,
      description: content.finalCta.banner
    },
    publisher: {
      "@type": "Organization",
      name: "Eliksir"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="relative flex-1">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="pointer-events-none absolute left-24 top-24 h-[520px] w-[520px] rounded-full bg-accent/20 blur-[240px]" />
          <div className="pointer-events-none absolute right-[-80px] top-[-160px] h-[620px] w-[620px] rounded-full bg-cyan-500/10 blur-[200px]" />
        </div>

        <header className="relative">
          <div className="container">
            <nav className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between md:gap-6 md:py-8">
              <Link href="/" className="flex items-center gap-4 text-lg font-semibold">
                <span className="relative inline-flex h-16 w-16 items-center justify-center">
                  <Image
                    src="/images/logo/Transparent Logo.png"
                    alt="Eliksir logo"
                    width={72}
                    height={72}
                    className="object-contain"
                  />
                </span>
              </Link>
              <div className="hidden flex-1 flex-wrap items-center justify-between gap-4 md:flex md:justify-end">
                <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="transition hover:text-foreground">
                      {item.label}
                    </Link>
                  ))}
                </div>
                <Button asChild size="sm">
                  <Link href={content.hero.primaryCta.href}>
                    {content.hero.primaryCta.label}
                  </Link>
                </Button>
              </div>
            </nav>
          </div>

          <div className="container flex flex-col items-center gap-10 pb-20 pt-8 text-center">
            <MotionFade className="flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-foreground/70 shadow-glass sm:text-sm">
                <Sparkles className="h-4 w-4 text-accent" aria-hidden />
                {content.hero.transformation}
              </div>
              <div className="space-y-4">
                <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
                  {content.hero.title}
                </h1>
                <p className="text-balance text-base text-foreground/80 sm:text-lg">
                  {content.hero.subtitle}
                </p>
                {showHeroSubline ? (
                  <p className="text-balance text-base text-foreground/70 sm:text-lg">
                    {content.hero.subline}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Button asChild size="sm" className="px-5">
                  <Link href={content.hero.primaryCta.href} className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" aria-hidden />
                    {content.hero.primaryCta.label}
                  </Link>
                </Button>
                {content.hero.secondaryCta ? (
                  <Button asChild variant="secondary" size="sm" className="px-5">
                    <Link href={content.hero.secondaryCta.href} className="inline-flex items-center gap-2">
                      {content.hero.secondaryCta.label}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </MotionFade>

            {/* Desktop/Tablet hero image */}
            <MotionFade delay={0.1} className="relative w-full max-w-5xl hidden md:block">
              <div className="glass relative overflow-hidden rounded-[3rem] border-white/10 bg-white/10 p-5 shadow-glass sm:p-6">
                <div className="relative overflow-hidden rounded-[2.5rem] bg-white">
                  <Image
                    src="/images/Ontwerp zonder titel.png"
                    alt="Eliksir transforming lab reports into preventive intelligence"
                    width={1781}
                    height={680}
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-12 -bottom-12 -z-10 h-24 rounded-full bg-black/40 blur-3xl" aria-hidden />
            </MotionFade>

            {/* Mobile-only hero image replacement */}
            <MotionFade delay={0.1} className="relative w-full max-w-5xl md:hidden">
              <div className="relative overflow-hidden rounded-[2rem]">
                <Image
                  src="/images/yanuzay_doctor_silhouette_with_calm_posture_reviewing_clear_d_6e2edb7d-abfa-426d-b81b-9bf17f43ca5c_0.png"
                  alt="Doctor silhouette reviewing clear digital chart"
                  width={1200}
                  height={800}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            </MotionFade>
          </div>
        </header>

        <section id="problem" className="container pb-24">
          <MotionFade className="glass overflow-hidden rounded-[2rem] border-white/10 p-10 shadow-glass">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-accent/90">
              <Workflow className="h-5 w-5" aria-hidden />
              {content.problem.label}
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
              {content.problem.headline}
            </h2>
            <ul className="mt-6 space-y-3 text-base text-foreground/75">
              {content.problem.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            {content.problem.visualNote ? (
              <p className="mt-8 text-sm italic text-foreground/60">
                {content.problem.visualNote}
              </p>
            ) : null}
          </MotionFade>
        </section>

        <section id="guide" className="container pb-24">
          <MotionFade className="max-w-4xl space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {content.guide.headline}
            </h2>
            {content.guide.body.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-foreground/75">
                {paragraph}
              </p>
            ))}
            {content.guide.visualNote ? (
              <p className="text-sm uppercase tracking-[0.3em] text-accent/80">
                {content.guide.visualNote}
              </p>
            ) : null}
          </MotionFade>

          <MotionFade delay={0.05} className="mt-12 space-y-8">
            <div className="glass rounded-[2rem] p-8">
              <h3 className="text-center text-sm font-semibold uppercase tracking-[0.4em] text-foreground/60">
                Meet the founders
              </h3>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {founders.map((founder, index) => (
                  <MotionFade
                    key={founder.name}
                    delay={index * 0.05}
                    className="glass flex flex-col items-center rounded-[2rem] p-8 text-center"
                  >
                    <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-full border border-white/10 bg-white">
                      <Image
                        src={founder.image}
                        alt={`${founder.name} headshot`}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-foreground/90">{founder.name}</h4>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-foreground/50">{founder.role}</p>
                  </MotionFade>
                ))}
              </div>
            </div>
          </MotionFade>
        </section>

        <section id="plan" className="container pb-24">
          <MotionFade className="max-w-3xl space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium uppercase tracking-wide text-foreground/70 shadow-glass">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden />
              Simple partnership plan
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {content.plan.headline}
            </h2>
            {content.plan.subline ? (
              <p className="text-lg text-foreground/75">{content.plan.subline}</p>
            ) : null}
          </MotionFade>
          <MotionFade delay={0.05} className="mt-12 grid gap-6 md:grid-cols-3">
            {content.plan.steps.map((step, index) => (
              <div key={step.title} className="glass flex h-full flex-col rounded-3xl p-6">
                <span className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/80">
                  Step 0{index + 1}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-foreground/90">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{step.description}</p>
              </div>
            ))}
          </MotionFade>
          <MotionFade delay={0.1} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href={content.plan.primaryCta.href} className="inline-flex items-center gap-2">
                {content.plan.primaryCta.label}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </Button>
            {content.plan.secondaryCta ? (
              <Button asChild variant="secondary" size="lg">
                <Link href={content.plan.secondaryCta.href} className="inline-flex items-center gap-2">
                  {content.plan.secondaryCta.label}
                </Link>
              </Button>
            ) : null}
          </MotionFade>
        </section>

        <AlgorithmSection content={content.algorithm} />

        <section id="product" className="container pb-24">
          <MotionFade className="space-y-6 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {content.productWalkthrough.headline}
            </h2>
            {content.productWalkthrough.description.map((paragraph) => (
              <p key={paragraph} className="mx-auto max-w-2xl text-lg leading-relaxed text-foreground/75">
                {paragraph}
              </p>
            ))}
          </MotionFade>
          <MotionFade delay={0.05} className="mt-10 glass mx-auto max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 shadow-glass">
            <div className="aspect-video w-full">
              <iframe
                title="Eliksir product walkthrough"
                src={content.productWalkthrough.videoUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </MotionFade>
        </section>

        <section id="stakes" className="container pb-24">
          <MotionFade className="glass rounded-[2rem] border-white/10 p-10 shadow-glass">
            <div className="flex items-center gap-3 text-sm font-semibold text-rose-400/80">
              <AlertTriangle className="h-5 w-5" aria-hidden />
              What’s at stake if nothing changes
            </div>
            <ul className="mt-6 space-y-4 text-base text-foreground/75">
              {content.stakes.bullets.map((item) => (
                <li key={item} className="rounded-2xl bg-white/5 p-5">
                  {item}
                </li>
              ))}
            </ul>
          </MotionFade>
        </section>

        <section id="success" className="container pb-24">
          <MotionFade className="mx-auto max-w-3xl space-y-5 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              {content.success.headline}
            </h2>
            {content.success.body.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-foreground/75">
                {paragraph}
              </p>
            ))}
            {content.success.visualNote ? (
              <p className="text-sm italic text-foreground/60">
                {content.success.visualNote}
              </p>
            ) : null}
          </MotionFade>
        </section>

        <section id="social-proof" className="container pb-24">
          <MotionFade className="space-y-8 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Joining forces with preventive pioneers
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {content.socialProof.logos.map((logo) => (
                <div key={logo} className="glass rounded-full px-5 py-2 text-sm font-semibold text-foreground/70">
                  {logo}
                </div>
              ))}
            </div>
          </MotionFade>
          <MotionFade delay={0.05} className="mt-10 mx-auto max-w-3xl">
            <div className="glass relative overflow-hidden rounded-[2rem] border border-white/10 p-8 text-left shadow-glass">
              <Quote className="h-10 w-10 text-accent/40" aria-hidden />
              <p className="mt-4 text-lg italic text-foreground/80">
                “{content.socialProof.testimonial.quote}”
              </p>
              {content.socialProof.testimonial.attribution ? (
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60">
                  {content.socialProof.testimonial.attribution}
                </p>
              ) : null}
            </div>
          </MotionFade>
        </section>

        <section id="faq" className="container pb-24">
          <MotionFade className="max-w-3xl space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">FAQ</h2>
            <p className="text-lg text-foreground/75">
              Answers to the most common questions from labs and clinicians.
            </p>
          </MotionFade>
          <div className="mt-10 space-y-4">
            {content.faq.map((item, index) => (
              <MotionFade
                key={item.question}
                delay={index * 0.04}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
              >
                <details className="group" open={index === 0}>
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-6 py-5 text-lg font-semibold text-foreground/85">
                    {item.question}
                    <span className="transition group-open:rotate-45">+</span>
                  </summary>
                  <div className="border-t border-white/10 bg-white/5 px-6 py-5 text-sm leading-relaxed text-foreground/70">
                    {item.answer}
                  </div>
                </details>
              </MotionFade>
            ))}
          </div>
        </section>

        <section id="final-cta" className="container pb-32">
          <MotionFade className="glass flex flex-col items-center gap-6 rounded-[2.5rem] px-10 py-14 text-center shadow-glass">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/90">
              {content.finalCta.transformation}
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
              {content.finalCta.banner}
            </h2>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
              <Button asChild size="lg">
                <Link href={content.finalCta.primaryCta.href} className="inline-flex items-center gap-2">
                  {content.finalCta.primaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              {content.finalCta.contactEmail ? (
                <div className="flex flex-col items-center text-sm text-foreground/70 sm:items-start">
                  <span>{content.finalCta.contactEmail}</span>
                </div>
              ) : null}
            </div>
          </MotionFade>
        </section>
      </main>
    </>
  );
}
