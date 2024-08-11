import { createStore } from "zustand";
import { ControlPanelStoreType } from "./types";
import { createSelectors } from "@/shared/utils";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

const controlPanelStoreBase = createStore<ControlPanelStoreType>()(
  persist(
    immer((set) => ({
      currentGameMode: "time",
      timePerGame: 15,
      wordsPerGame: 15,
      modificators: {
        numbers: false,
        punctuation: false,
      },
      toggleGameModificator: (modificator) =>
        set((state) => {
          state.modificators[modificator] = !state.modificators[modificator];
        }),
      setCurrentGameMode: (newMode) =>
        set((state) => {
          state.currentGameMode = newMode;
        }),
      setTimePerGame: (newTime) =>
        set((state) => {
          state.timePerGame = newTime;
        }),
      setWordsPerGame: (newWords) =>
        set((state) => {
          state.wordsPerGame = newWords;
        }),
    })),
    {
      name: "control-panel-store",
    }
  )
);

export const controlPanelStore = createSelectors(controlPanelStoreBase);
