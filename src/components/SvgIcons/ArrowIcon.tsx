import React from "react";

type ArrowIconProps = {
  size?: number;
  color?: string;
  direction?: "left" | "right" | "top" | "bottom";
};

const ArrowIcon = ({ size, color, direction }: ArrowIconProps) => {
  const getDirection = () => {
    switch (direction) {
      case "left":
        return "0deg";
      case "right":
        return "180deg";
      case "bottom":
        return "-90deg";
      case "top":
        return "90deg";
      default:
        return "0deg";
    }
  };

  return (
    <svg
      style={{ transform: `rotate(${getDirection()})` }}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size || 20}
      height={size || 20}
      fill={color}
    >
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"></path>
    </svg>
  );
};

export default ArrowIcon;
