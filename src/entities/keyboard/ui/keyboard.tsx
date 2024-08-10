import { cn } from "@/shared/utils";
import React from "react";

type KeyboardProps = {
  className?: string;
};

export const Keyboard = React.memo((props: KeyboardProps) => {
  const { className } = props;
  return <div className={cn("", className)}></div>;
});

Keyboard.displayName = "Keyboard";
