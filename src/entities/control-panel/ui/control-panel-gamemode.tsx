import { cn } from "@/shared/utils";
import React, { ReactNode, useCallback } from "react";
import { GameModeType } from "../model/types";
import { SquareAsterisk, Timer } from "lucide-react";
import { controlPanelStore } from "../model/control-panel.store";
import { Button } from "@/shared/ui/button";

type ControlPanelGameModeProps = {
  className?: string;
};

const gameModes: Record<GameModeType, { translate: string; icon: ReactNode }> =
  {
    time: { translate: "Время", icon: <Timer /> },
    words: { translate: "Слова", icon: <SquareAsterisk /> },
  };

export const ControlPanelGameMode = React.memo(
  (props: ControlPanelGameModeProps) => {
    const { className } = props;

    // для управления режимом игры
    const currentGameMode = controlPanelStore.use.currentGameMode();
    const setNewGameMode = controlPanelStore.use.setCurrentGameMode();

    const onClickGameMode = useCallback(
      (newMode: GameModeType) => () => {
        setNewGameMode(newMode);
      },
      [setNewGameMode]
    );
    //   -----------

    return (
      <div className={cn("flex gap-2", className)}>
        {Object.entries(gameModes).map(([mode, options]) => {
          return (
            <Button
              variant={"transparent_alternative"}
              className={cn("gap-2", {
                "text-state-success-focused": currentGameMode === mode,
              })}
              key={mode}
              onClick={onClickGameMode(mode as GameModeType)}
            >
              {options.icon} {options.translate}
            </Button>
          );
        })}
      </div>
    );
  }
);

ControlPanelGameMode.displayName = "ControlPanelGameMode";
