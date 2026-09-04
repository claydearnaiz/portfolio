import { GameObject } from "@/types/game";

export const MAP_WIDTH = 1600;
export const MAP_HEIGHT = 1200;
export const TILE_SIZE = 40;

export const initialObjects: GameObject[] = [
  // Outer Boundary Walls
  { id: "wall_top", x: 0, y: 0, width: MAP_WIDTH, height: 40, type: "wall" },
  { id: "wall_bottom", x: 0, y: MAP_HEIGHT - 40, width: MAP_WIDTH, height: 40, type: "wall" },
  { id: "wall_left", x: 0, y: 0, width: 40, height: MAP_HEIGHT, type: "wall" },
  { id: "wall_right", x: MAP_WIDTH - 40, y: 0, width: 40, height: MAP_HEIGHT, type: "wall" },

  // Internal Walls & Rooms
  // Room 1: Archives & Projects (Top Left)
  { id: "w_r1_1", x: 40, y: 320, width: 360, height: 40, type: "wall" },
  { id: "w_r1_2", x: 480, y: 40, width: 40, height: 280, type: "wall" },

  // Room 2: Skills & Database (Top Right)
  { id: "w_r2_1", x: 1040, y: 40, width: 40, height: 320, type: "wall" },
  { id: "w_r2_2", x: 1080, y: 360, width: 360, height: 40, type: "wall" },

  // Secret Hidden Room (Behind Fake Wall on Top Right)
  { id: "fake_wall_1", x: 1440, y: 360, width: 120, height: 40, type: "fake_wall", label: "Hidden Passageway" },
  { id: "w_secret_1", x: 1400, y: 40, width: 40, height: 320, type: "wall" },

  // Center Maze Barriers
  { id: "w_center_1", x: 320, y: 520, width: 320, height: 40, type: "wall" },
  { id: "w_center_2", x: 960, y: 520, width: 320, height: 40, type: "wall" },
  { id: "w_center_3", x: 640, y: 360, width: 40, height: 280, type: "wall" },
  { id: "w_center_4", x: 920, y: 360, width: 40, height: 280, type: "wall" },

  // Bottom Rooms: Experience & Contact
  { id: "w_r3_1", x: 40, y: 840, width: 440, height: 40, type: "wall" },
  { id: "w_r3_2", x: 480, y: 880, width: 40, height: 280, type: "wall" },
  { id: "w_r4_1", x: 1080, y: 840, width: 480, height: 40, type: "wall" },
  { id: "w_r4_2", x: 1040, y: 880, width: 40, height: 280, type: "wall" },

  // Interactive Portfolio Nodes
  { id: "node_projects", x: 240, y: 160, width: 60, height: 60, type: "node_projects", label: "PROJECT ARCHIVE" },
  { id: "node_about", x: 240, y: 640, width: 60, height: 60, type: "node_about", label: "PROFILE NODE" },
  { id: "node_skills", x: 1280, y: 160, width: 60, height: 60, type: "node_skills", label: "SKILL DATABASE" },
  { id: "node_experience", x: 240, y: 1000, width: 60, height: 60, type: "node_experience", label: "CAREER LOGS" },
  { id: "node_contact", x: 1280, y: 1000, width: 60, height: 60, type: "node_contact", label: "COMMUNICATION NODE" },
  { id: "node_terminal", x: 770, y: 200, width: 60, height: 60, type: "node_terminal", label: "TERMINAL CONSOLE" },

  // Collectible DATA Fragments (8 total)
  { id: "data_1", x: 120, y: 120, width: 24, height: 24, type: "collectible", label: "Data Fragment Alpha" },
  { id: "data_2", x: 1440, y: 120, width: 24, height: 24, type: "collectible", label: "Data Fragment Beta" },
  { id: "data_3", x: 1500, y: 160, width: 24, height: 24, type: "collectible", label: "Secret Fragment" }, // Inside secret room
  { id: "data_4", x: 120, y: 1040, width: 24, height: 24, type: "collectible", label: "Data Fragment Gamma" },
  { id: "data_5", x: 1440, y: 1040, width: 24, height: 24, type: "collectible", label: "Data Fragment Delta" },
  { id: "data_6", x: 780, y: 440, width: 24, height: 24, type: "collectible", label: "Data Fragment Epsilon" },
  { id: "data_7", x: 440, y: 680, width: 24, height: 24, type: "collectible", label: "Data Fragment Zeta" },
  { id: "data_8", x: 1160, y: 680, width: 24, height: 24, type: "collectible", label: "Data Fragment Eta" },

  // Secret Developer Terminal
  { id: "secret_dev", x: 1520, y: 80, width: 40, height: 40, type: "secret_terminal", label: "DEVELOPER MESSAGE" },

  // SYSTEM CORE OBJECTIVE (Center Core Chamber)
  { id: "core_system", x: 760, y: 720, width: 80, height: 80, type: "core", label: "SYSTEM CORE" },
];
