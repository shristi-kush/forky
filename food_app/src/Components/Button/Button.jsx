import React from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, title, type, size, disabled, style }) => {
  return (
    <div>
      <button
        onClick={onClick}
        disabled={disabled}
        type={type}
        style={{
          ...style,
          backgroundColor: type === "outline" ? "white" : "#E12653",
          color: type === "outline" ? "#333" : "white",
          borderRadius: "2em",
          border: type === "outline" ? "1px solid #333" : "1px solid #E12653",
          width: size === "large" ? "150px" : "80px",
          padding: "0.6em",
          cursor: disabled === "true" ? "" : "pointer",
        }}
      >
        {title}
      </button>
    </div>
  );
};

Button.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([null, undefined]),
  ]),
};

export default Button;
