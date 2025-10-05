import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="container flex flex-1 flex-col gap-6 pb-24 pt-16">
      <h1 className="text-4xl font-semibold tracking-tight">Privacy policy</h1>
      <p className="max-w-3xl text-lg text-foreground/75">
        We are building our detailed privacy policy as part of the early access program. Until then, reach out at
        <Link href="mailto:yannick.lansink@live.nl" className="ml-1 text-accent">
          yannick.lansink@live.nl
        </Link>{" "}
        for a copy of our current data processing standards.
      </p>
      <section className="max-w-3xl space-y-4 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-sm text-foreground/70">
        <p>Key commitments:</p>
        <ul className="space-y-3">
          <li>- HIPAA-aligned safeguards across storage, transfer, and access.</li>
          <li>- Data encrypted in transit and at rest using industry-standard protocols.</li>
          <li>- Access restricted to authorized personnel supporting your deployment.</li>
        </ul>
      </section>
    </main>
  );
}
