import { GameSettingsType } from "@/entities/control-panel";

// статус буквы у нас может быть - валидная, невалидная, лишняя
export type LetterStatus = "valid" | "invalid" | "extra" | "default";

export type KeyboardStoreType = {
  text: Array<string[]>;
  userInput: Array<LetterStatus[]>;
  addLetter: (letter: string, wordIndex: number, letterIndex: number) => void;
  addWord: () => void;
  initKeyboard: (settings: GameSettingsType) => void;
};
