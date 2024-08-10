import { cn } from "@/shared/utils";
import React from "react";
import { LetterStatus } from "../model/types";
import { Typography } from "@/shared/ui/typography";

type LetterProps = {
  className?: string;
  letter: string;
  status?: LetterStatus;
};

export const Letter = React.memo((props: LetterProps) => {
  const { className, letter, status = "default" } = props;
  return (
    <Typography
      variant={"h5"}
      className={cn("", className, {
        "text-text-primary/40": status === "default",
        "text-text-error/50": status === "extra",
        "text-text-error": status === "invalid",
        "text-text-success": status === "valid",
      })}
    >
      {letter}
    </Typography>
  );
});

Letter.displayName = "Letter";
