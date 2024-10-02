import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { useState } from "react";
import { Card} from "@/components/ui/card";
import { X } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import ExpandIcon from "./Icons/ExpandIcon"; // Ensure the path to your ExpandIcon is correct

const chartData = [
  { month: "Sep", desktop: 5.76, mobile: 10.96 },
  { month: "Oct", desktop: 5.59, mobile: 10.74 },
  { month: "Nov", desktop: 11.72, mobile: 12.67 },
  { month: "Dec", desktop: 19.14, mobile: 14.68 },
  { month: "Jan", desktop: 7.81, mobile: 12.22 },
  { month: "Feb", desktop: 6.48, mobile: 11.43 },
  { month: "Mar", desktop: 5.53, mobile: 11.37 },
  { month: "Apr", desktop: 8.08, mobile: 11.72 },
  { month: "May", desktop: 5.28, mobile: 11.55 },
  { month: "Jun", desktop: 5.68, mobile: 11.6 },
  { month: "Jul", desktop: 4.6, mobile: 11.72 },
  { month: "Aug", desktop: 5.1, mobile: 11.43 },
];

const chartConfig = {
  desktop: { label: "Standard Deviation", color: "#673ab7" },
  mobile: { label: "Avg Indexed by Search", color: "#ffa500" },
};

const HoverDetails = ({ month, desktop, mobile, isHovering }) => (
  <div className="self-end bg-white bg-opacity-90 p-2 rounded-md shadow-lg">
    {isHovering && <div className="text-[12px] font-medium mb-2">{month}</div>}
    <div className="flex items-center mb-2">
      <div className="w-1 h-6 mr-2" style={{ backgroundColor: chartConfig.desktop.color }}></div>
      <div className="text-[10px]">{chartConfig.desktop.label}</div>
      {isHovering && <div className="ml-2 text-[10px] font-semibold">{desktop.toFixed(2)}</div>}
    </div>
    <div className="flex items-center">
      <div className="w-1 h-6 mr-2" style={{ backgroundColor: chartConfig.mobile.color }}></div>
      <div className="text-[10px]">{chartConfig.mobile.label}</div>
      {isHovering && <div className="ml-2 text-[10px] font-semibold">{mobile.toFixed(2)}</div>}
    </div>
  </div>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[120px] right-[600px] z-50">
      <div
        className="flex flex-col items-center bg-white rounded-[12px] relative border border-slate-200"
        style={{ width: "500px", paddingTop: "10px" }}
      >
        <button
          onClick={onClose}
          style={{ marginRight: "10px" }}
          className="self-end text-gray-500 hover:text-gray-700 mr-[10px]"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

export function SeasonalityChart() {
  const [hoverData, setHoverData] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMouseMove = (event) => {
    if (event.activePayload) {
      setHoverData({
        month: event.activeLabel,
        desktop: event.activePayload[0].value,
        mobile: event.activePayload[1].value,
      });
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <>
      <Card style={{ userSelect: "none", width: "300px", height: "300px" }}>
        <div className="flex flex-col p-2 pt-2 gap-2">
          <HoverDetails
            month={hoverData?.month}
            desktop={hoverData?.desktop || 0}
            mobile={hoverData?.mobile || 0}
            isHovering={isHovering}
          />
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] pt-2">
            <RadarChart data={chartData} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} active={false} />
              <PolarAngleAxis dataKey="month"/>
              <PolarGrid radialLines={false}/>
              <Radar
                dataKey="desktop"
                fill={chartConfig.desktop.color}
                fillOpacity={0}
                stroke={chartConfig.desktop.color}
                strokeWidth={2}
              />
              <Radar
                dataKey="mobile"
                fill={chartConfig.mobile.color}
                fillOpacity={0}
                stroke={chartConfig.mobile.color}
                strokeWidth={2}
              />
              <PolarRadiusAxis angle={75} stroke="hsla(var(--foreground))" orientation="middle" axisLine={false} />
            </RadarChart>
          </ChartContainer>
          <button
              onClick={() => setIsModalOpen(true)}
              size="sm"
              style={{
                padding: "4px",
                borderRadius: "5px",
              }}
              className="self-end border border-slate-300"
            >
              <ExpandIcon size={17} />
            </button>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Card>
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] pt-2">
            <RadarChart data={chartData}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} active={true} />
              <PolarAngleAxis dataKey="month" />
              <PolarGrid radialLines={false} />
              <Radar
                dataKey="desktop"
                fill={chartConfig.desktop.color}
                fillOpacity={0}
                stroke={chartConfig.desktop.color}
                strokeWidth={2}
              />
              <Radar
                dataKey="mobile"
                fill={chartConfig.mobile.color}
                fillOpacity={0}
                stroke={chartConfig.mobile.color}
                strokeWidth={2}
              />
              <PolarRadiusAxis angle={73} stroke="hsla(var(--foreground))" orientation="middle" axisLine={false} />
            </RadarChart>
          </ChartContainer>
        </Card>
      </Modal>
    </>
  );
}
