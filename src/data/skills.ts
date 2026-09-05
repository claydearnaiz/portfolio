import { Skill, SkillCategory } from "@/types";

export const skillGroups: { title: SkillCategory; items: string[] }[] = [
  { title: "Languages", items: ["C++", "C#", "Python", "JavaScript", "TypeScript", "PHP", "Rust", "SQL"] },
  { title: "Frameworks / Tools", items: ["React", "React Native", "Expo", ".NET", "Tauri", "Tailwind CSS", "Firebase", "MySQL", "SQLite", "n8n"] },
  { title: "IT / Cloud", items: ["AWS", "Freshservice", "Monday.com", "IT Asset Management", "ITSM"] },
  { title: "Hardware / IoT", items: ["ESP32", "Raspberry Pi", "Arduino"] },
];

export const skillsData: Skill[] = skillGroups.flatMap(({ title, items }) =>
  items.map((name) => ({ name, category: title, iconName: "Code" }))
);
