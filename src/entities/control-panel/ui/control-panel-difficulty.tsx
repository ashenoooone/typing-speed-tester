import { cn } from "@/shared/utils";
import React, { ReactNode, useCallback } from "react";
import { controlPanelStore } from "../model/control-panel.store";
import { Button } from "@/shared/ui/button";
import { TimePerGame, WordsPerGame } from "../model/types";
import { Skull } from "lucide-react";
import skullPng from "@/shared/assets/skull.png";
import skullAnimated from "@/shared/assets/skull.webp";

type ControlPanelDifficultyProps = {
  className?: string;
};

const times: Record<
  TimePerGame,
  {
    activeClassName: string;
    activeIcon?: ReactNode;
    defaultIcon?: ReactNode;
  }
> = {
  "15": {
    activeClassName: "text-state-success-focused",
  },
  "30": {
    activeClassName: "text-yellow/70",
  },
  "45": {
    activeClassName: "text-orange/60",
  },
  "60": {
    activeClassName: "text-orange",
    activeIcon: <img className="w-8 h-8" src={skullPng} />,
    defaultIcon: <img className="w-8 h-8" src={skullAnimated} />,
  },
};

const words: Record<
  WordsPerGame,
  {
    activeClassName: string;
    activeIcon?: ReactNode;
    defaultIcon?: ReactNode;
  }
> = {
  "15": {
    activeClassName: "text-state-success-focused",
  },
  "25": {
    activeClassName: "text-yellow/70",
  },
  "50": {
    activeClassName: "text-orange/60",
  },
  "130": {
    activeClassName: "text-orange",
    activeIcon: <img className="w-8 h-8" src={skullPng} />,
    defaultIcon: <img className="w-8 h-8" src={skullAnimated} />,
  },
};

export const ControlPanelDifficulty = React.memo(
  (props: ControlPanelDifficultyProps) => {
    const { className } = props;

    const currentGameMode = controlPanelStore.use.currentGameMode();
    const currentTimePerGame = controlPanelStore.use.timePerGame();
    const currentWordsPerGame = controlPanelStore.use.wordsPerGame();
    const setTimePerGame = controlPanelStore.use.setTimePerGame();
    const setWordsPerGame = controlPanelStore.use.setWordsPerGame();

    const onSetTimePerGame = useCallback(
      (timePerGame: TimePerGame) => () => {
        setTimePerGame(timePerGame);
      },
      [setTimePerGame]
    );

    const onSetWordsPerGame = useCallback(
      (wordsPerGame: WordsPerGame) => () => {
        setWordsPerGame(wordsPerGame);
      },
      [setWordsPerGame]
    );

    let content;

    if (currentGameMode === "time") {
      content = (
        <div className="flex gap-2">
          {Object.entries(times).map(([time, options]) => {
            return (
              <Button
                onClick={onSetTimePerGame(Number(time) as TimePerGame)}
                className={cn("gap-1", {
                  [options.activeClassName]:
                    currentTimePerGame === Number(time),
                })}
                variant={"transparent_alternative"}
              >
                {currentTimePerGame === Number(time)
                  ? options.activeIcon ?? null
                  : options.defaultIcon ?? null}
                {time} сек
              </Button>
            );
          })}
        </div>
      );
    } else if (currentGameMode === "words") {
      content = (
        <div className="flex gap-2">
          {Object.entries(words).map(([word, options]) => {
            return (
              <Button
                onClick={onSetWordsPerGame(Number(word) as WordsPerGame)}
                className={cn("gap-1", {
                  [options.activeClassName]:
                    currentWordsPerGame === Number(word),
                })}
                variant={"transparent_alternative"}
              >
                {currentWordsPerGame === Number(word)
                  ? options.activeIcon ?? null
                  : options.defaultIcon ?? null}
                {word} слов
              </Button>
            );
          })}
        </div>
      );
    } else {
      content = null;
    }

    return <div className={cn(className, "")}>{content}</div>;
  }
);

ControlPanelDifficulty.displayName = "ControlPanelDifficulty";
