export interface GameObject {
  id: string;
  x: number; // grid position or pixel position
  y: number;
  width: number;
  height: number;
  type: "wall" | "fake_wall" | "collectible" | "node_projects" | "node_about" | "node_skills" | "node_experience" | "node_contact" | "node_terminal" | "core" | "secret_terminal";
  label?: string;
  interacted?: boolean;
  collected?: boolean;
  color?: string;
}

export interface PlayerState {
  x: number;
  y: number;
  size: number;
  speed: number;
  vx: number;
  vy: number;
  direction: "up" | "down" | "left" | "right";
}

export interface GameStats {
  dataCollected: number;
  totalData: number;
  discoveredAreas: Set<string>;
  objective: string;
  isComplete: boolean;
  secretFound: boolean;
}
