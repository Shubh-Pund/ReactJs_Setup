import React from 'react'
import PropTypes from "prop-types";
import "./ToggleButton.css";

export default function BasicToggle({isActive,
    onToggle,
    onLabel = "On",
    offLabel = "Off",
    onColor = "green",
    offColor = "red",
    knobColor = "white",
    className = ""}) {
      // console.log("isActive Value===>", isActive);
      
      return (
    <div
      className={`custom-toggle ${className} ${isActive ? "active" : ""}`}
      onClick={onToggle}
      role="switch"
      aria-checked={isActive}
      style={{
        backgroundColor: isActive ? onColor : offColor,
        borderColor: isActive ? onColor : offColor,
      }}
    >
      {/* Render label on the opposite side of the knob */}
      <span
        className={`toggle-label ${isActive ? "label-left" : "label-right"}`}
      >
        {isActive ? onLabel : offLabel}
      </span>

      <div
        className={`toggle-knob ${isActive ? "active" : ""}`}
        style={{ backgroundColor: knobColor }}
      />
    </div>
  )
}

BasicToggle.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onToggle: PropTypes.func.isRequired,
    onLabel: PropTypes.string,
    offLabel: PropTypes.string,
    onColor: PropTypes.string,
    offColor: PropTypes.string,
    knobColor: PropTypes.string,
    className: PropTypes.string,
  };