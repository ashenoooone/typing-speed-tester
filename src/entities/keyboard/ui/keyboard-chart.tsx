import { Typography } from "@/shared/ui/typography";
import { cn } from "@/shared/utils";
import React, { useCallback, useMemo, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { ChartItem } from "./chart-item";
type KeyboardChartProps = {
  correctSymbols: number;
  incorrectSymbols: number;
  extraSymbols: number;
  total: number;
  className?: string;
};

type DataType = {
  name: string;
  value: number;
  color: string;
};

export const KeyboardChart = React.memo((props: KeyboardChartProps) => {
  const {
    correctSymbols,
    extraSymbols,
    incorrectSymbols,
    className = "",
    total,
  } = props;
  const [hoveredItem, setHoveredItem] = useState<null | DataType | undefined>(
    null
  );

  const data: DataType[] = useMemo(() => {
    return [
      {
        name: "Правильных",
        value: correctSymbols,
        color: "green",
      },
      {
        name: "Лишних",
        value: extraSymbols,
        color: "yellow",
      },
      {
        name: "Неправильных",
        value: incorrectSymbols,
        color: "red",
      },
    ];
  }, [correctSymbols, extraSymbols, incorrectSymbols]);

  const onMouseEnterHandler = useCallback(
    (name: string | undefined) => () => {
      if (!name) {
        setHoveredItem(null);
      } else {
        setHoveredItem(data.find((i) => i.name === name));
      }
    },
    [data]
  );

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <div className={cn("relative w-[160px]", className)}>
        <div
          className={
            "top-1/2 -translate-y-1/2 flex flex-col items-center left-1/2 -translate-x-1/2 absolute z-10"
          }
        >
          <Typography variant={"h4"} tag={"h4"}>
            {hoveredItem ? hoveredItem.value : total}
          </Typography>
        </div>
        <PieChart width={160} height={160}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={70}
            strokeWidth={0}
            className={"border-none"}
            dataKey="value"
            paddingAngle={2}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                stroke={"currentColor"}
                fill={"currentColor"}
                strokeWidth={entry.name === hoveredItem?.name ? 5 : 0}
                className={cn(
                  `text-${entry.color} fill-${entry.color}`,
                  {
                    "z-10": entry.name === hoveredItem?.name,
                  },
                  "font-medium"
                )}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="w-full flex flex-col gap-2">
        <ChartItem
          onMouseLeave={onMouseEnterHandler(undefined)}
          onMouseEnter={onMouseEnterHandler("Правильных")}
          text={`${correctSymbols}`}
          title="WPM"
          dotColor="green"
        />
        <ChartItem
          onMouseLeave={onMouseEnterHandler(undefined)}
          onMouseEnter={onMouseEnterHandler("Неправильных")}
          text={`${incorrectSymbols}`}
          title="Неправильных"
          dotColor="red"
        />
        <ChartItem
          onMouseLeave={onMouseEnterHandler(undefined)}
          onMouseEnter={onMouseEnterHandler("Лишних")}
          text={`${extraSymbols}`}
          title="Лишних"
          dotColor="yellow"
        />
      </div>
    </div>
  );
});

KeyboardChart.displayName = "KeyboardChart";
