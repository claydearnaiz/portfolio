"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMicrocosmStore } from "../store/useMicrocosmStore";

// Procedural Low-Poly Seaweed Component
const ProceduralSeaweed: React.FC<{ height?: number; color?: string }> = ({ height = 0.65, color = "#22c55e" }) => {
  return (
    <group>
      {/* Central Kelp Stem */}
      <mesh position={[0, height * 0.5, 0]}>
        <cylinderGeometry args={[0.015, 0.03, height, 5]} />
        <meshStandardMaterial color={color} roughness={0.6} flatShading />
      </mesh>

      {/* Side Kelp Leaves */}
      <mesh position={[0.04, height * 0.4, 0.02]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.01, 0.02, height * 0.5, 4]} />
        <meshStandardMaterial color={color} roughness={0.6} flatShading />
      </mesh>
      <mesh position={[-0.04, height * 0.6, -0.02]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.01, 0.02, height * 0.4, 4]} />
        <meshStandardMaterial color={color} roughness={0.6} flatShading />
      </mesh>
    </group>
  );
};

// Procedural Low-Poly Rock Component
const ProceduralRock: React.FC<{ size?: number; color?: string }> = ({ size = 0.35, color = "#57534e" }) => {
  return (
    <group position={[0, size * 0.35, 0]}>
      {/* Primary Faceted Boulder */}
      <mesh rotation={[Math.PI / 6, Math.PI / 4, 0]}>
        <dodecahedronGeometry args={[size * 0.5, 1]} />
        <meshStandardMaterial color={color} roughness={0.85} flatShading />
      </mesh>
      {/* Secondary Accent Pebble */}
      <mesh position={[size * 0.35, -size * 0.1, size * 0.2]} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <dodecahedronGeometry args={[size * 0.25, 0]} />
        <meshStandardMaterial color="#78716c" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
};

// Procedural Low-Poly Sunken Boat Ruins Component
const ProceduralSunkenBoat: React.FC<{ size?: number }> = ({ size = 0.55 }) => {
  return (
    <group position={[0, size * 0.25, 0]} rotation={[0.2, 0.4, -0.15]}>
      {/* Boat Wooden Hull */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size * 0.35, size * 0.22, size * 0.8]} />
        <meshStandardMaterial color="#78350f" roughness={0.9} flatShading />
      </mesh>
      {/* Boat Cabin Frame */}
      <mesh position={[0, size * 0.18, -size * 0.15]}>
        <boxGeometry args={[size * 0.25, size * 0.20, size * 0.3]} />
        <meshStandardMaterial color="#92400e" roughness={0.9} flatShading />
      </mesh>
      {/* Broken Wooden Mast */}
      <mesh position={[0, size * 0.3, size * 0.1]} rotation={[0.3, 0, 0.2]}>
        <cylinderGeometry args={[0.015, 0.025, size * 0.6, 5]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
};

// Procedural Low-Poly Sunken Wooden Dock Component
const ProceduralSunkenDock: React.FC<{ size?: number }> = ({ size = 0.55 }) => {
  return (
    <group position={[0, size * 0.15, 0]} rotation={[-0.1, 0.2, 0.05]}>
      {/* Wooden Dock Planks */}
      <mesh position={[0, size * 0.15, 0]}>
        <boxGeometry args={[size * 0.4, size * 0.06, size * 0.85]} />
        <meshStandardMaterial color="#78350f" roughness={0.95} flatShading />
      </mesh>
      {/* Vertical Dock Support Posts */}
      <mesh position={[size * 0.16, 0, size * 0.35]}>
        <cylinderGeometry args={[0.02, 0.025, size * 0.4, 5]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} flatShading />
      </mesh>
      <mesh position={[-size * 0.16, 0, size * 0.35]}>
        <cylinderGeometry args={[0.02, 0.025, size * 0.4, 5]} />
        <meshStandardMaterial color="#451a03" roughness={0.9} flatShading />
      </mesh>
    </group>
  );
};

export const EcosystemTerrain: React.FC = () => {
  const objects = useMicrocosmStore((s) => s.objects);
  const eggs = useMicrocosmStore((s) => s.eggs);
  const shockwaves = useMicrocosmStore((s) => s.shockwaves);
  const biome = useMicrocosmStore((s) => s.biome);
  const weather = useMicrocosmStore((s) => s.weather);
  const laserPosition = useMicrocosmStore((s) => s.laserPosition);

  const plantRefs = useRef<(THREE.Group | null)[]>([]);
  const bubbleRef = useRef<THREE.Points>(null);
  const floatingRef = useRef<THREE.Points>(null);

  const biomeStyles = useMemo(() => {
    switch (biome) {
      case "Cosmic Nebula":
        return { sand: "#2e1065", rock: "#4c1d95", plant: "#a855f7", particle: "#c084fc", emissive: "#a855f7" };
      case "Hydrothermal Vent":
        return { sand: "#451a03", rock: "#78350f", plant: "#f97316", particle: "#fbbf24", emissive: "#ea580c" };
      case "Emerald Reef":
        return { sand: "#064e3b", rock: "#065f46", plant: "#34d399", particle: "#a7f3d0", emissive: "#10b981" };
      case "Deep Abyssal":
      default:
        return { sand: "#3b2d23", rock: "#57534e", plant: "#22c55e", particle: "#94a3b8", emissive: "#16a34a" };
    }
  }, [biome]);

  // Sand Particles
  const sandParticles = useMemo(() => {
    const pos = new Float32Array(220 * 3);
    for (let i = 0; i < 220; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 1.5;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = -1.43 + Math.random() * 0.12;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, []);

  // Floating particles
  const floatingParticles = useMemo(() => {
    const count = weather === "biostorm" ? 240 : 110;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 0.2 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7 - 0.2;
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [weather]);

  // Bubbles
  const bubblePositions = useMemo(() => {
    const pos = new Float32Array(32 * 3);
    for (let i = 0; i < 32; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 2.2;
      pos[i * 3 + 1] = -1.3 + Math.random() * 2.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.2;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    plantRefs.current.forEach((ref, idx) => {
      if (ref) {
        ref.rotation.z = Math.sin(t * 0.7 + idx * 1.2) * 0.08;
      }
    });

    if (bubbleRef.current) {
      const geo = bubbleRef.current.geometry;
      const posAttr = geo.getAttribute("position");
      if (posAttr) {
        for (let i = 0; i < posAttr.count; i++) {
          let y = posAttr.getY(i);
          y += 0.004 + Math.sin(t + i) * 0.001;
          if (y > 1.6) y = -1.3;
          posAttr.setY(i, y);
        }
        posAttr.needsUpdate = true;
      }
    }

    if (floatingRef.current) {
      floatingRef.current.rotation.y = t * 0.02;
    }
  });

  const plants = objects.filter((o) => o.type === "plant");
  const rocks = objects.filter((o) => o.type === "rock");
  const food = objects.filter((o) => o.type === "food");
  const elixirs = objects.filter((o) => o.type === "elixir");
  const corals = objects.filter((o) => o.type === "coral");
  const lavas = objects.filter((o) => o.type === "lava");
  const mushrooms = objects.filter((o) => o.type === "mushroom");
  const crystals = objects.filter((o) => o.type === "crystal");

  return (
    <group>
      {/* Sandy Seabed Floor (3.4u Diameter) */}
      <mesh position={[0, -1.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.7, 48]} />
        <meshStandardMaterial color={biomeStyles.sand} roughness={0.95} flatShading />
      </mesh>

      {/* Bowl Under-Cap Dome */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[2.74, 32, 16, 0, Math.PI * 2, Math.PI * 0.62, Math.PI * 0.38]} />
        <meshStandardMaterial color={biomeStyles.sand} roughness={0.95} side={THREE.DoubleSide} flatShading />
      </mesh>

      {/* Sand Particles */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={220} array={sandParticles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={biomeStyles.sand} size={0.016} transparent opacity={0.5} />
      </points>

      {/* Floating Particles */}
      <points ref={floatingRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={floatingParticles.length / 3} array={floatingParticles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color={biomeStyles.particle} size={0.014} transparent opacity={0.45} />
      </points>

      {/* Bubbles */}
      <points ref={bubbleRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={30} array={bubblePositions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#bae6fd" size={0.025} transparent opacity={0.5} sizeAttenuation />
      </points>

      {/* Procedural Rocks */}
      {rocks.map((obj) => (
        <group key={obj.id} position={[obj.position[0], -1.45, obj.position[2]]}>
          <ProceduralRock size={0.35} color={biomeStyles.rock} />
        </group>
      ))}

      {/* Procedural Seaweed Plants */}
      {plants.map((obj, idx) => (
        <group
          key={obj.id}
          ref={(el) => { plantRefs.current[idx] = el; }}
          position={[obj.position[0], -1.45, obj.position[2]]}
        >
          <ProceduralSeaweed height={0.65} color={biomeStyles.plant} />
        </group>
      ))}

      {/* Sunken Boat */}
      {corals.map((obj) => (
        <group key={obj.id} position={[obj.position[0], -1.45, obj.position[2]]}>
          <ProceduralSunkenBoat size={0.55} />
        </group>
      ))}

      {/* Sunken Dock */}
      {lavas.map((obj) => (
        <group key={obj.id} position={[obj.position[0], -1.45, obj.position[2]]}>
          <ProceduralSunkenDock size={0.55} />
        </group>
      ))}

      {/* Mushrooms */}
      {mushrooms.map((obj) => (
        <group key={obj.id} position={[obj.position[0], -1.45, obj.position[2]]}>
          <mesh position={[0, 0.2, 0]}>
            <coneGeometry args={[0.12, 0.35, 6]} />
            <meshStandardMaterial color="#f43f5e" roughness={0.5} flatShading />
          </mesh>
        </group>
      ))}

      {/* Crystals */}
      {crystals.map((obj) => (
        <group key={obj.id} position={[obj.position[0], -1.45, obj.position[2]]}>
          <mesh position={[0, 0.22, 0]}>
            <octahedronGeometry args={[0.16, 0]} />
            <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={0.6} flatShading />
          </mesh>
        </group>
      ))}

      {/* Food Particles */}
      {food.map((obj) => (
        <mesh key={obj.id} position={obj.position}>
          <octahedronGeometry args={[0.045, 0]} />
          <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} roughness={0.2} flatShading />
        </mesh>
      ))}

      {/* Mutagen Elixirs */}
      {elixirs.map((obj) => (
        <group key={obj.id} position={obj.position}>
          <mesh>
            <octahedronGeometry args={[0.07, 0]} />
            <meshStandardMaterial color="#c084fc" emissive="#a855f7" emissiveIntensity={0.9} flatShading />
          </mesh>
        </group>
      ))}

      {/* Eggs */}
      {eggs.map((egg) => (
        <group key={egg.id} position={egg.position}>
          <mesh>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshStandardMaterial color="#ec4899" emissive="#f43f5e" emissiveIntensity={0.7} flatShading />
          </mesh>
        </group>
      ))}

      {/* Shockwave Rings */}
      {shockwaves.map((sw) => (
        <mesh key={sw.id} position={sw.position} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[sw.radius, sw.radius + 0.03, 32]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={Math.max(0, 1 - sw.radius / sw.maxRadius)}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Laser Pointer Light Beam */}
      {laserPosition && (
        <group position={laserPosition}>
          <mesh>
            <octahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          <pointLight color="#ef4444" intensity={2} distance={1.8} />
        </group>
      )}
    </group>
  );
};
