import { controlPanelStore } from "@/entities/control-panel";
import { cn } from "@/shared/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { keyboardStore } from "../model/keyboard.store";
import { Typography } from "@/shared/ui/typography";
import fireImg from "@/shared/assets/fire.webp";

type KeyboardTimerProps = {
  className?: string;
};

export const KeyboardTimer = React.memo((props: KeyboardTimerProps) => {
  const { className } = props;
  const startTime = keyboardStore.use.startTime();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const timePerGame = controlPanelStore.use.timePerGame();
  const [elapsedTimeInSeconds, setElapsedTimeInSeconds] = useState(0);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = Math.floor((currentTime - startTime!) / 1000); // Делим на 1000 для получения секунд
      setElapsedTimeInSeconds(elapsed);
    }, 1000); // Обновляем каждую секунду

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime]);

  useEffect(() => {
    if (elapsedTimeInSeconds >= timePerGame && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [elapsedTimeInSeconds, timePerGame]);

  return (
    <div
      className={cn(
        "fixed top-0 right-1/2 translate-x-1/2 px-6 py-4 flex gap-2 items-center bg-bg-secondary rounded-b-md",
        className
      )}
    >
      <img src={fireImg} alt="fire" className="w-10 h-10" />
      <Typography className="font-bold" variant={"h6"}>
        {elapsedTimeInSeconds}/{timePerGame} сек. прошло
      </Typography>
    </div>
  );
});

KeyboardTimer.displayName = "KeyboardTimer";
