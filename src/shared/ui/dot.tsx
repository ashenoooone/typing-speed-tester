import { cn } from "@/shared/utils";
import React from "react";

type DotProps = {
  className?: string;
  size?: number;
};

export const Dot = React.memo((props: DotProps) => {
  const { className, size = 6 } = props;
  return (
    <div
      style={{ width: size, height: size }}
      className={cn("bg-text-primary rounded-full shrink-0", className)}
    />
  );
});

Dot.displayName = "Dot";
