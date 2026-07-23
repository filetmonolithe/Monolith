"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, Text } from "@react-three/drei";
import * as THREE from "three";

import { useFocusStore } from "@/stores/focus";

type ArtworkProps = {
  id: string;

  title: string;
  subtitle: string;
  role: string;
  year: string;

  ratio: "16:9" | "9:16" | "4:3" | "1:1";

  image: string;

  position: [number, number, number];
  rotation: [number, number, number];
};

export default function Artwork(props: ArtworkProps) {
  const {
    id,
    title,
    subtitle,
    role,
    year,
    ratio,
    image,
    position,
    rotation,
  } = props;

  const group = useRef<THREE.Group>(null);
  const material = useRef<THREE.MeshBasicMaterial>(null);

  const [hovered, setHovered] = useState(false);

  const {
    mode,
    artwork,
    selectArtwork,
    focusArtwork,
  } = useFocusStore();

  const selected =
    artwork?.id === id &&
    (mode === "selecting" || mode === "focused");

  let width = 10;
  let height = 10;

  switch (ratio) {
    case "16:9":
      width = 16;
      height = 9;
      break;

    case "9:16":
      width = 6;
      height = 10.66;
      break;

    case "4:3":
      width = 12;
      height = 9;
      break;

    case "1:1":
      width = 10;
      height = 10;
      break;
  }

  const texture = useTexture(image);

  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;

  useFrame(() => {
  if (!group.current || !material.current) return;

  let targetScale = 1;
  let targetBrightness = 1;
  let targetOpacity = 1;

  if (mode === "gallery") {
    if (hovered) {
      targetScale = 1.025;
      targetBrightness = 1.15;
    }

    if (selected) {
      targetScale = 1.05;
      targetBrightness = 1.15;
    }
  } else {
    if (selected) {
      targetScale = 1.05;
      targetBrightness = 1.15;
      targetOpacity = 1;
    } else {
      targetScale = 0.995;
targetBrightness = 0.65;
targetOpacity = 0.65;
    }
  }

  group.current.scale.lerp(
    new THREE.Vector3(targetScale, targetScale, targetScale),
    0.08
  );

  material.current.color.lerp(
  new THREE.Color(
    targetBrightness,
    targetBrightness,
    targetBrightness
  ),
  0.08
);

material.current.opacity +=
  (targetOpacity - material.current.opacity) * 0.08;

material.current.transparent = true;
});

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
    >
      <mesh
  onPointerOver={() => {
    if (mode !== "gallery") return;

    document.body.style.cursor = "pointer";
    setHovered(true);
  }}
  onPointerOut={() => {
    document.body.style.cursor = "default";
    setHovered(false);
  }}
  onClick={() => {
    if (mode !== "gallery") return;

    selectArtwork({
      id,
      title,
      subtitle,
      role,
      year,
      ratio,
      image,
      position,
      rotation,
    });

    setTimeout(() => {
      focusArtwork();
    }, 150);
  }}
>

        <planeGeometry args={[width, height]} />

        <meshBasicMaterial
  ref={material}
  map={texture}
  toneMapped={false}
  transparent
  opacity={1}
/>
      </mesh>

     {(mode === "gallery" || selected) && (
  <group position={[-width / 2, -height / 2 - 0.8, 0.01]}>
    <Text
      anchorX="left"
      anchorY="top"
      fontSize={0.34}
      color="white"
    >
      {title}
    </Text>

    <Text
      anchorX="left"
      anchorY="top"
      position={[0, -0.42, 0]}
      fontSize={0.23}
      color="#cfcfcf"
    >
      {subtitle}
    </Text>

    <Text
      anchorX="left"
      anchorY="top"
      position={[0, -0.82, 0]}
      fontSize={0.18}
      color="#8a8a8a"
      maxWidth={width}
    >
      {role}
    </Text>

            <Text
          anchorX="left"
          anchorY="top"
          position={[0, -1.15, 0]}
          fontSize={0.15}
          color="#666666"
        >
          {year}
        </Text>
      </group>
    )}
    </group>
  );
}
