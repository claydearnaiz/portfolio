import { PersonalInfo, NavItem } from "@/types";

// Professional facts: public/resume.pdf. GitHub is retained from repository configuration.
export const personalInfo: PersonalInfo = {
  name: "Clayde Nhicos Arnaiz",
  role: "Computer Engineering graduate",
  tagline: "Computer Engineering graduate focused on software and connected systems.",
  bio: [
    "I build applications with an understanding of the data, services, and hardware behind them.",
    "My work spans a native Windows productivity application, an IoT forecasting system, and a QR-based attendance and allowance platform."
  ],
  location: "Mandaluyong City, Philippines",
  email: "claydenhicosarnaiz@gmail.com",
  phone: "+63 947 741 2362",
  github: "https://github.com/claydearnaiz",
  linkedin: "https://www.linkedin.com/in/clayde-arnaiz",
  portfolioUrl: "https://claydearnaiz.me",
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];
