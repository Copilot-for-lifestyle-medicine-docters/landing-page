import Link from "next/link";

import { MotionFade } from "@/components/motion-fade";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <main className="container flex flex-1 flex-col pb-24 pt-16">
      <MotionFade className="max-w-2xl space-y-4">
        <h1 className="text-4xl font-semibold tracking-tight">Let's build your pilot</h1>
        <p className="text-lg text-foreground/75">
          Share a few details about your lab or clinic and we'll schedule a walkthrough tailored to your test
          portfolio.
        </p>
      </MotionFade>
      <MotionFade delay={0.05} className="mt-10 max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass">
        <form action="/api/contact" method="post" className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Alex Carter" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" name="organization" placeholder="Genomic Insights Lab" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">What should we know?</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Share current workflows, volumes, and goals for interpretation support."
              required
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-foreground/60">
            <span>We respond within two business days.</span>
            <Button type="submit" className="min-w-[180px]">
              Request a pilot
            </Button>
          </div>
        </form>
      </MotionFade>
      <MotionFade delay={0.1} className="mt-8 text-sm text-foreground/60">
        Prefer email? <Link href="mailto:yannick.lansink@live.nl" className="text-accent">yannick.lansink@live.nl</Link>
      </MotionFade>
    </main>
  );
}
