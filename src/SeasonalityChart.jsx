import { useState } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from "recharts";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import ExpandIcon from "./Icons/ExpandIcon";
import { NotEnoughData } from "./NotEnoughData";
import RadioButtonGroup from "./RadioButtons";
import HoverDetails from "./HoverDetails";

const chartData = {
  data: [
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
  ],
  keyword: "Lego",
  selected_option: "Group",
  brand_empty: true,
};

const chartConfig = {
  desktop: { label: "Standard Deviation", color: "#673ab7" },
  mobile: { label: "Avg Interest by Search", color: "#ffa500" },
};

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-[120px] right-[600px] z-50">
      <div
        className="flex flex-col items-center bg-white rounded-[12px] relative border border-slate-200"
        style={{ width: "100%", paddingTop: "10px", height: "550px" }}
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

const ModalContent = () => {
  return (
    <Card
      className="flex justify-center"
      style={{ paddingLeft: "20px", userSelect: "none" }}
    >
      <div className="flex flex-col">
        <div
          id="seasonality_keyword"
          className="font-semibold text-[18px] ml-[40px]"
        >
          {chartData?.keyword}
        </div>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] pt-2"
          width="850px"
          height="550px"
          isModal={true}
        >
          <RadarChart data={chartData?.data}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
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
            <PolarRadiusAxis
              angle={73}
              stroke="hsla(var(--foreground))"
              orientation="middle"
              axisLine={false}
            />
          </RadarChart>
        </ChartContainer>
      </div>
    </Card>
  );
};

export function SeasonalityChart() {
  const [hoverData, setHoverData] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    chartData?.selected_option === "" ? "Brand" : chartData?.selected_option
  );

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

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
    console.log("Selected value:", event.target.value);
  };

  const hasData = chartData?.data?.length > 0;

  return (
    <>
      <Card style={{ userSelect: "none", width: "300px", height: "300px" }}>
        <div className="flex flex-col p-2 pt-2 pb-0 gap-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <RadioButtonGroup
                selectedValue={selectedValue}
                handleRadioChange={handleRadioChange}
                disableBrand={chartData?.brand_empty}
              />
              <div
                id="seasonality_keyword"
                className="font-semibold text-[14px]"
              >
                {chartData?.keyword}
              </div>
            </div>
            <div>
              <HoverDetails
                month={hoverData?.month}
                desktop={hoverData?.desktop || 0}
                mobile={hoverData?.mobile || 0}
                isHovering={isHovering}
              />
            </div>
          </div>
          {hasData ? (
            <>
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] pt-2"
              >
                <RadarChart
                  data={chartData?.data}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                    active={false}
                  />
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
                  <PolarRadiusAxis
                    angle={75}
                    stroke="hsla(var(--foreground))"
                    orientation="middle"
                    axisLine={false}
                  />
                </RadarChart>
              </ChartContainer>
              <button
                onClick={() => setIsModalOpen(true)}
                size="sm"
                style={{
                  padding: "4px",
                  borderRadius: "5px",
                  marginRight: "21px",
                  marginTop: "-36px",
                }}
                className="self-end border border-slate-300 z-50 cursor-pointer"
              >
                <ExpandIcon size={17} />
              </button>
            </>
          ) : (
            <NotEnoughData />
          )}
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalContent />
      </Modal>
    </>
  );
}
