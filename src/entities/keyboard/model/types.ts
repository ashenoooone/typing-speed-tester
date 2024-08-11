import { GameSettingsType } from "@/entities/control-panel";

// статус буквы у нас может быть - валидная, невалидная, лишняя
export type LetterStatus = "valid" | "invalid" | "extra" | "default";

export type KeyboardStoreType = {
  text: Array<string[]>;
  userInput: Array<LetterStatus[]>;
  currentWordIndex: number;
  currentLetterIndex: number;
  startTime: number | null;
  correctWords: number;
  wpm: number;
  gameEnd: boolean;
  checkLetter: (letter: string, wordIndex: number, letterIndex: number) => void;
  goToNextWord: () => void;
  initKeyboard: (settings: GameSettingsType) => void;
  removeLetter: () => void;
  calculateWPM: () => void;
};
