import { controlPanelStore } from "@/entities/control-panel";
import { cn, isCyrrilic, isNumeric, isPunctual } from "@/shared/utils";
import React, { useCallback, useEffect } from "react";
import { keyboardStore } from "../model/keyboard.store";
import { Word } from "./word";

type KeyboardProps = {
  className?: string;
};

export const Keyboard = React.memo((props: KeyboardProps) => {
  const { className } = props;
  // настройки игры
  const wordsPerGame = controlPanelStore.use.wordsPerGame();
  const timePerGame = controlPanelStore.use.timePerGame();
  const modificators = controlPanelStore.use.modificators();
  const currentGameMode = controlPanelStore.use.currentGameMode();
  // управление клавиатурой
  const initKeyboard = keyboardStore.use.initKeyboard();
  const checkLetter = keyboardStore.use.checkLetter();
  const goToNextWord = keyboardStore.use.goToNextWord();
  const removeLetter = keyboardStore.use.removeLetter();
  // клавиатура
  const text = keyboardStore.use.text();
  const currentWordIndex = keyboardStore.use.currentWordIndex();
  const currentLetterIndex = keyboardStore.use.currentLetterIndex();

  useEffect(() => {
    initKeyboard({
      currentGameMode,
      modificators,
      timePerGame,
      wordsPerGame,
    });
  }, [initKeyboard, modificators, wordsPerGame]);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === " ") {
        goToNextWord();
      } else if (
        isCyrrilic(event.key) ||
        isPunctual(event.key) ||
        isNumeric(event.key)
      ) {
        checkLetter(event.key, currentWordIndex, currentLetterIndex);
      } else if (event.key === "Backspace") {
        removeLetter();
      }
    },
    [
      checkLetter,
      currentLetterIndex,
      removeLetter,
      currentWordIndex,
      goToNextWord,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <div
      className={cn(
        "bg-bg-modal p-4 rounded-xl flex flex-wrap gap-2",
        className
      )}
    >
      {text.map((word, wordIndex) => {
        return (
          <Word
            wordIndex={wordIndex}
            key={word.join("") + wordIndex}
            word={word}
          />
        );
      })}
    </div>
  );
});

Keyboard.displayName = "Keyboard";
