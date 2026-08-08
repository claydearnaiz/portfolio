import { create } from "zustand";
import { persist } from "zustand/middleware";
import { microcosmAudio } from "../utils/microcosmAudio";

export type MicrocosmSpecies =
  | "Clownfish"
  | "Blue Tang"
  | "Yellow Tang"
  | "Betta"
  | "Anglerfish"
  | "Lionfish"
  | "Goldfish"
  | "Koi"
  | "Puffer"
  | "Shark"
  | "Swordfish"
  | "Blobfish"
  | "Mandarin Fish"
  | "Piranha"
  | "Moorish Idol"
  | "Butterfly Fish"
  | "Royal Gramma"
  | "Tetra"
  | "Sunfish"
  | "Blue Goldfish"
  | "Black Lion Fish"
  | "Coral Grouper"
  | "Cowfish"
  | "Flatfish"
  | "Flower Horn"
  | "Goblin Shark"
  | "Humphead"
  | "Parrot Fish"
  | "Red Snapper"
  | "Tuna"
  | "Turbot"
  | "Zebra Clown Fish"
  // Legacy aliases
  | "Blue Fish"
  | "Crystal Fish"
  | "Golden Tetra"
  | "Void Fish"
  | "Prism Ray"
  | "Nebula Jelly"
  | "Golden Dragon Tetra";

export interface MicrocosmCreature {
  id: string;
  species: MicrocosmSpecies;
  position: [number, number, number];
  velocity: [number, number, number];
  size: number;
  age: number;
  energy: number;
  hunger: number;
  happiness: number;
  personality: "Curious" | "Playful" | "Shy" | "Gluttonous";
  heading: number;
  pitch: number;
  isMutated?: boolean;
}

export interface MicrocosmEgg {
  id: string;
  position: [number, number, number];
  hatchTimer: number;
  parentSpecies: MicrocosmSpecies;
}

export interface MicrocosmShockwave {
  id: string;
  position: [number, number, number];
  radius: number;
  maxRadius: number;
}

export type MicrocosmObjectType =
  | "plant"
  | "rock"
  | "food"
  | "elixir"
  | "coral"
  | "lava"
  | "mushroom"
  | "crystal";

export interface MicrocosmObject {
  id: string;
  type: MicrocosmObjectType;
  position: [number, number, number];
}

export type MicrocosmBiome = "Deep Abyssal" | "Cosmic Nebula" | "Hydrothermal Vent" | "Emerald Reef";
export type MicrocosmWeather = "none" | "biostorm" | "eclipse" | "bloom" | "vortex";
export type MicrocosmTool = "move" | "laser" | "shockwave" | "plant" | "rock" | "fish" | "food" | "elixir";

interface MicrocosmState {
  creatures: MicrocosmCreature[];
  objects: MicrocosmObject[];
  eggs: MicrocosmEgg[];
  shockwaves: MicrocosmShockwave[];
  activeTool: MicrocosmTool;
  selectedCreatureId: string | null;
  discoveries: string[];
  isDay: boolean;
  timeOfDay: number;
  dayCount: number;
  stardust: number;

  biome: MicrocosmBiome;
  weather: MicrocosmWeather;
  weatherTimer: number;
  laserPosition: [number, number, number] | null;

  setActiveTool: (tool: MicrocosmTool) => void;
  setSelectedCreatureId: (id: string | null) => void;
  setBiome: (biome: MicrocosmBiome) => void;
  triggerWeather: (weather: MicrocosmWeather) => void;
  setLaserPosition: (pos: [number, number, number] | null) => void;
  triggerShockwave: (pos: [number, number, number]) => void;
  addStardust: (amount: number) => void;
  buyShopItem: (cost: number, action: () => void) => boolean;

  spawnFish: (pos?: [number, number, number], speciesOverride?: MicrocosmSpecies) => void;
  spawnObject: (type: MicrocosmObjectType, pos: [number, number, number]) => void;
  updateSimulation: (delta: number) => void;
  discoverSpecies: (speciesName: string) => void;
}

// STRICT AQUARIUM SPHERE BOUNDARIES (R_inner = 1.35)
const SPHERE_INNER_RADIUS = 1.35;
const GROUND_Y = -1.35;
const GROUND_RADIUS_MAX = 1.25;

function clampToInnerSphere(pos: [number, number, number], maxR: number = SPHERE_INNER_RADIUS): [number, number, number] {
  let [x, y, z] = pos;
  const dist = Math.sqrt(x * x + y * y + z * z);
  if (dist > maxR || isNaN(dist) || dist === 0) {
    const scale = maxR / (dist || 1);
    x *= scale;
    y *= scale;
    z *= scale;
  }
  return [x, y, z];
}

const ALL_SPECIES_POOL: MicrocosmSpecies[] = [
  "Clownfish",
  "Blue Tang",
  "Yellow Tang",
  "Betta",
  "Anglerfish",
  "Lionfish",
  "Goldfish",
  "Koi",
  "Puffer",
  "Shark",
  "Swordfish",
  "Blobfish",
  "Mandarin Fish",
  "Piranha",
  "Moorish Idol",
  "Butterfly Fish",
  "Royal Gramma",
  "Tetra",
  "Sunfish",
  "Blue Goldfish",
  "Black Lion Fish",
  "Coral Grouper",
  "Cowfish",
  "Flatfish",
  "Flower Horn",
  "Goblin Shark",
  "Humphead",
  "Parrot Fish",
  "Red Snapper",
  "Tuna",
  "Turbot",
  "Zebra Clown Fish",
];

export const useMicrocosmStore = create<MicrocosmState>()(
  persist(
    (set, get) => ({
      creatures: [
        {
          id: "fish_1",
          species: "Clownfish",
          position: [0.2, -0.2, 0.3],
          velocity: [0.004, 0.001, 0.003],
          heading: Math.random() * Math.PI * 2,
          pitch: 0,
          size: 1,
          age: 12,
          energy: 82,
          hunger: 70,
          happiness: 95,
          personality: "Curious",
        },
        {
          id: "fish_2",
          species: "Blue Tang",
          position: [0.5, 0.1, -0.3],
          velocity: [-0.003, -0.001, 0.004],
          heading: Math.random() * Math.PI * 2,
          pitch: 0,
          size: 1,
          age: 6,
          energy: 65,
          hunger: 60,
          happiness: 88,
          personality: "Playful",
        },
        {
          id: "fish_3",
          species: "Yellow Tang",
          position: [-0.5, -0.4, 0.2],
          velocity: [0.004, 0.002, -0.002],
          heading: Math.random() * Math.PI * 2,
          pitch: 0,
          size: 1,
          age: 24,
          energy: 90,
          hunger: 65,
          happiness: 100,
          personality: "Gluttonous",
        },
      ],
      objects: [
        { id: "rock_1", type: "rock", position: [0, GROUND_Y, 0] },
        { id: "rock_2", type: "rock", position: [-0.7, GROUND_Y, -0.4] },
        { id: "plant_1", type: "plant", position: [-0.6, GROUND_Y, 0.4] },
        { id: "plant_2", type: "plant", position: [0.7, GROUND_Y, -0.3] },
      ],
      eggs: [],
      shockwaves: [],
      activeTool: "move",
      selectedCreatureId: null,
      discoveries: ["Clownfish", "Blue Tang", "Yellow Tang", "Seaweed"],
      isDay: true,
      timeOfDay: 12,
      dayCount: 1,
      stardust: 150,
      biome: "Deep Abyssal",
      weather: "none",
      weatherTimer: 0,
      laserPosition: null,

      setActiveTool: (tool) => set({ activeTool: tool, laserPosition: null }),
      setSelectedCreatureId: (id) => set({ selectedCreatureId: id }),
      setBiome: (biome) => {
        set({ biome });
        microcosmAudio.playEventSting();
      },

      addStardust: (amount) => set((s) => ({ stardust: s.stardust + amount })),

      buyShopItem: (cost, action) => {
        const state = get();
        if (state.stardust >= cost) {
          set({ stardust: state.stardust - cost });
          action();
          microcosmAudio.playDiscoveryChime();
          return true;
        }
        return false;
      },

      triggerWeather: (weather) => {
        set({ weather, weatherTimer: 25 });
        microcosmAudio.playEventSting();
        get().discoverSpecies(`Event: ${weather.toUpperCase()}`);
      },

      setLaserPosition: (pos) => {
        if (!pos) {
          set({ laserPosition: null });
          return;
        }
        set({ laserPosition: clampToInnerSphere(pos, SPHERE_INNER_RADIUS - 0.1) });
      },

      triggerShockwave: (rawPos) => {
        const pos = clampToInnerSphere(rawPos, SPHERE_INNER_RADIUS - 0.2);
        const id = `sw_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`;
        set((state) => ({
          shockwaves: [...state.shockwaves, { id, position: pos, radius: 0.1, maxRadius: 1.8 }],
        }));
        microcosmAudio.playRippleChime(Math.floor(Math.random() * 8));
      },

      spawnFish: (rawPos, speciesOverride) => {
        const pos: [number, number, number] = rawPos
          ? clampToInnerSphere(rawPos, SPHERE_INNER_RADIUS - 0.2)
          : [
              (Math.random() - 0.5) * 1.0,
              (Math.random() - 0.5) * 0.6,
              (Math.random() - 0.5) * 1.0,
            ];
        const id = `fish_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        const species: MicrocosmSpecies =
          speciesOverride ||
          ALL_SPECIES_POOL[Math.floor(Math.random() * ALL_SPECIES_POOL.length)];
        const personalities: MicrocosmCreature["personality"][] = ["Curious", "Playful", "Shy", "Gluttonous"];

        const newFish: MicrocosmCreature = {
          id,
          species,
          position: pos,
          velocity: [0.003, 0, 0.003],
          heading: Math.random() * Math.PI * 2,
          pitch: 0,
          size: 1,
          age: 1,
          energy: 100,
          hunger: 80,
          happiness: 100,
          personality: personalities[Math.floor(Math.random() * personalities.length)],
        };

        set((state) => ({
          creatures: [...state.creatures, newFish],
          discoveries: Array.from(new Set([...state.discoveries, newFish.species])),
        }));
        microcosmAudio.playBubblePop();
      },

      spawnObject: (type, rawPos) => {
        const isGroundObject =
          type === "plant" ||
          type === "rock" ||
          type === "coral" ||
          type === "lava" ||
          type === "mushroom" ||
          type === "crystal";

        let pos: [number, number, number];

        if (isGroundObject) {
          let gx = rawPos[0];
          let gz = rawPos[2];
          const gr = Math.sqrt(gx * gx + gz * gz);
          if (gr > GROUND_RADIUS_MAX) {
            gx = (gx / (gr || 1)) * GROUND_RADIUS_MAX;
            gz = (gz / (gr || 1)) * GROUND_RADIUS_MAX;
          }
          pos = [gx, GROUND_Y, gz];
        } else {
          pos = clampToInnerSphere(rawPos, SPHERE_INNER_RADIUS - 0.2);
        }

        const id = `${type}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
        set((state) => ({
          objects: [...state.objects, { id, type, position: pos }],
          discoveries: type === "plant"
            ? Array.from(new Set([...state.discoveries, "Seaweed"]))
            : state.discoveries,
        }));
        if (type === "elixir") {
          microcosmAudio.playElixirSplash();
        } else {
          microcosmAudio.playBubblePop();
        }
      },

      discoverSpecies: (speciesName) => {
        set((state) => {
          if (!state.discoveries.includes(speciesName)) {
            microcosmAudio.playDiscoveryChime();
            return { discoveries: [...state.discoveries, speciesName] };
          }
          return state;
        });
      },

      updateSimulation: (delta) => {
        set((state) => {
          const dt = Math.min(delta, 0.04);
          const timeStepScale = dt / 0.016;

          const newTime = (state.timeOfDay + dt * 0.15) % 24;
          const isDay = newTime >= 6 && newTime <= 18;
          const newDayCount = newTime < state.timeOfDay ? state.dayCount + 1 : state.dayCount;

          const stardustGained = state.creatures.filter((c) => c.happiness > 50).length * dt * 0.8;
          const newStardust = Math.floor((state.stardust + stardustGained) * 10) / 10;

          let newWeather = state.weather;
          let newWeatherTimer = state.weatherTimer - dt;
          if (newWeatherTimer <= 0 && state.weather !== "none") {
            newWeather = "none";
            newWeatherTimer = 0;
          }

          if (newWeather === "none" && Math.random() < 0.005 * dt) {
            const weathers: MicrocosmWeather[] = ["biostorm", "eclipse", "bloom", "vortex"];
            newWeather = weathers[Math.floor(Math.random() * weathers.length)];
            newWeatherTimer = 20;
            microcosmAudio.playEventSting();
          }

          const updatedShockwaves = state.shockwaves
            .map((sw) => ({ ...sw, radius: sw.radius + dt * 2.5 }))
            .filter((sw) => sw.radius < sw.maxRadius);

          const updatedObjects = state.objects.map((o) => {
            if (o.type === "food" || o.type === "elixir") {
              let [ox, oy, oz] = o.position;
              if (oy > -1.32) {
                oy = Math.max(-1.32, oy - dt * 0.45);
              }
              return { ...o, position: [ox, oy, oz] as [number, number, number] };
            }
            return o;
          });

          const foodObjects = updatedObjects.filter((o) => o.type === "food");
          const elixirObjects = updatedObjects.filter((o) => o.type === "elixir");
          const plantObjects = updatedObjects.filter((o) => o.type === "plant");
          const eatenFoodIds: string[] = [];
          const consumedElixirIds: string[] = [];

          const survivingEggs: MicrocosmEgg[] = [];
          const hatchedCreatures: MicrocosmCreature[] = [];

          state.eggs.forEach((egg) => {
            const newTimer = egg.hatchTimer - dt;
            if (newTimer <= 0) {
              const babySpecies = ALL_SPECIES_POOL[Math.floor(Math.random() * ALL_SPECIES_POOL.length)];

              hatchedCreatures.push({
                id: `fish_baby_${Date.now()}_${Math.random().toString(36).slice(2, 5)}`,
                species: babySpecies,
                position: clampToInnerSphere(egg.position, SPHERE_INNER_RADIUS - 0.2),
                velocity: [0.003, 0, 0.003],
                heading: Math.random() * Math.PI * 2,
                pitch: 0,
                size: 0.5,
                age: 0,
                energy: 100,
                hunger: 80,
                happiness: 100,
                personality: "Curious",
              });
              microcosmAudio.playDiscoveryChime();
            } else {
              survivingEggs.push({ ...egg, hatchTimer: newTimer });
            }
          });

          // Continuous Forward Swimming AI
          const updatedCreatures = state.creatures.map((c, i) => {
            let [px, py, pz] = c.position;
            let heading = c.heading || 0;
            let pitch = c.pitch || 0;
            let currentSize = 1;
            let isMutated = c.isMutated;
            let species = c.species;

            // IMMEDIATE HARD SPHERE LOCK: If position is ever outside R = 1.35, SNAP it back inside immediately!
            const curDist = Math.sqrt(px * px + py * py + pz * pz);
            if (curDist > SPHERE_INNER_RADIUS || isNaN(curDist)) {
              const snapFactor = SPHERE_INNER_RADIUS / (curDist || 1);
              px *= snapFactor;
              py *= snapFactor;
              pz *= snapFactor;
            }

            const baseSpeed = 0.005 * (newWeather === "biostorm" ? 1.5 : 1.0);

            // Wander steering
            heading += (Math.random() - 0.5) * 0.05 * timeStepScale;
            pitch += (Math.random() - 0.5) * 0.02 * timeStepScale;
            pitch = Math.max(-0.4, Math.min(0.4, pitch));

            // Seek Food
            if (foodObjects.length > 0) {
              let nearestFood: MicrocosmObject | null = null;
              let nearestDist = Infinity;
              for (const food of foodObjects) {
                if (eatenFoodIds.includes(food.id)) continue;
                const fdx = food.position[0] - px;
                const fdy = food.position[1] - py;
                const fdz = food.position[2] - pz;
                const fd = Math.sqrt(fdx * fdx + fdy * fdy + fdz * fdz);
                if (fd < nearestDist) {
                  nearestDist = fd;
                  nearestFood = food;
                }
              }
              if (nearestFood && nearestDist < 3.2) {
                const fdx = nearestFood.position[0] - px;
                const fdy = nearestFood.position[1] - py;
                const fdz = nearestFood.position[2] - pz;
                const targetHeading = Math.atan2(fdx, fdz);
                const targetPitch = Math.atan2(fdy, Math.sqrt(fdx * fdx + fdz * fdz));

                let angleDiff = targetHeading - heading;
                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                heading += angleDiff * 0.1;
                pitch += (targetPitch - pitch) * 0.1;

                const horizDist = Math.sqrt(fdx * fdx + fdz * fdz);
                if (nearestDist <= 0.50 || (horizDist <= 0.42 && py <= -1.0)) {
                  eatenFoodIds.push(nearestFood.id);
                  microcosmAudio.playBubblePop();
                }
              }
            }

            // Seek Mutagen Elixir
            if (elixirObjects.length > 0) {
              for (const elixir of elixirObjects) {
                if (consumedElixirIds.includes(elixir.id)) continue;
                const edx = elixir.position[0] - px;
                const edy = elixir.position[1] - py;
                const edz = elixir.position[2] - pz;
                const edist = Math.sqrt(edx * edx + edy * edy + edz * edz);

                if (edist < 3.2) {
                  const targetHeading = Math.atan2(edx, edz);
                  let angleDiff = targetHeading - heading;
                  while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                  while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                  heading += angleDiff * 0.12;
                }

                if (edist < 0.50) {
                  consumedElixirIds.push(elixir.id);
                  isMutated = true;
                  species = ALL_SPECIES_POOL[Math.floor(Math.random() * ALL_SPECIES_POOL.length)];
                  microcosmAudio.playElixirSplash();
                }
              }
            }

            // Inter-creature soft separation
            state.creatures.forEach((other, j) => {
              if (i !== j) {
                const cdx = px - other.position[0];
                const cdz = pz - other.position[2];
                const cdist = Math.sqrt(cdx * cdx + cdz * cdz);
                if (cdist < 0.45 && cdist > 0.01) {
                  heading += (cdx > 0 ? 0.03 : -0.03);
                }
              }
            });

            let vx = Math.sin(heading) * Math.cos(pitch) * baseSpeed;
            let vy = Math.sin(pitch) * baseSpeed;
            let vz = Math.cos(heading) * Math.cos(pitch) * baseSpeed;

            // Sphere Boundary Turn
            const dist = Math.sqrt(px * px + py * py + pz * pz);
            if (dist > SPHERE_INNER_RADIUS * 0.7) {
              const centerHeading = Math.atan2(-px, -pz);
              let angleDiff = centerHeading - heading;
              while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
              while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
              heading += angleDiff * 0.08;
            }

            px += vx * timeStepScale;
            py += vy * timeStepScale;
            pz += vz * timeStepScale;

            const newDist = Math.sqrt(px * px + py * py + pz * pz);
            if (newDist > SPHERE_INNER_RADIUS) {
              const scale = SPHERE_INNER_RADIUS / newDist;
              px *= scale * 0.95;
              py *= scale * 0.95;
              pz *= scale * 0.95;
              heading += Math.PI * 0.5;
            }

            if (py < -1.35) {
              py = -1.35;
              pitch = Math.max(0, pitch);
            }

            const ateFood = eatenFoodIds.length > 0;
            const newHunger = Math.min(100, Math.max(0, c.hunger - dt * 0.2 + (ateFood ? 40 : 0)));
            const newHappiness = Math.min(100, Math.max(0, c.happiness + (ateFood ? 10 : -dt * 0.05)));

            return {
              ...c,
              species,
              position: [px, py, pz] as [number, number, number],
              velocity: [vx, vy, vz] as [number, number, number],
              heading,
              pitch,
              size: currentSize,
              isMutated,
              hunger: newHunger,
              happiness: newHappiness,
              energy: Math.min(100, Math.max(0, c.energy + (ateFood ? 25 : -dt * 0.1))),
            };
          });

          const finalCreatures = [...updatedCreatures, ...hatchedCreatures];
          const remainingObjects = updatedObjects.filter(
            (o) => !eatenFoodIds.includes(o.id) && !consumedElixirIds.includes(o.id)
          );

          const allSpeciesDiscovered = Array.from(
            new Set([...state.discoveries, ...finalCreatures.map((c) => c.species)])
          );

          return {
            timeOfDay: newTime,
            isDay,
            dayCount: newDayCount,
            stardust: newStardust,
            weather: newWeather,
            weatherTimer: newWeatherTimer,
            shockwaves: updatedShockwaves,
            eggs: survivingEggs,
            creatures: finalCreatures,
            objects: remainingObjects,
            discoveries: allSpeciesDiscovered,
          };
        });
      },
    }),
    {
      name: "microcosm-save-state-v18",
      partialize: (state) => ({
        discoveries: state.discoveries,
        dayCount: state.dayCount,
        stardust: state.stardust,
        biome: state.biome,
      }),
    }
  )
);
