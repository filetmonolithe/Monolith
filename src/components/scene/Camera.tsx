"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { useScrollStore } from "@/lib/scroll";
import { useFocusStore } from "@/stores/focus";

export default function CameraRig() {
  const { artwork, mode } = useFocusStore();

  const setProgress = useScrollStore(
    (state) => state.setProgress
  );

  // Position scroll de la galerie
  const scrollZ = useRef(5);

  // Cibles de la caméra
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));
  const targetLook = useRef(new THREE.Vector3(0, 0, -100));

  // LookAt interpolé
  const currentLook = useRef(new THREE.Vector3(0, 0, -100));

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (mode !== "gallery") return;

      scrollZ.current += e.deltaY * 0.03;

      scrollZ.current = Math.min(
        5,
        Math.max(-500, scrollZ.current)
      );
    };

    window.addEventListener("wheel", onWheel);

    return () => window.removeEventListener("wheel", onWheel);
  }, [mode]);

  useFrame(({ camera }, delta) => {
    // -------------------------------
    // GALLERY
    // -------------------------------

    if (mode === "gallery") {
      targetPosition.current.set(
  0,
  0,
  scrollZ.current
);

targetLook.current.set(
  0,
  0,
  scrollZ.current - 100
);

      const progress = Math.min(
        1,
        Math.max(0, (5 - camera.position.z) / 25)
      );

      setProgress(progress);
    }

    // -------------------------------
    // FOCUS
    // -------------------------------

    if ((mode === "focused" || mode === "selecting") && artwork) {
      const distance = artwork.ratio === "16:9"
        ? 14
        : artwork.ratio === "4:3"
        ? 13
        : 11;

      // Normale du panneau
      const normal = new THREE.Vector3(0, 0, 1);

      normal.applyEuler(
        new THREE.Euler(
          artwork.rotation[0],
          artwork.rotation[1],
          artwork.rotation[2]
        )
      );

      const cameraPos = new THREE.Vector3(
        artwork.position[0],
        artwork.position[1],
        artwork.position[2]
      ).add(normal.multiplyScalar(distance));

      targetPosition.current.copy(cameraPos);

      targetLook.current.set(
        artwork.position[0],
        artwork.position[1],
        artwork.position[2]
      );
    }

    // -------------------------------
    // CAMERA
    // -------------------------------

    const positionSpeed =
      mode === "gallery" ? 0.08 : 0.055;

    const lookSpeed =
      mode === "gallery" ? 0.12 : 0.08;

    camera.position.lerp(
      targetPosition.current,
      positionSpeed
    );

    currentLook.current.lerp(
      targetLook.current,
      lookSpeed
    );

    camera.lookAt(currentLook.current);
  });

  return null;
}
