import { cn } from "@/shared/utils";
import React, { ReactNode, useRef, useState } from "react";

type TooltipProps = {
  className?: string;
  trigger: ReactNode;
  content: ReactNode;
};

export const Tooltip = React.memo((props: TooltipProps) => {
  const { className, content, trigger } = props;
  const refSetTimeout = useRef<NodeJS.Timeout>();
  const [showToolTip, setShowToolTip] = useState(false);

  const onMouseEnterHandler = () => {
    refSetTimeout.current = setTimeout(() => {
      setShowToolTip(true);
    }, 400);
  };

  const onMouseLeaveHandler = () => {
    clearTimeout(refSetTimeout.current);
    setShowToolTip(false);
  };

  return (
    <div
      className={"relative"}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {trigger}
      {showToolTip && (
        <div
          className={cn(
            "absolute bottom-full rounded-xl bg-bg-modal py-1 px-3",
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = "Tooltip";
