import { Skill } from "@/types";

export const skillsData: Skill[] = [
  // Primary Confidence (Core Academic & Programming)
  { name: "Python", category: "Frontend", proficiency: "Proficient", level: 90, iconName: "FileCode" },
  { name: "C++", category: "Frontend", proficiency: "Proficient", level: 85, iconName: "Terminal" },
  { name: "PHP", category: "Frontend", proficiency: "Proficient", level: 82, iconName: "Code" },
  { name: "SQL & Relational DBs", category: "Frontend", proficiency: "Proficient", level: 80, iconName: "Database" },

  // Mobile & Web Development (Learning Journey)
  { name: "React / HTML / CSS", category: "Frontend", proficiency: "Familiar", level: 68, iconName: "Layout" },
  { name: "Expo / React Native", category: "Frontend", proficiency: "Familiar", level: 65, iconName: "Smartphone" },
  { name: "Flutter", category: "Frontend", proficiency: "Learning", level: 62, iconName: "Layers" },

  // Backend & Cloud Services (Learning Journey)
  { name: "Node.js", category: "Backend", proficiency: "Learning", level: 64, iconName: "Server" },
  { name: "Firebase & Firestore", category: "Backend", proficiency: "Familiar", level: 68, iconName: "Flame" },
  { name: "Supabase", category: "Backend", proficiency: "Learning", level: 60, iconName: "Coins" },

  // Hardware & Embedded Systems (Thesis Architecture)
  { name: "Raspberry Pi & Arduino", category: "IoT & AI", proficiency: "Proficient", level: 85, iconName: "Zap" },
  { name: "YOLOv8n-NCNN Edge AI", category: "IoT & AI", proficiency: "Proficient", level: 78, iconName: "Cpu" },
  { name: "Random Forest Regression", category: "IoT & AI", proficiency: "Familiar", level: 72, iconName: "Sliders" },

  // Tools & ITSM Systems
  { name: "GitHub", category: "Tools", proficiency: "Proficient", level: 82, iconName: "GitBranch" },
  { name: "Freshservice (ITSM)", category: "Tools", proficiency: "Proficient", level: 80, iconName: "ShieldCheck" },
  { name: "Monday.com", category: "Tools", proficiency: "Familiar", level: 75, iconName: "LayoutGrid" },
  { name: "Technical Documentation", category: "Tools", proficiency: "Proficient", level: 85, iconName: "Workflow" },
];
