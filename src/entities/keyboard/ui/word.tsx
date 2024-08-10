import { cn } from "@/shared/utils";
import React from "react";
import { Letter } from "./letter";
import { keyboardStore } from "../model/keyboard.store";

type WordProps = {
  className?: string;
  word: string[];
  wordIndex: number;
};

export const Word = React.memo((props: WordProps) => {
  const { className, word, wordIndex } = props;
  const userInput = keyboardStore.use.userInput();

  return (
    <div className={cn("flex", className)}>
      {word.map((letter, letterIndex) => {
        return (
          <Letter
            status={userInput?.[wordIndex]?.[letterIndex] ?? "default"}
            key={letter}
            letter={letter}
          />
        );
      })}
    </div>
  );
});

Word.displayName = "Word";
