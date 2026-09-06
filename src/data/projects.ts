import { Project } from "@/types";

// Names, dates, technologies, and descriptions are grounded in public/resume.pdf.
export const projectsData: Project[] = [
  {
    id: "ayos",
    title: "AyOS — Personal Productivity OS",
    year: "2026",
    kind: "Personal project",
    description: "A native Windows application bringing productivity, finance, fitness, calendar, and automation into one offline-first system.",
    problemSolved: "Built and shipped a React-to-Rust application with embedded SQLite. Validation, persistence, backups, and native operations live in Rust, with an authenticated localhost API connecting n8n workflows.",
    category: "Other",
    technologies: ["Tauri", "Rust", "React", "TypeScript", "SQLite", "n8n"],
    image: "/projects/ayos/overview.png",
    featured: true,
  },
  {
    id: "linis-smart-bin",
    title: "LINIS: IoT System for Bin Time-to-Overflow Forecasting and Priority Collection",
    year: "2026",
    kind: "Academic thesis project",
    description: "An IoT system connecting ESP32 sensors, Raspberry Pi camera data, Firebase, and an Android application to monitor bins and forecast fill levels.",
    problemSolved: "Built a Random Forest forecasting model and a YOLOv8n people-counting pipeline using head detection within a defined region of interest. Synchronized sensor and camera data in real time and converted the vision model to NCNN for edge deployment.",
    category: "IoT & Embedded",
    technologies: ["ESP32", "Raspberry Pi", "Firebase", "React Native", "Python", "YOLOv8", "Random Forest"],
    image: "/projects/linis-app-1.png",
    featured: true,
  },
  {
    id: "qr-attendance",
    title: "QR Attendance & Allowance Management System",
    year: "2024",
    kind: "Academic project",
    description: "A QR-based attendance system that credits a predefined event allowance to eligible users after verified attendance.",
    problemSolved: "Implemented dashboards for admins, workers, and attendees, with event management, attendance history, announcements, and allowance tracking. Validated core workflows through unit, integration, user acceptance, and performance testing.",
    category: "Web Development",
    technologies: ["Tailwind CSS", "JavaScript", "PHP", "MySQL"],
    image: "",
    featured: true,
  },
];

export const linisLayers = [
  { name: "Sense", technology: "ESP32", detail: "Sensor readings capture the physical state of the bins." },
  { name: "See", technology: "Raspberry Pi · YOLOv8n", detail: "Head detection counts people within a defined region of interest. NCNN brings the model to the edge." },
  { name: "Synchronize", technology: "Firebase", detail: "Sensor and camera data stay synchronized in real time." },
  { name: "Forecast", technology: "Python · Random Forest", detail: "A Random Forest model uses the data to forecast bin fill levels." },
  { name: "Monitor / act", technology: "React Native · Android", detail: "The application brings the connected system into a readable monitoring interface." },
];
