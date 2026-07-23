import { create } from "zustand";

export type FocusMode =
  | "gallery"
  | "selecting"
  | "focused";

export type FocusedArtwork = {
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

type FocusStore = {
  mode: FocusMode;

  artwork: FocusedArtwork | null;

  selectArtwork: (artwork: FocusedArtwork) => void;

  focusArtwork: () => void;

  clearFocus: () => void;
};

export const useFocusStore = create<FocusStore>((set) => ({
  mode: "gallery",

  artwork: null,

  selectArtwork: (artwork) =>
    set({
      artwork,
      mode: "selecting",
    }),

  focusArtwork: () =>
    set({
      mode: "focused",
    }),

  clearFocus: () =>
    set({
      artwork: null,
      mode: "gallery",
    }),
}));
