import { Skill } from "@/types";

export const skillsData: Skill[] = [
  // Primary Confidence (Core Academic & Programming)
  { name: "Python", category: "Frontend", level: 90, iconName: "Code2" },
  { name: "C++", category: "Frontend", level: 85, iconName: "Code2" },
  { name: "PHP", category: "Frontend", level: 82, iconName: "Server" },
  { name: "SQL & Relational DBs", category: "Frontend", level: 80, iconName: "Database" },

  // Mobile & Web Development (Learning Journey)
  { name: "React / HTML / CSS", category: "Frontend", level: 68, iconName: "Layout" },
  { name: "Expo / React Native", category: "Frontend", level: 65, iconName: "Smartphone" },
  { name: "Flutter", category: "Frontend", level: 62, iconName: "Smartphone" },

  // Backend & Cloud Services (Learning Journey)
  { name: "Node.js", category: "Backend", level: 64, iconName: "Server" },
  { name: "Firebase & Firestore", category: "Backend", level: 68, iconName: "Flame" },
  { name: "Supabase", category: "Backend", level: 60, iconName: "Database" },

  // Hardware & Embedded Systems (Thesis Architecture)
  { name: "Raspberry Pi & Arduino", category: "IoT & AI", level: 85, iconName: "Zap" },
  { name: "YOLOv8n-NCNN Edge AI", category: "IoT & AI", level: 78, iconName: "Terminal" },
  { name: "Random Forest Regression", category: "IoT & AI", level: 72, iconName: "Cpu" },

  // Tools & ITSM Systems
  { name: "GitHub", category: "Tools", level: 82, iconName: "GitBranch" },
  { name: "Freshservice (ITSM)", category: "Tools", level: 80, iconName: "Shield" },
  { name: "Monday.com", category: "Tools", level: 75, iconName: "CheckSquare" },
  { name: "Technical Documentation", category: "Tools", level: 85, iconName: "FileCode" },
];
