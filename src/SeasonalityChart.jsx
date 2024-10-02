import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radar chart with lines only";

const chartData = [
  {
    month: "Sep",
    desktop: 5.76,
    mobile: 10.96,
  },
  {
    month: "Oct",
    desktop: 5.59,
    mobile: 10.74,
  },
  {
    month: "Nov",
    desktop: 11.72,
    mobile: 12.67,
  },
  {
    month: "Dec",
    desktop: 19.14,
    mobile: 14.68,
  },
  {
    month: "Jan",
    desktop: 7.81,
    mobile: 12.22,
  },
  {
    month: "Feb",
    desktop: 6.48,
    mobile: 11.43,
  },
  {
    month: "Mar",
    desktop: 5.53,
    mobile: 11.37,
  },
  {
    month: "Apr",
    desktop: 8.08,
    mobile: 11.72,
  },
  {
    month: "May",
    desktop: 5.28,
    mobile: 11.55,
  },
  {
    month: "Jun",
    desktop: 5.68,
    mobile: 11.6,
  },
  {
    month: "Jul",
    desktop: 4.6,
    mobile: 11.72,
  },
  {
    month: "Aug",
    desktop: 5.1,
    mobile: 11.43,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2A9D90",
  },
  mobile: {
    label: "Mobile",
    color: "#E76E50",
  },
};

export function SeasonalityChart() {
  return (
    <Card style={{userSelect: "none"}}>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <PolarAngleAxis dataKey="month" />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey="desktop"
              fill="var(--color-desktop)"
              fillOpacity={0}
              stroke="var(--color-desktop)"
              strokeWidth={2}
            />
            <Radar
              dataKey="mobile"
              fill="var(--color-mobile)"
              fillOpacity={0}
              stroke="var(--color-mobile)"
              strokeWidth={2}
            />
             <PolarRadiusAxis
              angle={75}
              stroke="hsla(var(--foreground))"
              orientation="middle"
              axisLine={false}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
