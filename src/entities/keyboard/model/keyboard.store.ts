import { createStore } from "zustand";
import { KeyboardStoreType } from "./types";
import { generateText } from "./get-text";
import {
  GameModeType,
  GameSettingsType,
  TimePerGame,
} from "@/entities/control-panel";
import { immer } from "zustand/middleware/immer";
import { createSelectors } from "@/shared/utils";

const keyboardStoreBase = createStore<KeyboardStoreType>()(
  immer((set) => ({
    text: [],
    userInput: [],
    currentWordIndex: 0,
    currentLetterIndex: 0,
    startTime: null,
    correctWords: 0,
    wpm: 0,
    gameEnd: false,
    _currentTimer: null,

    setStartTime: (startTime: number) => {
      set((state) => {
        state.startTime = startTime;
      });
    },

    setGameEnd: (gameEnd: boolean) => {
      set((state) => {
        state.gameEnd = gameEnd;
      });
    },
    checkLetter: (letter: string, wordIndex: number, letterIndex: number) => {
      set((state) => {
        // по хорошему логику по старту отсчета времени и тд выделить в функцию
        if (state.startTime === null) {
          state.startTime = Date.now();
        }

        if (state.text[wordIndex].length <= letterIndex) {
          state.text[wordIndex].push(letter);
          state.userInput[wordIndex].push("extra");
          state.currentLetterIndex += 1;
        } else if (state.text[wordIndex][letterIndex] === letter) {
          state.userInput[wordIndex][letterIndex] = "valid";
          state.currentLetterIndex += 1;
          // дополнительно вешаем проверку сюда, что если это
          // последнее слово и все буквы введены, то игры завершается
          if (
            state.currentWordIndex === state.text.length - 1 &&
            state.currentLetterIndex ===
              state.text[state.currentWordIndex].length
          ) {
            state.gameEnd = true;
          }
        } else if (state.text[wordIndex][letterIndex] !== letter) {
          state.userInput[wordIndex][letterIndex] = "invalid";
          state.currentLetterIndex += 1;
        }
      });
    },

    goToNextWord: () => {
      set((state) => {
        const currentWord = state.userInput[state.currentWordIndex];
        const isCorrect =
          currentWord.every((letter) => letter === "valid") &&
          currentWord.length === state.text[state.currentWordIndex].length;

        if (isCorrect) {
          state.correctWords += 1;
        }

        if (state.currentWordIndex !== state.text.length - 1) {
          state.currentWordIndex += 1;
          state.currentLetterIndex = 0;
        } else {
          state.gameEnd = true;
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
          // прошлая буква неправильная
          const isInvalid = letterStatus === "invalid";
          // прошлая буква лишняя
          const isExtra = letterStatus === "extra";
          // прошлое слово незакончено
          const notFullWord =
            state.text[state.currentWordIndex - 1].length !==
            state.userInput[state.currentWordIndex - 1].length;
          if (isInvalid || isExtra || notFullWord) {
            state.currentWordIndex -= 1;
            state.currentLetterIndex =
              state.userInput[state.currentWordIndex].length;
          }
        }
      }),
    calculateWPM: () => {
      set((state) => {
        if (state.startTime) {
          // проверяем последнее число на корректность, если оно правильное - делаем 1
          // чтобы при сумме дальше оно учлось, иначе 0
          const lastWordCorrect = state.userInput[state.currentWordIndex].every(
            (letter) => letter === "valid"
          )
            ? 1
            : 0;
          state.correctWords += lastWordCorrect;

          const elapsedTimeInMinutes = (Date.now() - state.startTime) / 60000;
          state.wpm = Math.round(state.correctWords / elapsedTimeInMinutes);
        } else {
          console.warn("no state start time found to calculate wpm");
        }
      });
    },
    initKeyboard: (settings: GameSettingsType) =>
      set((state) => {
        const generatedText = generateText(settings);
        state.text = generatedText.map((item) => item.split(""));
        state.userInput = new Array(generatedText.length).fill([]);
        state.currentWordIndex = 0;
        state.currentLetterIndex = 0;
        state.startTime = null;
        state.correctWords = 0;
        state.wpm = 0;
        state.gameEnd = false;
        state._currentTimer = null;
      }),
  }))
);

export const keyboardStore = createSelectors(keyboardStoreBase);
