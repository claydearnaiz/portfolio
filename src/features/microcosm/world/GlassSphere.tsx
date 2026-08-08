"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const GlassSphere: React.FC = () => {
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (innerRef.current) {
      innerRef.current.rotation.y = clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <group>
      {/* Glass Sphere Shell (Radius 2.8) */}
      <mesh>
        <sphereGeometry args={[2.8, 64, 64]} />
        <meshPhysicalMaterial
          color="#bae6fd"
          transparent
          opacity={0.07}
          roughness={0.02}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.02}
          transmission={0.92}
          thickness={0.4}
          ior={1.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Glass Inner Rim Wireframe Highlight */}
      <mesh ref={innerRef}>
        <sphereGeometry args={[2.79, 36, 36]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.025}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Equatorial Glass Rim Accent Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.81, 0.008, 8, 64]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.12} />
      </mesh>
    </group>
  );
};
