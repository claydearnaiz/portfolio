"use client";

import React, { useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { GlassSphere } from "../world/GlassSphere";
import { EcosystemTerrain } from "../world/EcosystemTerrain";
import { EnvironmentLighting } from "../world/EnvironmentLighting";
import { FishEntity } from "../entities/FishEntity";
import { useMicrocosmStore } from "../store/useMicrocosmStore";

const SimulationTick: React.FC = () => {
  const updateSimulation = useMicrocosmStore((s) => s.updateSimulation);

  useFrame((_, delta) => {
    updateSimulation(Math.min(delta, 0.05));
  });

  return null;
};

const CreatureLayer: React.FC = () => {
  const creatures = useMicrocosmStore((s) => s.creatures);

  return (
    <>
      {creatures.map((creature) => (
        <FishEntity key={creature.id} creature={creature} />
      ))}
    </>
  );
};

// Pointer interaction handler for Laser, Shockwave, Floating & Ground Tool Placements
const InteractionPlane: React.FC = () => {
  const activeTool = useMicrocosmStore((s) => s.activeTool);
  const setLaserPosition = useMicrocosmStore((s) => s.setLaserPosition);
  const triggerShockwave = useMicrocosmStore((s) => s.triggerShockwave);
  const spawnObject = useMicrocosmStore((s) => s.spawnObject);
  const spawnFish = useMicrocosmStore((s) => s.spawnFish);
  const setSelectedCreatureId = useMicrocosmStore((s) => s.setSelectedCreatureId);

  const handlePointerMove = (e: { point: THREE.Vector3 }) => {
    if (activeTool === "laser") {
      setLaserPosition([e.point.x, e.point.y, e.point.z]);
    }
  };

  const handleSphereClick = (e: { point: THREE.Vector3; stopPropagation: () => void }) => {
    e.stopPropagation();
    const pos: [number, number, number] = [e.point.x, e.point.y, e.point.z];

    if (activeTool === "shockwave") {
      triggerShockwave(pos);
    } else if (activeTool === "food") {
      spawnObject("food", pos);
    } else if (activeTool === "elixir") {
      spawnObject("elixir", pos);
    } else if (activeTool === "fish") {
      spawnFish(pos);
    } else if (activeTool === "move") {
      setSelectedCreatureId(null);
    }
  };

  const handleGroundClick = (e: { point: THREE.Vector3; stopPropagation: () => void }) => {
    e.stopPropagation();
    const pos: [number, number, number] = [e.point.x, -1.35, e.point.z];

    if (activeTool === "plant") {
      spawnObject("plant", pos);
    } else if (activeTool === "rock") {
      spawnObject("rock", pos);
    }
  };

  const isGroundTool = activeTool === "plant" || activeTool === "rock";

  return (
    <>
      {/* Seabed Floor Interaction Plane for Rock & Plant placement */}
      {isGroundTool ? (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1.35, 0]}
          visible={false}
          onClick={handleGroundClick}
        >
          <planeGeometry args={[10, 10]} />
        </mesh>
      ) : (
        /* Inner Sphere Interaction Shell (R = 1.25) so clicks stay strictly inside sphere */
        <mesh
          visible={false}
          onPointerMove={handlePointerMove}
          onClick={handleSphereClick}
        >
          <sphereGeometry args={[1.25, 32, 32]} />
          <meshBasicMaterial side={THREE.DoubleSide} />
        </mesh>
      )}
    </>
  );
};

const ResizeHandler: React.FC = () => {
  const { gl } = useThree();

  useEffect(() => {
    const handleResize = () => {
      gl.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [gl]);

  return null;
};

export const MicrocosmCanvas: React.FC = () => {
  const activeTool = useMicrocosmStore((s) => s.activeTool);

  return (
    <Canvas
      camera={{ position: [0, 1.2, 6.8], fov: 45, near: 0.1, far: 100 }}
      style={{ width: "100vw", height: "100vh" }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      dpr={[1, 1.5]}
    >
      <EnvironmentLighting />
      <SimulationTick />
      <ResizeHandler />
      <InteractionPlane />

      <GlassSphere />
      <EcosystemTerrain />
      <CreatureLayer />

      <OrbitControls
        enabled={activeTool === "move" || activeTool === "laser"}
        enablePan={false}
        enableZoom
        minDistance={3.8}
        maxDistance={12}
        autoRotate={activeTool === "move"}
        autoRotateSpeed={0.18}
        dampingFactor={0.06}
        enableDamping
        maxPolarAngle={Math.PI * 0.78}
        minPolarAngle={Math.PI * 0.15}
      />
    </Canvas>
  );
};
