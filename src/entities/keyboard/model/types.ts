import {
  GameModeType,
  GameSettingsType,
  TimePerGame,
} from "@/entities/control-panel";

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
  // для подсчета когда игра закончится
  _currentTimer: NodeJS.Timeout | null;
  setStartTime: (startTime: number) => void;
  setGameEnd: (gameEnd: boolean) => void;
  checkLetter: (letter: string, wordIndex: number, letterIndex: number) => void;
  goToNextWord: () => void;
  initKeyboard: (settings: GameSettingsType) => void;
  removeLetter: () => void;
  calculateWPM: () => void;
};
