import { cn } from "@/shared/utils";
import React from "react";
import { LetterStatus } from "../model/types";
import { Typography } from "@/shared/ui/typography";

type LetterProps = {
  className?: string;
  letter: string;
  status?: LetterStatus;
  isActive?: boolean;
};

export const Letter = React.memo((props: LetterProps) => {
  const { className, letter, status = "default", isActive } = props;
  return (
    <Typography
      variant={"h5"}
      className={cn("", className, {
        "text-text-primary/40": status === "default",
        "text-text-error/50": status === "extra",
        "text-text-error": status === "invalid",
        "text-text-success": status === "valid",
        "border-l-2 border-state-success-focused": isActive,
      })}
    >
      {letter}
    </Typography>
  );
});

Letter.displayName = "Letter";
