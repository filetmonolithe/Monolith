import { create } from "zustand";

type ScrollState = {
  progress: number;
  setProgress: (value: number) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  setProgress: (value) => set({ progress: value }),
}));
