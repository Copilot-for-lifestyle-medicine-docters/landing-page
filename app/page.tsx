import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck, Sparkles, Workflow } from "lucide-react";

import { MotionFade } from "@/components/motion-fade";
import { Button } from "@/components/ui/button";
import { getLandingContent } from "@/lib/get-copy";

const navItems = [
  { label: "Who it's for", href: "#who-its-for" },
  { label: "Solution", href: "#our-solution" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" }
];

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingContent();
  const title = `${content.hero.title} | Eliksir`;
  return {
    title,
    description: content.hero.tagline,
    openGraph: {
      title,
      description: content.hero.tagline,
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
      description: content.hero.tagline,
      images: ["/images/yanuzay_three_physicians_looking_at_a_shared_digital_medical__b68691ed-78bf-42e4-bf92-ca43904b9cc9_2.png"]
    }
  };
}

export default async function Home() {
  const content = await getLandingContent();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: content.hero.title,
    url: "https://www.eliksir.health",
    potentialAction: {
      "@type": "ContactAction",
      target: content.hero.primaryCta.href,
      description: content.finalCta.text
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
          <nav className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between">
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
            <div className="flex flex-1 flex-wrap items-center justify-between gap-4 md:justify-end">
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

        <div className="container grid gap-16 pb-24 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <MotionFade className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-foreground/70 shadow-glass">
              <Sparkles className="h-4 w-4 text-accent" aria-hidden />
              Pattern-level lab insights in minutes
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                {content.hero.title}
              </h1>
              <p className="max-w-2xl text-lg text-foreground/75 sm:text-xl">
                {content.hero.tagline}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg">
                <Link href={content.hero.primaryCta.href} className="inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" aria-hidden />
                  {content.hero.primaryCta.label}
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href={content.hero.secondaryCta.href} className="inline-flex items-center gap-2">
                  Learn how it works
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
            </div>
            <dl className="grid gap-4 sm:grid-cols-3">
              {content.who.map((item) => (
                <div key={item.title} className="glass rounded-2xl px-4 py-3">
                  <dt className="text-sm font-semibold text-foreground/80">{item.title}</dt>
                  <dd className="mt-1 text-sm text-foreground/65">{item.description}</dd>
                </div>
              ))}
            </dl>
          </MotionFade>

          <MotionFade delay={0.1} className="relative h-full min-h-[420px]">
            <div className="glass absolute inset-0 rounded-3xl border-white/5" />
            <Image
              src="/images/yanuzay_three_physicians_looking_at_a_shared_digital_medical__b68691ed-78bf-42e4-bf92-ca43904b9cc9_2.png"
              alt="Clinicians collaborating around a modern lab report"
              fill
              className="rounded-3xl object-cover"
              priority
            />
          </MotionFade>
        </div>
      </header>

      <section id="who-its-for" className="container pb-24">
        <MotionFade className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">Who it's for</h2>
          <p className="text-lg text-foreground/75">
            We partner with innovative labs, clinics, and physicians ready to uplevel interpretation without changing their LIS.
          </p>
        </MotionFade>
        <MotionFade delay={0.05} className="mt-12 grid gap-6 md:grid-cols-3">
          {content.who.map((item) => (
            <div key={item.title} className="group glass flex h-full flex-col justify-between rounded-3xl p-6 transition-transform hover:-translate-y-1">
              <div>
                <h3 className="text-lg font-semibold text-foreground/90">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.description}</p>
              </div>
              <div className="mt-6 flex items-center text-sm font-semibold text-accent/90 opacity-0 transition group-hover:opacity-100">
                Tailored flows
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </div>
            </div>
          ))}
        </MotionFade>
      </section>

      <section id="problem" className="container pb-24">
        <div className="glass overflow-hidden rounded-[2rem] border-white/10 p-10 shadow-glass">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <MotionFade className="space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70">
                <Workflow className="h-5 w-5 text-accent" aria-hidden />
                The problem today
              </div>
              <p className="text-xl leading-8 text-foreground/80">
                {content.problem}
              </p>
            </MotionFade>
            <MotionFade delay={0.05} className="relative">
              <Image
                src="/images/yanuzay_cluttered_paper_dissolving_into_a_clean_organized_cha_c4145c22-5244-4263-9772-3ab05e6e07f9_2.png"
                alt="Before and after comparison of lab reports"
                width={560}
                height={420}
                className="h-full w-full rounded-3xl border border-white/10 object-cover"
              />
            </MotionFade>
          </div>
        </div>
      </section>

      <section id="our-solution" className="container pb-24">
        <MotionFade className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">Our solution</h2>
          <p className="text-lg text-foreground/75">{content.solution.intro}</p>
        </MotionFade>
        <MotionFade delay={0.05} className="mt-12 grid gap-6 lg:grid-cols-2">
          {content.solution.bullets.map((item) => (
            <article key={item.title} className="glass rounded-3xl p-8">
              <h3 className="text-xl font-semibold text-foreground/90">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/70">{item.description}</p>
            </article>
          ))}
        </MotionFade>
      </section>

      <section className="container pb-24">
        <div className="grid gap-8 lg:grid-cols-2">
          <MotionFade className="glass rounded-[2rem] p-10">
            <div className="flex items-center gap-3 text-sm font-semibold text-accent/90">
              <ShieldCheck className="h-5 w-5" aria-hidden />
              Why labs & clinics choose us
            </div>
            <ul className="mt-6 space-y-5 text-sm text-foreground/75">
              {content.labsChooseUs.map((item) => (
                <li key={item.title} className="rounded-2xl bg-white/5 p-4">
                  <p className="font-semibold text-foreground/85">{item.title}</p>
                  <p className="mt-2 text-foreground/65">{item.description}</p>
                </li>
              ))}
            </ul>
          </MotionFade>
          <MotionFade delay={0.05} className="glass rounded-[2rem] p-10">
            <div className="flex items-center gap-3 text-sm font-semibold text-accent/90">
              <ShieldCheck className="h-5 w-5" aria-hidden />
              Why physicians rely on it
            </div>
            <ul className="mt-6 space-y-5 text-sm text-foreground/75">
              {content.physiciansRely.map((item) => (
                <li key={item.title} className="rounded-2xl bg-white/5 p-4">
                  <p className="font-semibold text-foreground/85">{item.title}</p>
                  <p className="mt-2 text-foreground/65">{item.description}</p>
                </li>
              ))}
            </ul>
          </MotionFade>
        </div>
      </section>

      <section id="how-it-works" className="container pb-24">
        <MotionFade className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <p className="text-lg text-foreground/75">
            Four steps to illuminate every report without changing your existing systems.
          </p>
        </MotionFade>
        <MotionFade delay={0.05} className="mt-12 grid gap-6 lg:grid-cols-4">
          {content.howItWorks.map((step, index) => (
            <div key={step} className="glass flex h-full flex-col justify-between rounded-3xl p-6">
              <span className="text-5xl font-semibold text-accent/90">0{index + 1}</span>
              <p className="mt-6 text-sm leading-relaxed text-foreground/70">{step}</p>
            </div>
          ))}
        </MotionFade>
      </section>

      <section className="container pb-24">
        <MotionFade className="glass rounded-[2rem] p-10">
          <div className="flex items-center gap-3 text-sm font-semibold text-accent/90">
            Compliance by design
          </div>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {content.compliance.map((item) => (
              <li key={item} className="rounded-2xl bg-white/5 p-5 text-sm text-foreground/70">
                {item}
              </li>
            ))}
          </ul>
        </MotionFade>
      </section>

      <section className="container pb-24">
        <MotionFade className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight">Early access pilots</h2>
            <p className="text-lg text-foreground/75">{content.earlyAccess.intro}</p>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-foreground/85">What you'll get</h3>
                <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                  {content.earlyAccess.whatYouGet.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-semibold text-foreground/85">What we'll measure</h3>
                <ul className="mt-4 space-y-3 text-sm text-foreground/70">
                  {content.earlyAccess.whatWeMeasure.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="relative hidden h-[420px] rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent p-4 shadow-glass lg:block">
            <div className="glass absolute inset-0 rounded-[2.5rem]" />
            <Image
              src="/images/yanuzay_branching_path_of_test_tubes_one_highlighted_green_as_0d2e7512-45fd-44ab-9128-06b443b7e3c3_1.png"
              alt="Modern lab equipment"
              fill
              className="rounded-[2.5rem] object-cover"
            />
          </div>
        </MotionFade>
      </section>

      <section id="faq" className="container pb-24">
        <MotionFade className="max-w-3xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
          <p className="text-lg text-foreground/75">Answers to the most common questions from labs and clinicians.</p>
        </MotionFade>
        <div className="mt-10 space-y-4">
          {content.faq.map((item, index) => (
            <MotionFade key={item.question} delay={index * 0.04} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
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

      <section className="container pb-32">
        <MotionFade className="glass flex flex-col items-center gap-6 rounded-[2.5rem] px-10 py-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent/90">Come in contact</p>
          <h2 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {content.finalCta.text}
          </h2>
          <Button asChild size="lg">
            <Link href={content.finalCta.linkHref} className="inline-flex items-center gap-2">
              {content.finalCta.linkLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </MotionFade>
      </section>
      </main>
    </>
  );
}
