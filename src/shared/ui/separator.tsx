import React, { memo } from "react";
import { cn } from "@/shared/utils";

interface SeparatorProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export const Separator = memo((props: SeparatorProps) => {
  const { className = "", orientation = "horizontal" } = props;

  return (
    <div
      className={cn(
        orientation === "horizontal"
          ? "h-[2px] w-full bg-border-primary"
          : "h-full w-[4px] rounded-xl bg-border-primary",
        className,
        "shrink-0"
      )}
    />
  );
});
