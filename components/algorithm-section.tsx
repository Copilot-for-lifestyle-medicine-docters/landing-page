'use client';

import type { LandingContent } from "@/lib/get-copy";

import { MotionFade } from "@/components/motion-fade";

type AlgorithmContent = LandingContent["algorithm"];

interface AlgorithmSectionProps {
  content: AlgorithmContent;
}

export function AlgorithmSection({ content }: AlgorithmSectionProps) {
  const kineticNodes: ReadonlyArray<{
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    delay: string;
  }> = [
    { top: "8%", left: "16%", delay: "0s" },
    { top: "18%", right: "12%", delay: "1.2s" },
    { bottom: "18%", left: "10%", delay: "2.4s" },
    { bottom: "10%", right: "18%", delay: "3.6s" }
  ];

  return (
    <section id="algorithm" className="container pb-24">
      <MotionFade className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-10 shadow-glass">
        <div
          className="pointer-events-none absolute -top-32 right-20 h-72 w-72 rounded-full bg-accent/25 blur-[160px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 left-14 h-64 w-64 rounded-full bg-cyan-500/20 blur-[140px]"
          aria-hidden
        />

        <div className="relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-10 text-left">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-foreground/70">
                Hybrid algorithm
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {content.headline}
              </h2>
              {content.subline ? (
                <p className="text-lg text-foreground/80">
                  {content.subline}
                </p>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {content.highlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-5 transition-transform duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground/90">{highlight.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/70">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative h-[320px] w-[320px] sm:h-[360px] sm:w-[360px]">
              <div
                className="absolute inset-0 rounded-[2.6rem] border border-white/15 bg-gradient-to-br from-cyan-500/20 via-transparent to-accent/20 backdrop-blur-xl"
                aria-hidden
              />
              <div
                className="absolute inset-6 rounded-[2.2rem] border border-white/10"
                aria-hidden
              />
              <div
                className="absolute inset-10 rounded-full border border-white/20"
                aria-hidden
              />
              <div
                className="absolute inset-14 rounded-full border border-white/20"
                style={{ animation: "spin 18s linear infinite" }}
                aria-hidden
              />
              <div
                className="absolute inset-20 rounded-full border-dashed border-white/30"
                style={{ animation: "spin 26s linear infinite reverse" }}
                aria-hidden
              />
              <div
                className="absolute inset-24 rounded-full bg-gradient-to-br from-accent/30 via-white/10 to-cyan-500/20 blur-3xl"
                aria-hidden
              />
              <div
                className="absolute inset-[104px] rounded-full border border-white/40"
                style={{ animation: "pulseGlow 6s ease-in-out infinite" }}
                aria-hidden
              />

              {kineticNodes.map((node) => (
                <div
                  key={`${node.top ?? node.bottom}-${node.left ?? node.right}`}
                  className="absolute flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent/90 to-cyan-500/80 text-xs font-semibold text-white shadow-lg shadow-accent/40"
                  style={{
                    top: node.top,
                    bottom: node.bottom,
                    left: node.left,
                    right: node.right,
                    animation: `float 12s ease-in-out infinite`,
                    animationDelay: node.delay
                  }}
                  aria-hidden
                >
                  <span className="opacity-90">●</span>
                </div>
              ))}

              <div
                className="absolute inset-[140px] flex items-center justify-center rounded-full border border-white/40 bg-white/10 shadow-[0_20px_60px_-20px_rgba(16,185,129,0.45)]"
                aria-hidden
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <span className="text-xs font-semibold uppercase tracking-[0.4em] text-accent/80">
                    Pattern engine
                  </span>
                  <span className="text-sm font-medium text-foreground/90">
                    Risk states evolving in real time
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translate3d(0, 0, 0);
            }
            25% {
              transform: translate3d(6px, -12px, 0);
            }
            50% {
              transform: translate3d(-4px, -18px, 0);
            }
            75% {
              transform: translate3d(-8px, 6px, 0);
            }
          }

          @keyframes pulseGlow {
            0%,
            100% {
              box-shadow: 0 0 0 rgba(20, 184, 166, 0.4);
            }
            50% {
              box-shadow: 0 0 32px rgba(20, 184, 166, 0.6);
            }
          }
        `}</style>
      </MotionFade>
    </section>
  );
}
