"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MicrocosmCreature, useMicrocosmStore } from "../store/useMicrocosmStore";

interface FishEntityProps {
  creature: MicrocosmCreature;
}

// Procedural Low-Poly Color Schemes for Species
const SPECIES_COLOR_MAP: Record<string, { body: string; fins: string; stripe?: string }> = {
  "Clownfish": { body: "#f97316", fins: "#ea580c", stripe: "#ffffff" },
  "Blue Tang": { body: "#0284c7", fins: "#facc15", stripe: "#1e3a8a" },
  "Yellow Tang": { body: "#eab308", fins: "#fde047" },
  "Betta": { body: "#ec4899", fins: "#a855f7", stripe: "#f43f5e" },
  "Anglerfish": { body: "#475569", fins: "#334155", stripe: "#fbbf24" },
  "Lionfish": { body: "#dc2626", fins: "#f87171", stripe: "#fef08a" },
  "Goldfish": { body: "#f97316", fins: "#fb923c" },
  "Koi": { body: "#f87171", fins: "#ffffff", stripe: "#dc2626" },
  "Puffer": { body: "#fde047", fins: "#eab308" },
  "Shark": { body: "#64748b", fins: "#475569" },
  "Swordfish": { body: "#38bdf8", fins: "#0284c7" },
  "Blobfish": { body: "#f472b6", fins: "#fb7185" },
  "Mandarin Fish": { body: "#06b6d4", fins: "#3b82f6", stripe: "#f97316" },
  "Piranha": { body: "#475569", fins: "#ef4444" },
  "Moorish Idol": { body: "#facc15", fins: "#000000", stripe: "#ffffff" },
  "Butterfly Fish": { body: "#fef08a", fins: "#eab308", stripe: "#000000" },
  "Royal Gramma": { body: "#a855f7", fins: "#facc15" },
  "Tetra": { body: "#38bdf8", fins: "#ef4444" },
  "Sunfish": { body: "#94a3b8", fins: "#64748b" },
  "Blue Goldfish": { body: "#38bdf8", fins: "#0284c7" },
  "Black Lion Fish": { body: "#1e293b", fins: "#475569" },
  "Coral Grouper": { body: "#ef4444", fins: "#b91c1c", stripe: "#fbbf24" },
  "Cowfish": { body: "#facc15", fins: "#eab308" },
  "Flatfish": { body: "#78350f", fins: "#92400e" },
  "Flower Horn": { body: "#f43f5e", fins: "#fb7185", stripe: "#a855f7" },
  "Goblin Shark": { body: "#94a3b8", fins: "#64748b" },
  "Humphead": { body: "#0d9488", fins: "#14b8a6" },
  "Parrot Fish": { body: "#10b981", fins: "#34d399", stripe: "#f43f5e" },
  "Red Snapper": { body: "#f87171", fins: "#ef4444" },
  "Tuna": { body: "#2563eb", fins: "#1d4ed8" },
  "Turbot": { body: "#57534e", fins: "#78716c" },
  "Zebra Clown Fish": { body: "#171717", fins: "#404040", stripe: "#ffffff" },
};

// Procedural Low-Poly 3D Fish Mesh Component (Zero GLB dependencies, 100% predictable 0.28u size)
const ProceduralLowPolyFish: React.FC<{ species: string; isMutated?: boolean }> = ({ species, isMutated }) => {
  const colors = SPECIES_COLOR_MAP[species] || { body: "#f97316", fins: "#ea580c" };

  return (
    <group rotation={[0, Math.PI / 2, 0]}>
      {/* Tapered Low-Poly Body */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.065, 0.26, 6]} />
        <meshStandardMaterial color={colors.body} roughness={0.3} flatShading />
      </mesh>

      {/* Decorative Species Stripe */}
      {colors.stripe && (
        <mesh position={[0, 0, 0.02]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.067, 0.067, 0.05, 6]} />
          <meshStandardMaterial color={colors.stripe} roughness={0.4} flatShading />
        </mesh>
      )}

      {/* Low-Poly Animated Tail Fin */}
      <group position={[0, 0, -0.15]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.06, 0.12, 3]} />
          <meshStandardMaterial color={colors.fins} roughness={0.4} flatShading />
        </mesh>
      </group>

      {/* Top Dorsal Fin */}
      <mesh position={[0, 0.07, -0.02]} rotation={[Math.PI / 4, 0, 0]}>
        <coneGeometry args={[0.025, 0.10, 3]} />
        <meshStandardMaterial color={colors.fins} roughness={0.4} flatShading />
      </mesh>

      {/* Left Pectoral Fin */}
      <mesh position={[0.055, -0.02, 0.03]} rotation={[0, Math.PI / 4, -Math.PI / 4]}>
        <coneGeometry args={[0.02, 0.07, 3]} />
        <meshStandardMaterial color={colors.fins} roughness={0.4} flatShading />
      </mesh>

      {/* Right Pectoral Fin */}
      <mesh position={[-0.055, -0.02, 0.03]} rotation={[0, -Math.PI / 4, Math.PI / 4]}>
        <coneGeometry args={[0.02, 0.07, 3]} />
        <meshStandardMaterial color={colors.fins} roughness={0.4} flatShading />
      </mesh>

      {/* Cute Low-Poly Eyes */}
      <mesh position={[0.045, 0.015, 0.08]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
      <mesh position={[-0.045, 0.015, 0.08]}>
        <sphereGeometry args={[0.014, 8, 8]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>

      {/* Mutagen Overlay Halo */}
      {isMutated && (
        <mesh>
          <octahedronGeometry args={[0.15, 1]} />
          <meshBasicMaterial color="#c084fc" transparent opacity={0.35} wireframe />
        </mesh>
      )}
    </group>
  );
};

export const FishEntity: React.FC<FishEntityProps> = ({ creature }) => {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);

  const setSelectedCreatureId = useMicrocosmStore((s) => s.setSelectedCreatureId);
  const selectedId = useMicrocosmStore((s) => s.selectedCreatureId);
  const isSelected = selectedId === creature.id;

  const posRef = useRef(new THREE.Vector3(...creature.position));
  const animationPhase = useRef(Math.random() * Math.PI * 2);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Smooth position interpolation
    posRef.current.lerp(new THREE.Vector3(...creature.position), 0.15);
    groupRef.current.position.copy(posRef.current);

    // Smooth heading angle lerping
    const targetYaw = creature.heading || 0;
    const targetPitch = -(creature.pitch || 0);

    let curYaw = groupRef.current.rotation.y;
    let diffYaw = targetYaw - curYaw;
    while (diffYaw > Math.PI) diffYaw -= Math.PI * 2;
    while (diffYaw < -Math.PI) diffYaw += Math.PI * 2;

    groupRef.current.rotation.y += diffYaw * 0.1;
    groupRef.current.rotation.x += (targetPitch - groupRef.current.rotation.x) * 0.1;

    // Body swimming sway
    animationPhase.current += 0.12;
    if (bodyRef.current) {
      bodyRef.current.rotation.y = Math.sin(t * 3.5 + animationPhase.current) * 0.08;
    }
  });

  return (
    <group
      ref={groupRef}
      name={`FishEntity_${creature.id}`}
      scale={[1, 1, 1]}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedCreatureId(creature.id);
      }}
    >
      <group ref={bodyRef} name="FishBodyGroup">
        <ProceduralLowPolyFish species={creature.species} isMutated={creature.isMutated} />
      </group>

      {/* Selection Halo Ring */}
      {isSelected && (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.18, 0.22, 32]} />
            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
          <pointLight color="#38bdf8" intensity={1.5} distance={1.0} />
        </group>
      )}
    </group>
  );
};
