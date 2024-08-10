import { createStore } from "zustand";
import { KeyboardStoreType } from "./types";
import { generateText } from "./get-text";
import { GameSettingsType } from "@/entities/control-panel";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/shared/utils";

const keyboardStoreBase = createStore<KeyboardStoreType>()(
  immer((set) => ({
    text: [],
    userInput: [],
    addLetter: (letter: string, wordIndex: number, letterIndex: number) => {
      set((state) => {
        if (state.text[wordIndex].length <= letterIndex) {
          state.text[wordIndex].push("extra");
        } else if (state.text[wordIndex][letterIndex] === letter) {
          state.userInput[wordIndex][letterIndex] = "valid";
        } else if (state.text[wordIndex][letterIndex] !== letter) {
          state.userInput[wordIndex][letterIndex] = "invalid";
        } else {
          console.warn("keyboardStoreBase 21:46");
        }
      });
    },
    addWord: () => {
      set((state) => {
        state.userInput.push([]);
      });
    },
    initKeyboard: (settings: GameSettingsType) =>
      set((state) => {
        const generatedText = generateText(settings);
        state.text = generatedText.map((item) => {
          return item.split("");
        });
      }),
  }))
);

export const keyboardStore = createSelectors(keyboardStoreBase);
