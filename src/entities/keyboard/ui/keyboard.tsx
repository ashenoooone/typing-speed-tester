import { controlPanelStore } from "@/entities/control-panel";
import { cn } from "@/shared/utils";
import React, { useEffect } from "react";
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
  // клавиатура
  const text = keyboardStore.use.text();

  useEffect(() => {
    initKeyboard({
      currentGameMode,
      modificators,
      timePerGame,
      wordsPerGame,
    });
  }, [initKeyboard, modificators, wordsPerGame]);

  return (
    <div
      className={cn(
        "bg-bg-modal p-4 rounded-xl flex flex-wrap gap-2",
        className
      )}
    >
      {text.map((word) => {
        return <Word key={word.join("")} word={word} />;
      })}
    </div>
  );
});

Keyboard.displayName = "Keyboard";
