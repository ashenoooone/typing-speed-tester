import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import { Dot } from "lucide-react";
import { ComponentProps, memo } from "react";

type DotColor = "green" | "yellow" | "red";

interface ChartItemProps extends ComponentProps<"div"> {
  className?: string;
  title: string;
  text: string;
  dotColor?: DotColor;
}

export const ChartItem = memo((props: ChartItemProps) => {
  const { className = "", dotColor = "green", text, title, ...rest } = props;
  return (
    <div
      className={cn(
        "border hover:border-icon-primary px-[10px] py-3 rounded-[16px] border-border-primary flex justify-between",
        className
      )}
      {...rest}
    >
      <div className={"flex items-center gap-2"}>
        <Dot
          className={cn({
            "text-green": dotColor === "green",
            "text-yellow": dotColor === "yellow",
            "text-red": dotColor === "red",
          })}
        />
        <Typography variant={"body-1"}>{title}</Typography>
      </div>
      <Typography variant={"body-1"}>{text}</Typography>
    </div>
  );
});
