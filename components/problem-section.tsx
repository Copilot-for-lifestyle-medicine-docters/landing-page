'use client';

import type { LandingContent } from "@/lib/get-copy";

import { AlertTriangle, Workflow } from "lucide-react";

import { MotionFade } from "@/components/motion-fade";

type ProblemContent = LandingContent["problem"];

interface ProblemSectionProps {
  content: ProblemContent;
}

const orbitingParticles = [
  { top: "-10%", left: "14%", size: 24, delay: "0s" },
  { top: "12%", right: "4%", size: 18, delay: "0.8s" },
  { bottom: "-12%", left: "22%", size: 20, delay: "1.6s" },
  { bottom: "10%", right: "-6%", size: 26, delay: "2.4s" }
] as const;

export function ProblemSection({ content }: ProblemSectionProps) {
  const problemStats = content.bullets.slice(0, 3);

  return (
    <section id="problem" className="container pb-24">
      <MotionFade className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-foreground/10 via-black/40 to-transparent p-10 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)]">
        <div
          className="pointer-events-none absolute -top-44 left-16 h-64 w-64 rounded-full bg-rose-500/30 blur-[160px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-40 right-16 h-72 w-72 rounded-full bg-amber-400/20 blur-[180px]"
          aria-hidden
        />

        <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8 text-left">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-foreground/70">
              <Workflow className="h-4 w-4 text-rose-400" aria-hidden />
              {content.label}
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {content.headline}
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {problemStats.map((stat) => (
                <div
                  key={stat}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-rose-400/40"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 via-transparent to-transparent" />
                  </div>
                  <p className="text-sm leading-relaxed text-white/80">{stat}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute inset-0 blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(244, 63, 94, 0.12), transparent 55%), radial-gradient(circle at 70% 70%, rgba(250, 204, 21, 0.1), transparent 60%)"
              }}
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-black/55 via-black/35 to-transparent p-6 backdrop-blur-sm">
              <div className="relative flex flex-col gap-8 rounded-[2rem] bg-black/70 p-8">
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
                  style={{ animation: "flicker 14s ease-in-out infinite" }}
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400/10 via-transparent to-amber-300/10" />
                </div>
                <div className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-white/10 p-3 text-rose-300 shadow-[0_0_40px_-10px_rgba(248,113,113,0.6)]">
                    <AlertTriangle className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.4em] text-rose-200/80">
                      The gap
                    </p>
                    <p className="text-sm text-white/80">
                      Static lab PDFs miss compounding risk patterns.
                    </p>
                  </div>
                </div>

                <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
                    What labs experience today
                  </p>
                  <ul className="space-y-3 text-sm text-white/70">
                    {content.bullets.slice(3).map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-300" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {content.visualNote ? (
                  <p className="text-xs italic text-white/60">{content.visualNote}</p>
                ) : null}
              </div>
            </div>
            {orbitingParticles.map((particle) => (
              <span
                key={`${particle.top ?? particle.bottom}-${particle.left ?? particle.right}`}
                className="pointer-events-none absolute rounded-full bg-gradient-to-br from-rose-400 to-amber-200 opacity-70 blur-[1px]"
                style={{
                  top: particle.top,
                  bottom: particle.bottom,
                  left: particle.left,
                  right: particle.right,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  animation: `float ${12 + particle.size / 2}s ease-in-out infinite`,
                  animationDelay: particle.delay
                }}
                aria-hidden
              />
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes problemPulse {
            0%,
            100% {
              opacity: 0.35;
              transform: scale(0.98);
            }
            50% {
              opacity: 0.8;
              transform: scale(1);
            }
          }
        `}</style>
        <style jsx global>{`
          @keyframes flicker {
            0%,
            100% {
              opacity: 0;
            }
            40%,
            60% {
              opacity: 0.45;
            }
            50% {
              opacity: 0.7;
            }
          }
        `}</style>
      </MotionFade>
    </section>
  );
}
