export type WordsPerGame = 15 | 25 | 50 | 130;
export type TimePerGame = 15 | 30 | 45 | 60;
export type GameModeType = "time" | "words";
export type GameModificators = "punctuation" | "numbers";

export type ControlPanelStoreType = {
  currentGameMode: GameModeType;
  setCurrentGameMode: (newMode: GameModeType) => void;
  wordsPerGame: WordsPerGame;
  timePerGame: TimePerGame;
  modificators: Record<GameModificators, boolean>;
  toggleGameModificator: (modificator: GameModificators) => void;
  setTimePerGame: (newTime: TimePerGame) => void;
  setWordsPerGame: (newWords: WordsPerGame) => void;
};

export type GameSettingsType = Pick<
  ControlPanelStoreType,
  "modificators" | "currentGameMode" | "timePerGame" | "wordsPerGame"
>;
