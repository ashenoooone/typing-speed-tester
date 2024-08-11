import { Modal, ModalProps } from "@/shared/ui/modal";
import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import React, { useEffect, useMemo } from "react";
import { keyboardStore } from "../model/keyboard.store";
import { Tooltip } from "@/shared/ui/tooltip";
import { KeyboardChart } from "./keyboard-chart";

type KeyboardModalProps = {
  className?: string;
} & ModalProps;

export const KeyboardModal = React.memo((props: KeyboardModalProps) => {
  const { className, isOpen, onClose } = props;

  //   результаты игры
  const correctWords = keyboardStore.use.correctWords();
  const wpm = keyboardStore.use.wpm();
  const totalWords = keyboardStore.use.text();
  const userInput = keyboardStore.use.userInput();

  const flatSymbols = useMemo(() => {
    return userInput.flat();
  }, [userInput]);

  const correctSymbols = useMemo(() => {
    return flatSymbols.filter((i) => i === "valid").length;
  }, [flatSymbols]);

  const incorrectSymbols = useMemo(() => {
    return flatSymbols.filter((i) => i === "invalid").length;
  }, [flatSymbols]);

  const extraSymbols = useMemo(() => {
    return flatSymbols.filter((i) => i === "extra").length;
  }, [flatSymbols]);

  // подсчет результатов
  const calculateWPM = keyboardStore.use.calculateWPM();

  useEffect(() => {
    if (isOpen) {
      calculateWPM();
    }
  }, [calculateWPM, isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={cn("max-w-[500px] w-full", className)}
    >
      <Typography variant={"h4"} className="mb-4">
        Результат
      </Typography>
      <div className="flex gap-10 items-start">
        <div className="flex flex-col gap-1">
          <div>
            <Typography variant={"subtitle-1"}>WPM:</Typography>
            <Typography variant={"h6"} className="text-state-success-focused">
              {wpm}
            </Typography>
          </div>
          <div>
            <Typography variant={"subtitle-1"}>Правильных слов:</Typography>
            <Typography variant={"h6"} className="text-state-success-focused">
              {correctWords}/{totalWords.length}
            </Typography>
          </div>
          <div>
            <Typography variant={"subtitle-1"}>Символы:</Typography>
            <div className="flex gap-1">
              <Tooltip
                trigger={
                  <Typography className="cursor-pointer" variant={"h6"}>
                    {flatSymbols.length}
                  </Typography>
                }
                content="всего элементов"
              />
              /
              <Tooltip
                trigger={
                  <Typography
                    className="text-state-success-focused cursor-pointer"
                    variant={"h6"}
                  >
                    {correctSymbols}
                  </Typography>
                }
                content="правильных"
              />
              /
              <Tooltip
                trigger={
                  <Typography
                    className="text-text-error cursor-pointer"
                    variant={"h6"}
                  >
                    {incorrectSymbols}
                  </Typography>
                }
                content="неправильных"
              />
              /
              <Tooltip
                trigger={
                  <Typography
                    className="text-text-error/50 cursor-pointer"
                    variant={"h6"}
                  >
                    {extraSymbols}
                  </Typography>
                }
                content="лишних"
              />
            </div>
          </div>
        </div>
        <KeyboardChart
          total={flatSymbols.length}
          correctSymbols={correctSymbols}
          extraSymbols={extraSymbols}
          incorrectSymbols={incorrectSymbols}
        />
      </div>
    </Modal>
  );
});

KeyboardModal.displayName = "KeyboardModal";
