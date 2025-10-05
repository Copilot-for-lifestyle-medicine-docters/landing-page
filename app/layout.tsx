import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";

import { AnalyticsStub } from "@/components/analytics";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-open-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eliksir.health"),
  title: {
    default: "Eliksir",
    template: "%s | Eliksir"
  },
  description: "AI clinical lab assistant delivering pattern-level insights and clear follow-ups.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eliksir"
  },
  twitter: {
    card: "summary_large_image",
    creator: "@eliksir",
    site: "@eliksir"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} bg-background text-foreground`}>
      <body className="background-gradient min-h-screen antialiased">
        <div className="relative flex min-h-screen flex-col">
          {children}
          <AnalyticsStub />
        </div>
      </body>
    </html>
  );
}
