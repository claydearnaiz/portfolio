import { PersonalInfo, NavItem } from "@/types";

export const personalInfo: PersonalInfo = {
  name: "Clayde Nhicos Arnaiz",
  role: "Computer Engineer",
  tagline: "Aspiring Software Engineer & Cloud Engineer.",
  bio: [
    "I am a Computer Engineering Graduate aspiring to build a long-term career as a Software Engineer and Cloud Engineer.",
    "Strongest foundation in Python, C++, PHP, and relational databases from core academic engineering coursework, with hands-on exposure to mobile apps (React Native / Expo, Flutter), cloud services (Firebase, Supabase, AWS), and IoT microcontrollers (Raspberry Pi, Arduino, ESP32).",
    "Continuously learning, building, and expanding my technical depth across modern software development and cloud systems."
  ],
  location: "Mandaluyong City, Metro Manila",
  email: "claydenhicosarnaiz@gmail.com",
  phone: "+63 947 741 2362",
  github: "https://github.com/claydearnaiz",
  linkedin: "https://www.linkedin.com/in/clayde-arnaiz",
  portfolioUrl: "https://clayde-arnaiz.vercel.app",
  availableForWork: true
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" }
];
