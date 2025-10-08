import { readFile } from "node:fs/promises";
import path from "node:path";

interface CtaLink {
  label: string;
  href: string;
}

export interface LandingContent {
  hero: {
    title: string;
    subtitle: string;
    subline: string;
    transformation: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink | null;
  };
  problem: {
    label: string;
    headline: string;
    bullets: string[];
    visualNote: string;
  };
  guide: {
    headline: string;
    body: string[];
    visualNote: string;
  };
  plan: {
    headline: string;
    steps: Array<{ title: string; description: string }>;
    subline: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink | null;
  };
  stakes: {
    bullets: string[];
  };
  success: {
    headline: string;
    body: string[];
    visualNote: string;
  };
  socialProof: {
    logos: string[];
    testimonial: {
      quote: string;
      attribution: string;
    };
  };
  productWalkthrough: {
    headline: string;
    description: string[];
    videoUrl: string;
  };
  finalCta: {
    banner: string;
    primaryCta: CtaLink;
    transformation: string;
    contactEmail: string | null;
    secondaryCta: CtaLink | null;
  };
  faq: Array<{ question: string; answer: string }>;
}

const COPY_PATH = path.join(process.cwd(), "landing-page-copy.md");

export async function getLandingContent(): Promise<LandingContent> {
  const raw = await readFile(COPY_PATH, "utf8");
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  const [heroRaw, ...sectionsRaw] = normalized.split("\n## ");

  const sections = new Map<string, string>();
  for (const chunk of sectionsRaw) {
    const newlineIndex = chunk.indexOf("\n");
    if (newlineIndex === -1) {
      continue;
    }
    const heading = chunk.slice(0, newlineIndex).trim();
    const body = chunk.slice(newlineIndex + 1).trim();
    sections.set(normalizeHeading(heading), body);
  }

  const hero = parseHero(heroRaw);
  const problem = parseProblem(sections.get("Problem") ?? "");
  const guide = parseGuide(sections.get("Guide") ?? "");
  const plan = parsePlan(sections.get("Plan") ?? "");
  const stakes = parseStakes(sections.get("Stakes") ?? "");
  const success = parseSuccess(sections.get("Success") ?? "");
  const socialProof = parseSocialProof(sections.get("Social proof") ?? "");
  const productWalkthrough = parseProductWalkthrough(sections.get("Product walkthrough") ?? "");
  const faq = parseFaq(sections.get("FAQ") ?? "");
  const finalCta = parseFinalCta(sections.get("Call to action") ?? "", hero.transformation);

  return {
    hero,
    problem,
    guide,
    plan,
    stakes,
    success,
    socialProof,
    productWalkthrough,
    finalCta,
    faq
  };
}

function parseHero(raw: string): LandingContent["hero"] {
  const lines = raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const headingLine = lines.find((line) => line.startsWith("# "));
  const nonHeadingLines = lines.filter((line) => !line.startsWith("#"));
  const contentLines = nonHeadingLines.filter((line) => !line.includes("]("));
  const ctaLines = nonHeadingLines.filter((line) => line.includes("]("));
  const parsedCtas = parseLinks(ctaLines.join(" "));

  const subtitle = contentLines[0] ?? "";
  const subline = contentLines[1] ?? subtitle;
  const transformation = contentLines[2] ?? "From reactive care → to preventive health.";

  return {
    title: headingLine ? headingLine.replace(/^#\s+/, "").trim() : "Eliksir",
    subtitle,
    subline,
    transformation,
    primaryCta: parsedCtas[0] ?? { label: "Book a Demo", href: "#contact" },
    secondaryCta: parsedCtas[1] ?? null
  };
}

function parseProblem(section: string): LandingContent["problem"] {
  const { subsections } = parseSubsections(section);
  return {
    label: collapseParagraphs(subsections.get("Label") ?? "The Cost of Waiting"),
    headline: collapseParagraphs(subsections.get("Headline") ?? ""),
    bullets: parseBullets(subsections.get("Bullets") ?? ""),
    visualNote: collapseParagraphs(subsections.get("Visual Note") ?? "")
  };
}

function parseGuide(section: string): LandingContent["guide"] {
  const { subsections } = parseSubsections(section);
  return {
    headline: collapseParagraphs(subsections.get("Headline") ?? ""),
    body: parseParagraphs(subsections.get("Body") ?? ""),
    visualNote: collapseParagraphs(subsections.get("Visual Note") ?? "")
  };
}

function parsePlan(section: string): LandingContent["plan"] {
  const { subsections } = parseSubsections(section);
  const ctas = parseLinks(subsections.get("CTA") ?? "");
  const primaryCta = ctas[0] ?? { label: "Start a Pilot", href: "#final-cta" };
  const secondaryCta = ctas[1] ?? null;

  return {
    headline: collapseParagraphs(subsections.get("Headline") ?? "How it works"),
    steps: parsePlanSteps(subsections.get("Steps") ?? ""),
    subline: collapseParagraphs(subsections.get("Subline") ?? ""),
    primaryCta,
    secondaryCta
  };
}

function parseStakes(section: string): LandingContent["stakes"] {
  return {
    bullets: parseBullets(section)
  };
}

function parseSuccess(section: string): LandingContent["success"] {
  const { subsections } = parseSubsections(section);
  return {
    headline: collapseParagraphs(subsections.get("Headline") ?? ""),
    body: parseParagraphs(subsections.get("Body") ?? ""),
    visualNote: collapseParagraphs(subsections.get("Visual Note") ?? "")
  };
}

function parseSocialProof(section: string): LandingContent["socialProof"] {
  const { subsections } = parseSubsections(section);
  const testimonialRaw = collapseParagraphs(subsections.get("Testimonial") ?? "");
  const testimonial = extractQuote(testimonialRaw);

  return {
    logos: parseBullets(subsections.get("Logos") ?? ""),
    testimonial
  };
}

function parseProductWalkthrough(section: string): LandingContent["productWalkthrough"] {
  const { subsections } = parseSubsections(section);
  const headline = collapseParagraphs(subsections.get("Headline") ?? "Product walkthrough");
  const description = parseParagraphs(subsections.get("Description") ?? "");
  const videoEntry = collapseParagraphs(subsections.get("Video") ?? "");

  return {
    headline,
    description,
    videoUrl: extractUrl(videoEntry)
  };
}

function parseFaq(section: string): LandingContent["faq"] {
  const lines = section.split("\n");
  const entries: LandingContent["faq"] = [];
  let currentQuestion: string | null = null;
  let answerLines: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    if (line.startsWith("- **")) {
      if (currentQuestion) {
        entries.push({
          question: currentQuestion,
          answer: answerLines.join(" ").trim()
        });
        answerLines = [];
      }
      const match = line.match(/^-\s*\*\*(.+?)\*\*/);
      currentQuestion = match ? match[1].trim() : line.replace(/^-\s*/, "");
    } else {
      answerLines.push(line);
    }
  }

  if (currentQuestion) {
    entries.push({
      question: currentQuestion,
      answer: answerLines.join(" ").trim()
    });
  }

  return entries;
}

function parseFinalCta(section: string, fallbackTransformation: string): LandingContent["finalCta"] {
  const { subsections } = parseSubsections(section);
  const primary = parseLinks(subsections.get("Primary") ?? "")[0];
  const secondary = parseLinks(subsections.get("Secondary") ?? "")[0] ?? null;
  const transformation = collapseParagraphs(subsections.get("Transformation") ?? "") || fallbackTransformation;
  const primaryCta = primary ?? { label: "Book a Demo", href: "#final-cta" };

  return {
    banner: collapseParagraphs(subsections.get("Banner") ?? ""),
    primaryCta,
    secondaryCta: secondary,
    transformation,
    contactEmail: extractEmailFromHref(primaryCta.href)
  };
}

function parseSubsections(section: string) {
  const parts = section.split("\n### ");
  const subsections = new Map<string, string>();

  for (const chunk of parts.slice(1)) {
    const newlineIndex = chunk.indexOf("\n");
    if (newlineIndex === -1) {
      continue;
    }
    const heading = chunk.slice(0, newlineIndex).trim();
    const body = chunk.slice(newlineIndex + 1).trim();
    subsections.set(normalizeHeading(heading), body);
  }

  return { subsections };
}

function collapseParagraphs(section: string) {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function parseParagraphs(section: string): string[] {
  const paragraphs: string[] = [];
  let current: string[] = [];

  for (const rawLine of section.split("\n")) {
    const line = rawLine.trim();
    if (!line) {
      if (current.length) {
        paragraphs.push(current.join(" "));
        current = [];
      }
      continue;
    }
    current.push(line);
  }

  if (current.length) {
    paragraphs.push(current.join(" "));
  }

  return paragraphs;
}

function parseBullets(section: string): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s+/, ""));
}

function parsePlanSteps(section: string): Array<{ title: string; description: string }> {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\./.test(line))
    .map((line) => line.replace(/^\d+\.\s*/, ""))
    .map((line) => {
      const match = line.match(/^\*\*(.+?)\*\*\s*[—–-]\s*(.+)$/);
      if (match) {
        return {
          title: match[1].trim(),
          description: match[2].trim()
        };
      }
      return {
        title: line.trim(),
        description: ""
      };
    });
}

function parseLinks(value: string): CtaLink[] {
  return Array.from(value.matchAll(/\[(.+?)\]\((.+?)\)/g)).map((match) => ({
    label: match[1].trim(),
    href: match[2].trim()
  }));
}

function extractQuote(value: string) {
  if (!value) {
    return { quote: "", attribution: "" };
  }

  const match = value.match(/^[“"]?(.*?)[”"]?\s*[—–-]\s*(.+)$/);
  if (match) {
    return {
      quote: match[1].trim(),
      attribution: match[2].trim()
    };
  }

  return {
    quote: value,
    attribution: ""
  };
}

function extractUrl(value: string) {
  const match = value.match(/https?:\/\/\S+/);
  return match ? match[0] : value;
}

function extractEmailFromHref(href: string): string | null {
  if (!href) {
    return null;
  }
  const match = href.match(/^mailto:([^?]+)/i);
  return match ? match[1] : null;
}

function normalizeHeading(value: string) {
  return value.replace(/[’]/g, "'");
}
