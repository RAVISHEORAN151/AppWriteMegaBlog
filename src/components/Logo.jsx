import React from "react";
import "../Logo.css";

function Logo({ width = "42px" }) {
  return (
    <div className="logo-wrapper">
      <div className="logo-glow" />

      <div className="logo-box">
        <i
          className="fa-brands fa-studiovinari logo-icon"
          style={{ fontSize: width }}
        />
      </div>
    </div>
  );
}

export default Logo;