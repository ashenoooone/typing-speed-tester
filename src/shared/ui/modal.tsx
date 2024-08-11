import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Portal } from "./portal";
import { cn } from "@/shared/utils";
import { Box } from "./box";
import { Button } from "./button";
import { CircleX, X } from "lucide-react";

export interface ModalProps {
  className?: string;
  children?: ReactNode;
  onClose?: () => void;
  isOpen?: boolean;
}

const ANIM_DELAY = 100;

export const Modal = (props: ModalProps) => {
  const { className = "", onClose, isOpen, children } = props;
  const [isClosing, setIsClosing] = useState(false);

  const closeTimerRef: MutableRefObject<
    ReturnType<typeof setTimeout> | undefined
  > = useRef(undefined);

  const onOverlayClick = useCallback(() => {
    setIsClosing(true);
    closeTimerRef.current = setTimeout(() => {
      onClose?.();
      setIsClosing(false);
    }, ANIM_DELAY);
  }, [onClose]);

  const onContentClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
    },
    []
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") onOverlayClick();
    },
    [onOverlayClick]
  );

  useEffect(() => {
    if (isOpen) {
      // @ts-expect-error ошибка реакта, видимо https://github.com/hibiken/react-places-autocomplete/issues/377
      window.addEventListener("keydown", onKeyDown);
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      // @ts-expect-error ошибка реакта, видимо https://github.com/hibiken/react-places-autocomplete/issues/377
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("overflow-hidden");
      clearTimeout(closeTimerRef.current);
    };
  }, [isOpen, onKeyDown]);

  return (
    <Portal>
      <div
        className={cn(
          "z-10 fixed bg-black/20 inset-0 opacity-0 pointer-events-none overflow-y-auto flex justify-center items-start",
          {
            "opacity-100 pointer-events-auto": isOpen,
          }
        )}
      >
        <div className={"fixed inset-0 bg-black/40"} onClick={onOverlayClick} />
        <Box
          className={cn(
            "scale-75 transition-all relative mt-[20px] mx-[10px] mb-[20px] md:mt-[50px] md:mr-[10px] md:mb-[10px] p-8",
            {
              "scale-75": isClosing,
              "scale-100": isOpen && !isClosing,
            },
            className
          )}
          onClick={onContentClick}
        >
          {children}
          {isOpen && (
            <Button
              onClick={onOverlayClick}
              className="absolute right-3 top-3"
              variant={"icon"}
            >
              <X />
            </Button>
          )}
        </Box>
      </div>
    </Portal>
  );
};
