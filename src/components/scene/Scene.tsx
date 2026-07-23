"use client";

import { Canvas } from "@react-three/fiber";

import CameraRig from "./Camera";
import World from "./World";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 5],
        fov: 75,
        near: 0.1,
        far: 1000,
      }}
    >
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={1} />

      <CameraRig />

      <World />
    </Canvas>
  );
}
