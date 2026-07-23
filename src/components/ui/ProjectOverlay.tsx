"use client";

import { useFocusStore } from "@/stores/focus";

export default function ProjectOverlay() {
  const { mode, artwork, clearFocus } = useFocusStore();

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
