import { controlPanelStore } from "@/entities/control-panel";
import { cn, isCyrrilic, isNumeric, isPunctual } from "@/shared/utils";
import React, { useCallback, useEffect, useState } from "react";
import { keyboardStore } from "../model/keyboard.store";
import { Word } from "./word";
import { Modal } from "@/shared/ui/modal";
import { KeyboardModal } from "./keyboard-modal";

type KeyboardProps = {
  className?: string;
};

export const Keyboard = React.memo((props: KeyboardProps) => {
  const { className } = props;
  // для модалки
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
  const calculateWPM = keyboardStore.use.calculateWPM();
  // клавиатура
  const text = keyboardStore.use.text();
  const currentWordIndex = keyboardStore.use.currentWordIndex();
  const currentLetterIndex = keyboardStore.use.currentLetterIndex();
  const gameEnd = keyboardStore.use.gameEnd();

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    initKeyboard({
      currentGameMode,
      modificators,
      timePerGame,
      wordsPerGame,
    });
  }, [initKeyboard, modificators, wordsPerGame]);

  useEffect(() => {
    initKeyboard({
      currentGameMode,
      modificators,
      timePerGame,
      wordsPerGame,
    });
  }, [initKeyboard, modificators, wordsPerGame]);

  useEffect(() => {
    if (gameEnd) {
      setIsModalOpen(true);
    }
  }, [calculateWPM, gameEnd]);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      // если открыта модалка результата, то не должны учитывать символы
      if (isModalOpen) {
        return;
      }
      if (
        event.key === " " &&
        (currentWordIndex > 0 || currentLetterIndex > 0)
      ) {
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
      isModalOpen,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <div>
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
      <KeyboardModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
});

Keyboard.displayName = "Keyboard";
