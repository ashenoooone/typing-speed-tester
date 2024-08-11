import { cn } from "@/shared/utils";
import React, { ReactNode, useCallback } from "react";
import { GameModeType } from "../model/types";
import { Button } from "@/shared/ui/button";
import { SquareAsterisk, Timer } from "lucide-react";
import { controlPanelStore } from "../model/control-panel.store";
import { ControlPanelGameMode } from "./control-panel-gamemode";
import { ControlPanelDifficulty } from "./control-panel-difficulty";
import { Separator } from "@/shared/ui/separator";
import { ControlPanelModificators } from "./control-panel-modificators";

type ControlPanelProps = {
  className?: string;
};

export const ControlPanel = React.memo((props: ControlPanelProps) => {
  // компонент - контрольная панель для приложения с настройками
  const { className } = props;

  return (
    <div
      className={cn(
        "bg-bg-modal px-4 py-2 rounded-xl justify-center items-center flex gap-2",
        className
      )}
    >
      {/* настройка модификаторов */}
      <ControlPanelModificators />
      <Separator orientation="vertical" />
      {/* меню управления режимом игры */}
      <ControlPanelGameMode />
      <Separator orientation="vertical" />
      {/* настройка сложности */}
      <ControlPanelDifficulty />
    </div>
  );
});

ControlPanel.displayName = "ControlPanel";
