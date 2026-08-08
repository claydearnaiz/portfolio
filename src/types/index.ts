export type ProjectCategory = "All" | "Mobile Development" | "Web Development" | "IoT & Embedded" | "Other";

export interface Project {
  id: string;
  title: string;
  description: string;
  problemSolved?: string;
  category: "Mobile Development" | "Web Development" | "IoT & Embedded" | "Other";
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

export type SkillCategory = "Frontend" | "Backend" | "IoT & AI" | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  iconName: string;
  level?: number | string;
}

export interface ExperienceItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  description: string;
  type: "work" | "education" | "milestone" | "achievement";
  technologies?: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface PersonalInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string[];
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  twitter?: string;
  portfolioUrl?: string;
  availableForWork: boolean;
}
