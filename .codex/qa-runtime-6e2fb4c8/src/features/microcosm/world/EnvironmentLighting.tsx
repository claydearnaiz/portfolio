"use client";

import React, { useMemo } from "react";
import { useMicrocosmStore } from "../store/useMicrocosmStore";

export const EnvironmentLighting: React.FC = () => {
  const isDay = useMicrocosmStore((s) => s.isDay);
  const timeOfDay = useMicrocosmStore((s) => s.timeOfDay);
  const biome = useMicrocosmStore((s) => s.biome);
  const weather = useMicrocosmStore((s) => s.weather);

  const sunAngle = ((timeOfDay - 6) / 12) * Math.PI;

  const lightingTheme = useMemo(() => {
    if (weather === "eclipse") {
      return { bg: "#020208", ambient: "#1e1b4b", dir: "#4338ca", point: "#818cf8" };
    }
    if (weather === "biostorm") {
      return { bg: "#0f0728", ambient: "#4c1d95", dir: "#c084fc", point: "#f43f5e" };
    }
    if (weather === "bloom") {
      return { bg: "#022c22", ambient: "#065f46", dir: "#34d399", point: "#6ee7b7" };
    }

    switch (biome) {
      case "Cosmic Nebula":
        return { bg: "#09031a", ambient: "#3b0764", dir: "#c084fc", point: "#e879f9" };
      case "Hydrothermal Vent":
        return { bg: "#120701", ambient: "#451a03", dir: "#f97316", point: "#fbbf24" };
      case "Emerald Reef":
        return { bg: "#011f18", ambient: "#064e3b", dir: "#34d399", point: "#6ee7b7" };
      case "Deep Abyssal":
      default:
        return { bg: isDay ? "#031424" : "#02050e", ambient: isDay ? "#dbeafe" : "#1e1b4b", dir: isDay ? "#fef08a" : "#6366f1", point: "#38bdf8" };
    }
  }, [biome, weather, isDay]);

  return (
    <>
      <color attach="background" args={[lightingTheme.bg]} />

      <ambientLight intensity={isDay ? 0.45 : 0.15} color={lightingTheme.ambient} />

      <directionalLight
        position={[
          Math.cos(sunAngle) * 5,
          4 + Math.sin(sunAngle) * 3,
          3,
        ]}
        intensity={weather === "eclipse" ? 0.08 : isDay ? 1.3 : 0.22}
        color={lightingTheme.dir}
        castShadow
      />

      <directionalLight
        position={[-4, -2, -5]}
        intensity={0.15}
        color="#38bdf8"
      />

      <pointLight
        position={[0, -0.8, 0]}
        intensity={weather === "eclipse" ? 1.5 : isDay ? 0.25 : 0.85}
        color={lightingTheme.point}
        distance={6}
      />
    </>
  );
};
