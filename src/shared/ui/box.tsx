import { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/utils";

interface BoxProps extends ComponentProps<"div"> {
  className?: string;
  children?: ReactNode;
}

export const Box = (props: BoxProps) => {
  const { className = "", children, ...rest } = props;
  return (
    <div className={cn("p-2 rounded-[12px] bg-[#232324]", className)} {...rest}>
      {children}
    </div>
  );
};
