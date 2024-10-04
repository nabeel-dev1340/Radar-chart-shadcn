import React, { useState } from "react";

const RadioButtonGroup = ({ selectedValue, handleRadioChange, disableBrand }) => {
  // State to control tooltip visibility
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div
        style={{ position: "relative", display: "flex", alignItems: "center" }}
        onMouseEnter={() => disableBrand && setIsTooltipVisible(true)} // Show tooltip on hover
        onMouseLeave={() => setIsTooltipVisible(false)} // Hide tooltip when not hovering
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            fontFamily: "Poppins",
          }}
        >
          <input
            type="radio"
            name="seasonality_type"
            id="seasonality_brand"
            value="Brand"
            checked={selectedValue === "Brand"}
            onChange={handleRadioChange}
            disabled={disableBrand}
            style={{
              marginRight: "5px",
              width: "14px",
              height: "14px",
              accentColor: selectedValue === "Brand" ? "black" : "transparent",
              cursor: disableBrand ? "not-allowed" : "pointer", // Change cursor on hover
            }}
          />
          Brand
        </label>

        {/* Show tooltip when disabled and hovered */}
        {disableBrand && isTooltipVisible && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "100%",
              transform: "translateX(10px) translateY(-50%)",
              backgroundColor: "#333",
              color: "#fff",
              padding: "5px",
              fontSize: "10px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
              zIndex: "10",
              opacity: 1, // Always visible when the state is true
              transition: "opacity 0.2s ease",
            }}
          >
            Brand data is not available
          </div>
        )}
      </div>

      <label style={{ display: "flex", alignItems: "center", fontSize: "12px", fontFamily: "Poppins" }}>
        <input
          type="radio"
          name="seasonality_type"
          id="seasonality_category"
          value="Group"
          checked={selectedValue === "Group"}
          onChange={handleRadioChange}
          style={{
            marginRight: "5px",
            width: "14px",
            height: "14px",
            accentColor: selectedValue === "Group" ? "black" : "transparent",
          }}
        />
        Group
      </label>
    </div>
  );
};

export default RadioButtonGroup;
