"use client";

import { useEffect, useRef } from "react";

import { artworks } from "@/data/artworks";
import { useFocusStore } from "@/stores/focus";

export default function ProjectOverlay() {
  const {
    mode,
    artwork,
    clearFocus,
    selectArtwork,
    focusArtwork,
  } = useFocusStore();

  const navigationLocked = useRef(false);

  useEffect(() => {
    if (mode === "gallery" || !artwork) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (navigationLocked.current) return;

      const currentIndex = artworks.findIndex(
        (item) => item.id === artwork.id
      );

      if (currentIndex === -1) return;

      if (event.key === "ArrowRight") {
        event.preventDefault();

        navigationLocked.current = true;

        const next =
          artworks[(currentIndex + 1) % artworks.length];

        selectArtwork(next);

        requestAnimationFrame(() => {
          focusArtwork();

          setTimeout(() => {
            navigationLocked.current = false;
          }, 350);
        });
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();

        navigationLocked.current = true;

        const previous =
          artworks[
            (currentIndex - 1 + artworks.length) %
              artworks.length
          ];

        selectArtwork(previous);

        requestAnimationFrame(() => {
          focusArtwork();

          setTimeout(() => {
            navigationLocked.current = false;
          }, 350);
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    mode,
    artwork,
    selectArtwork,
    focusArtwork,
  ]);

  if (mode === "gallery" || !artwork) return null;

  return (
    <aside
      className="
        fixed
        bottom-12
        right-12
        z-50

        w-[320px]

        text-white

        transition-all
        duration-500
      "
    >
      <h2 className="text-2xl font-light tracking-tight">
        {artwork.title}
      </h2>

      <p className="mt-1 text-neutral-300">
        {artwork.subtitle}
      </p>

      <p className="mt-6 text-sm text-neutral-400">
        {artwork.role}
      </p>

      <p className="mt-2 text-sm text-neutral-500">
        {artwork.year}
      </p>

      <button
        onClick={clearFocus}
        className="
          mt-10
          ml-auto
          block

          text-sm

          opacity-70
          hover:opacity-100

          transition
        "
      >
        ← Back
      </button>
    </aside>
  );
}
