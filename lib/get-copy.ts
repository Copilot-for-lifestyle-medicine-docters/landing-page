import { readFile } from "node:fs/promises";
import path from "node:path";

export interface LandingContent {
  hero: {
    title: string;
    tagline: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
  who: Array<{ title: string; description: string }>;
  problem: string;
  solution: {
    intro: string;
    bullets: Array<{ title: string; description: string }>;
  };
  labsChooseUs: Array<{ title: string; description: string }>;
  physiciansRely: Array<{ title: string; description: string }>;
  howItWorks: string[];
  compliance: string[];
  earlyAccess: {
    intro: string;
    whatYouGet: string[];
    whatWeMeasure: string[];
  };
  faq: Array<{ question: string; answer: string }>;
  finalCta: {
    text: string;
    linkLabel: string;
    linkHref: string;
  };
}

const COPY_PATH = path.join(process.cwd(), "landing-page-copy.md");

export async function getLandingContent(): Promise<LandingContent> {
  const raw = await readFile(COPY_PATH, "utf8");
  const normalized = raw.replace(/\r\n/g, "\n").trim();
  const [heroRaw, ...sectionsRaw] = normalized.split("\n## ");

  const sections = new Map<string, string>();
  for (const chunk of sectionsRaw) {
    const newlineIndex = chunk.indexOf("\n");
    const heading = chunk.slice(0, newlineIndex).trim();
    const body = chunk.slice(newlineIndex + 1).trim();
    sections.set(normalizeHeading(heading), body);
  }

  const heroLines = heroRaw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const title = heroLines
    .find((line) => line.startsWith("# "))
    ?.replace(/^#\s+/, "")
    ?.trim();
  const tagline = heroLines.find((line) => !line.startsWith("#")) ?? "";

  const hero = {
    title: title ?? "Eliksir",
    tagline,
    primaryCta: {
      label: "Request a pilot",
      href: "mailto:yannick.lansink@live.nl"
    },
    secondaryCta: {
      label: "How it works",
      href: "#how-it-works"
    }
  };

  const whoSection = sections.get("Who it's for") ?? "";
  const who = parseStrongBulletList(whoSection);

  const problemSection = sections.get("The problem today") ?? "";
  const problem = collapseParagraphs(problemSection);

  const solutionSection = sections.get("Our solution") ?? "";
  const solution = {
    intro: collapseParagraphs(solutionSection.split("\n-")[0] ?? ""),
    bullets: parseStrongBulletList(solutionSection)
  };

  const labsChooseSection = sections.get("Why labs/clinics choose us") ?? "";
  const labsChooseUs = parseStrongBulletList(labsChooseSection);

  const physiciansSection = sections.get("Why physicians rely on it") ?? "";
  const physiciansRely = parseStrongBulletList(physiciansSection);

  const howSection = sections.get("How it works") ?? "";
  const howItWorks = parseOrderedList(howSection);

  const complianceSection = sections.get("Compliance by design") ?? "";
  const compliance = parseBullets(complianceSection);

  const earlySection = sections.get("Early access pilots") ?? "";
  const { intro: earlyIntro, whatYouGet, whatWeMeasure } = parseEarlyAccess(earlySection);

  const faqSection = sections.get("FAQ") ?? "";
  const faq = parseFaq(faqSection);

  const callToActionSection = sections.get("Call to action") ?? "";
  const finalCta = parseCta(callToActionSection);

  return {
    hero,
    who,
    problem,
    solution,
    labsChooseUs,
    physiciansRely,
    howItWorks,
    compliance,
    earlyAccess: {
      intro: earlyIntro,
      whatYouGet,
      whatWeMeasure
    },
    faq,
    finalCta
  };
}

function collapseParagraphs(section: string) {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

function parseBullets(section: string): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s+/, ""));
}

function parseStrongBulletList(section: string): Array<{ title: string; description: string }> {
  return parseBullets(section).map((item) => {
    const match = item.match(/^\*\*(.+?)\*\*\s*(.+)$/);
    if (match) {
      return {
        title: match[1].trim(),
        description: match[2].trim()
      };
    }
    return {
      title: item,
      description: ""
    };
  });
}

function parseOrderedList(section: string): string[] {
  return section
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => /^\d+\./.test(line))
    .map((line) => line.replace(/^\d+\.\s*/, ""));
}

function parseEarlyAccess(section: string): {
  intro: string;
  whatYouGet: string[];
  whatWeMeasure: string[];
} {
  const parts = section.split("\n### ");
  const intro = collapseParagraphs(parts[0] ?? "");

  const subsections = new Map<string, string>();
  for (const chunk of parts.slice(1)) {
    const newlineIndex = chunk.indexOf("\n");
    const heading = chunk.slice(0, newlineIndex).trim();
    const body = chunk.slice(newlineIndex + 1).trim();
    subsections.set(normalizeHeading(heading), body);
  }

  return {
    intro,
    whatYouGet: parseBullets(
      subsections.get("What you'll get") ?? subsections.get("What you’ll get") ?? ""
    ),
    whatWeMeasure: parseBullets(
      subsections.get("What we'll measure together") ??
        subsections.get("What we’ll measure together") ??
        ""
    )
  };
}

function parseFaq(section: string): Array<{ question: string; answer: string }> {
  const lines = section.split("\n");
  const entries: Array<{ question: string; answer: string }> = [];
  let currentQuestion: string | null = null;
  let answerLines: string[] = [];

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }
    if (line.startsWith("- **")) {
      if (currentQuestion) {
        entries.push({ question: currentQuestion, answer: answerLines.join(" ").trim() });
        answerLines = [];
      }
      const match = line.match(/^-\s*\*\*(.+?)\*\*/);
      currentQuestion = match ? match[1].trim() : line.replace(/^-\s*/, "");
    } else {
      answerLines.push(line);
    }
  }

  if (currentQuestion) {
    entries.push({ question: currentQuestion, answer: answerLines.join(" ").trim() });
  }

  return entries;
}

function parseCta(section: string) {
  const lines = section
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const textLine = lines.find((line) => line.startsWith("- ")) ?? "";
  const text = textLine.replace(/^-\s*/, "");

  const linkLine = lines.find((line) => line.startsWith("[")) ?? "";
  const linkMatch = linkLine.match(/^\[(.+?)\]\((.+?)\)/);

  return {
    text,
    linkLabel: linkMatch ? linkMatch[1] : "Request a pilot",
    linkHref: linkMatch ? linkMatch[2] : "mailto:yannick.lansink@live.nl"
  };
}

function normalizeHeading(value: string) {
  return value.replace(/[’]/g, "'");
}
