import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/utils";
import { Binary, Section } from "lucide-react";
import React, { ReactNode, useCallback } from "react";
import { GameModificators } from "../model/types";
import { controlPanelStore } from "../model/control-panel.store";
import { Separator } from "@/shared/ui/separator";
import { Typography } from "@/shared/ui/typography";

type ControlPanelModificatorsProps = {
  className?: string;
};

const gameModificators: Record<
  GameModificators,
  {
    icon: ReactNode;
    text: string;
  }
> = {
  numbers: {
    icon: <Binary />,
    text: "Числа",
  },
  punctuation: {
    icon: <Section />,
    text: "Знаки препинания",
  },
};

export const ControlPanelModificators = React.memo(
  (props: ControlPanelModificatorsProps) => {
    const { className } = props;
    const activeModificators = controlPanelStore.use.modificators();
    const toggleModificator = controlPanelStore.use.toggleGameModificator();

    const onToggleModificator = useCallback(
      (mod: GameModificators) => () => {
        toggleModificator(mod);
      },
      [toggleModificator]
    );

    return (
      <div className={cn("flex", className)}>
        {Object.entries(gameModificators).map(([mod, options]) => {
          return (
            <Button
              onClick={onToggleModificator(mod as GameModificators)}
              className={cn("gap-1", {
                "text-purple-300/90":
                  activeModificators[mod as GameModificators],
              })}
              variant={"transparent_alternative"}
            >
              {options.icon} {options.text}
            </Button>
          );
        })}
      </div>
    );
  }
);

ControlPanelModificators.displayName = "ControlPanelModificators";
