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
    currentWordIndex: 0,
    currentLetterIndex: 0,
    checkLetter: (letter: string, wordIndex: number, letterIndex: number) => {
      set((state) => {
        if (state.text[wordIndex].length <= letterIndex) {
          state.text[wordIndex].push(letter);
          state.userInput[wordIndex].push("extra");
          state.currentLetterIndex += 1;
        } else if (state.text[wordIndex][letterIndex] === letter) {
          state.userInput[wordIndex][letterIndex] = "valid";
          state.currentLetterIndex += 1;
        } else if (state.text[wordIndex][letterIndex] !== letter) {
          state.userInput[wordIndex][letterIndex] = "invalid";
          state.currentLetterIndex += 1;
        } else {
          console.warn("keyboardStoreBase 21:46");
        }
      });
    },
    goToNextWord: () => {
      set((state) => {
        if (state.currentWordIndex !== state.text.length - 1) {
          state.currentWordIndex += 1;
          state.currentLetterIndex = 0;
        }
      });
    },
    removeLetter: () =>
      set((state) => {
        // тут рассматриваем 2 кейса, если индекс больше 0, то мы просто удаляем букву
        if (state.currentLetterIndex > 0) {
          const removedLetterStatus =
            state.userInput[state.currentWordIndex].pop();
          if (removedLetterStatus === "extra") {
            state.text[state.currentWordIndex].pop();
          }
          state.currentLetterIndex -= 1;
        } else if (
          state.currentLetterIndex === 0 &&
          state.currentWordIndex > 0
        ) {
          // если у нас индекс 0, и при этом последняя буква в прошлом слове неправильная,
          //  то даем возможность вернуться
          const letterStatus =
            state.userInput[state.currentWordIndex - 1][
              state.userInput[state.currentWordIndex - 1].length - 1
            ];
          if (letterStatus === "invalid") {
            state.currentWordIndex -= 1;
            state.currentLetterIndex =
              state.text[state.currentWordIndex].length;
          }
        }
      }),
    initKeyboard: (settings: GameSettingsType) =>
      set((state) => {
        const generatedText = generateText(settings);
        state.text = generatedText.map((item) => {
          return item.split("");
        });
        state.userInput = new Array(generatedText.length).fill([]);
        state.currentWordIndex = 0;
      }),
  }))
);

export const keyboardStore = createSelectors(keyboardStoreBase);
