import React, { ComponentProps, memo } from "react";
import { cn } from "@/shared/utils";
import { cva, VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "text-button font-semibold transition flex items-center justify-center leading-button uppercase px-[16px] py-[10px] rounded-[4px] disabled:border-state-accent-disabled disabled:pointer-events-none",
  {
    variants: {
      variant: {
        icon: "p-0 bg-none hover:opacity-80 transition",
        transparent_alternative:
          "text-text-tertiary hover:text-text-secondary normal-case",
        default:
          "text-text-primary bg-bg-accent hover:bg-state-blue-hover focus:bg-state-blue-focused disabled:bg-state-accent-disabled",
        outline:
          "text-text-accent border border-border-accent hover:bg-state-transparent-blue-hover focus:bg-state-transparent-blue-focused disabled:text-text-primary",
        transparent:
          "text-text-accent hover:bg-state-transparent-blue-hover focus:bg-state-transparent-blue-focused",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  className?: string;
  children?: React.ReactNode;
}

export const Button = memo((props: ButtonProps) => {
  const {
    className = "",
    children,
    type = "button",
    variant = "default",
    tabIndex = -1,
    onClick,
    ...rest
  } = props;

  const onMouseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event);
    }
    // сейчас это надо чтобы игра корректно начиналась после нажатий кнопок, потом просто переделать
    // кнопки на чекбоксы
    event.currentTarget.blur();
  };

  return (
    <button
      type={type}
      onClick={onMouseClick}
      tabIndex={tabIndex}
      className={cn(buttonVariants({ variant }), className)}
      {...rest}
    >
      {children}
    </button>
  );
});
