const chartConfig = {
  desktop: { label: "Standard Deviation", color: "#673ab7" },
  mobile: { label: "Avg Interest by Search", color: "#ffa500" },
};

const HoverDetails = ({ month, desktop, mobile, isHovering }) => (
  <div
    style={{
      alignSelf: "flex-end",
      backgroundColor: "transparent",
      padding: "0.5rem",
      opacity: 0.9,
      width: "165px",
      height: "100px",
    }}
  >
    <div style={{ fontSize: "10px", fontWeight: 600, marginBottom: "0.5rem", fontFamily: "Poppins" }}>
      {isHovering ? month : "   "}
    </div>
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}
    >
      <div
        style={{
          width: "0.25rem",
          height: "1.5rem",
          marginRight: "0.5rem",
          backgroundColor: chartConfig.desktop.color,
        }}
      ></div>
      <div style={{ fontSize: "9px", fontFamily: "Poppins", width:"101px" }}>{chartConfig.desktop.label}</div>
      {isHovering && (
        <div
          style={{ marginLeft: "0.5rem", fontSize: "9px", fontWeight: 600, fontFamily: "Poppins" }}
        >
          {desktop}
        </div>
      )}
    </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        style={{
          width: "0.25rem",
          height: "1.5rem",
          marginRight: "0.5rem",
          backgroundColor: chartConfig.mobile.color,
        }}
      ></div>
      <div style={{ fontSize: "9px", fontFamily: "Poppins", width:"101px" }}>{chartConfig.mobile.label}</div>
      {isHovering && (
        <div
          style={{ marginLeft: "0.5rem", fontSize: "9px", fontWeight: 600, fontFamily: "Poppins" }}
        >
          {mobile}
        </div>
      )}
    </div>
  </div>
);

export default HoverDetails;
