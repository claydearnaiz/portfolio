import { Project } from "@/types";

export const projectsData: Project[] = [
  {
    id: "linis-smart-bin",
    title: "LINIS – Smart Bin Monitoring System",
    description: "Developed a cross-platform mobile application and IoT edge architecture for real-time smart bin monitoring across 3 canteen locations with 2 bins each (6 smart bins total). Integrated weight sensors, fill-level sensors, and Raspberry Pi camera modules.",
    problemSolved: "Deployed YOLOv8n-NCNN model on Raspberry Pi to count people inside custom Regions of Interest (ROI) classified as Diners or Buyers. Data from smart bins and camera modules is synced to Firebase, where a Raspberry Pi Python script aligns multi-source timestamps and performs feature engineering to forecast remaining time before bin overflow.",
    category: "Mobile Development",
    technologies: ["React Native", "Expo", "Flutter", "Raspberry Pi", "YOLOv8n-NCNN", "Python", "Firebase", "Node.js", "Arduino", "ESP32"],
    image: "/projects/linis-app-1.png",
    demo: "https://clayde-arnaiz.vercel.app",
    isPrivateRepo: true,
    featured: true,
  },
];
