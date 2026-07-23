"use client";

import { Center, Text3D } from "@react-three/drei";

export default function Title() {
  return (
    <Center position={[0, 0, -250]}>
      <Text3D
        font="/fonts/Switzer_Regular.json"
        size={10}
        height={0.01}
        curveSegments={16}
      >
        Philémon Lieutaghi

        <meshStandardMaterial
          color="white"
          metalness={0.15}
          roughness={0.6}
        />
      </Text3D>
    </Center>
  );
}
