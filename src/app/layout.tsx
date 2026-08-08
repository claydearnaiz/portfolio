import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/data/personal";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${personalInfo.name} — Computer Engineer`,
  description: personalInfo.tagline,
  keywords: [
    "Computer Engineer",
    "Software Engineer",
    "Cloud Engineer",
    "Developer Portfolio",
    "Next.js",
    "TypeScript",
    "Python",
    "C++",
  ],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: personalInfo.portfolioUrl,
    title: `${personalInfo.name} — Computer Engineer`,
    description: personalInfo.tagline,
    siteName: `${personalInfo.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} — Computer Engineer`,
    description: personalInfo.tagline,
  },
};

import { InteractiveTerminalModal } from "@/components/ui/InteractiveTerminalModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="bg-black text-neutral-100 antialiased min-h-screen selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
        <ThemeProvider>
          <SmoothScrollProvider>
            <a href="#main-content" className="skip-to-content">
              SKIP TO CONTENT
            </a>
            <ScrollProgress />
            <GrainOverlay />
            <CustomCursor />
            {children}
            <InteractiveTerminalModal />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
