"use client";

import Artwork from "./Artwork";

import { artworks } from "@/data/artworks";
import { useFocusStore } from "@/stores/focus";

export default function World() {
  const { mode, clearFocus } = useFocusStore();

  return (
    <group
      onPointerMissed={() => {
        if (mode !== "gallery") {
          clearFocus();
        }
      }}
    >
      {artworks
        .filter((artwork) => artwork.enabled)
        .map((artwork) => (
          <Artwork
            key={artwork.id}
            id={artwork.id}
            title={artwork.title}
            subtitle={artwork.subtitle}
            role={artwork.role}
            year={artwork.year}
            ratio={artwork.ratio}
            image={artwork.image}
            position={artwork.position}
            rotation={artwork.rotation}
          />
        ))}
    </group>
  );
}
