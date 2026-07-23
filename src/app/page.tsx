"use client";

import { useRouter } from "next/navigation";

import Scene from "@/components/scene/Scene";
import ProjectOverlay from "@/components/ui/ProjectOverlay";

import { useFocusStore } from "@/stores/focus";
import { useScrollStore } from "@/lib/scroll";

export default function Home() {
  const router = useRouter();

  const mode = useFocusStore((state) => state.mode);
  const progress = useScrollStore((state) => state.progress);

  const heroOpacity =
    mode === "gallery"
      ? progress < 0.05
        ? 1
        : 1 - progress * 0.4
      : 0;

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <Scene />

      <ProjectOverlay />

      <section
        className="
          absolute
          inset-0
          z-10
          flex
          items-center
          justify-center
          pointer-events-none
        "
      >
        <h1
          onClick={() => router.push("/contact")}
          className="
            pointer-events-auto
            cursor-pointer
            select-none

            text-white
            text-[34px]
            md:text-[42px]
            font-light
            tracking-[-0.03em]

            transition-opacity
            duration-500
          "
          style={{
            opacity: heroOpacity,
          }}
        >
          Philémon Lieutaghi
        </h1>
      </section>
    </main>
  );
}