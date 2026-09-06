import type { Metadata } from "next";
import { Instrument_Sans, Inter } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/data/personal";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
  weight: ["500", "600"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSans.variable} light`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark'){document.documentElement.classList.toggle('light',t==='light');document.documentElement.classList.toggle('dark',t==='dark')}}catch(e){}` }} /></head>
      <body className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased selection:bg-accent selection:text-accent-foreground">
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
