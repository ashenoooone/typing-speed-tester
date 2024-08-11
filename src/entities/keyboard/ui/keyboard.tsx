import { controlPanelStore } from "@/entities/control-panel";
import { cn, isCyrrilic, isNumeric, isPunctual } from "@/shared/utils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { keyboardStore } from "../model/keyboard.store";
import { Word } from "./word";
import { KeyboardModal } from "./keyboard-modal";
import { KeyboardTimer } from "./keyboard-timer";

type KeyboardProps = {
  className?: string;
};

export const Keyboard = React.memo((props: KeyboardProps) => {
  const { className } = props;

  // для модалки
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // таймаут реф на случай если у нас режим игры на время
  const refSetTimeout = useRef<NodeJS.Timeout | null>();

  // настройки игры
  const wordsPerGame = controlPanelStore.use.wordsPerGame();
  const timePerGame = controlPanelStore.use.timePerGame();
  const modificators = controlPanelStore.use.modificators();
  const currentGameMode = controlPanelStore.use.currentGameMode();
  // управление клавиатурой
  const startTime = keyboardStore.use.startTime();
  const initKeyboard = keyboardStore.use.initKeyboard();
  const checkLetter = keyboardStore.use.checkLetter();
  const goToNextWord = keyboardStore.use.goToNextWord();
  const removeLetter = keyboardStore.use.removeLetter();
  const setEndGame = keyboardStore.use.setGameEnd();
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
  }, [initKeyboard, currentGameMode, modificators, wordsPerGame]);

  useEffect(() => {
    initKeyboard({
      currentGameMode,
      modificators,
      timePerGame,
      wordsPerGame,
    });
  }, [initKeyboard, currentGameMode, modificators, wordsPerGame]);

  useEffect(() => {
    if (gameEnd) {
      setIsModalOpen(true);
    }
  }, [gameEnd]);

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
        // если у нас нет стартового времени - значит игра еще не началась, значит мы выставляем таймаут
        if (!startTime && currentGameMode === "time") {
          // через timePerGame * 1000 секунд завершаем игру
          refSetTimeout.current = setTimeout(() => {
            setEndGame(true);
          }, timePerGame * 1000);
        }
        checkLetter(event.key, currentWordIndex, currentLetterIndex);
        // сделать проверку, если игра еще не началась, то начать отсчет таймера после первой буквы
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
      currentGameMode,
      timePerGame,
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
      {currentGameMode === "time" && startTime && <KeyboardTimer />}
    </div>
  );
});

Keyboard.displayName = "Keyboard";
