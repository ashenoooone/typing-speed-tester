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
  const currentWordIndex = keyboardStore.use.currentWordIndex();
  const currentLetterIndex = keyboardStore.use.currentLetterIndex();
  const text = keyboardStore.use.text();

  return (
    <div
      className={cn("flex", className, {
        "border-r-2 border-text-text-primary":
          // проверка, что мы вышли за границы слова, то нужно передвигать маркер курсора
          currentWordIndex === wordIndex &&
          currentLetterIndex === text[currentWordIndex].length,
      })}
    >
      {word.map((letter, letterIndex) => {
        return (
          <Letter
            isActive={
              // если мы находимся в текущем слове и индексы равны, то буква активная (маркер на ней находится)
              currentWordIndex === wordIndex &&
              currentLetterIndex === letterIndex
            }
            status={userInput?.[wordIndex]?.[letterIndex] ?? "default"}
            key={`${word.join("")}${letterIndex}${letter}`}
            letter={letter}
          />
        );
      })}
    </div>
  );
});

Word.displayName = "Word";
