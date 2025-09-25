import { ClientToolTip } from "../../../types/rawTypes.ts";
import { useEffect, useRef, useState } from "react";

type TooltipProps = {
  tooltip: ClientToolTip;
  tooltipsCount?: number;
  showNextTooltip: () => void
};

const maxTooltipW = 300;

const Tooltip = ({ tooltip, tooltipsCount, showNextTooltip }: TooltipProps) => {
  const tooltipWrap = useRef<HTMLDivElement | null>(null);
  const [leftPosition, setLeftPosition] = useState<number | string | null>(0);
  const [rightPosition, setRightPosition] = useState<number | string | null>(0);

  useEffect(() => {
    if (tooltipWrap.current && tooltip.rect) {
      const tooltipWrapWidth = tooltipWrap.current.offsetWidth;
      if (tooltip.rect.x + maxTooltipW > tooltipWrapWidth) {
        setRightPosition(20);
        setLeftPosition(null);
      } else {
        setLeftPosition(tooltip.rect.x);
        setRightPosition(null);
      }
    }
  }, [tooltipWrap.current, tooltip?.rect?.x, tooltip?.rect?.width]);

  if (!tooltip || (leftPosition === null && rightPosition === null)) {
    return;
  }

  return (
    <div
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      ref={tooltipWrap}
    >
      <div
        style={{
          position: "absolute",
          top: tooltip?.rect ? tooltip.rect.y + tooltip.rect.height + 20 : 0,
          left: leftPosition || "auto",
          right: rightPosition || "auto",
          zIndex: 9999,
          background: "#fff",
          borderRadius: "0.25rem",
          display: "flex",
          maxWidth: 300,
          flexDirection: "column",
          gap: "0.5rem",
          minWidth: "200px",
          padding: "0.75rem",
          ...tooltip.containerStyles,
        }}
      >
        <div style={{ ...tooltip.textStyles }}>{tooltip?.text}</div>
        <button
          onClick={showNextTooltip}
          style={{
            display: "flex",
            color: "rgb(255 255 255)",
            fontSize: "0.875rem",
            fontWeight: 600,
            paddingTop: "0.375rem",
            paddingBottom: "0.375rem",
            paddingLeft: "0.75rem",
            paddingRight: "0.75rem",
            backgroundColor: "rgb(79 70 229)",
            borderRadius: "0.375rem",
            width: "50%",
            justifyContent: "center",
            cursor: "pointer",
            ...tooltip.btnStyles,
          }}
        >
          {tooltip?.btnText}
        </button>
        {tooltip?.skipBtnText && (
          <button
            style={{
              display: "flex",
              color: "rgb(255 255 255)",
              fontSize: "0.875rem",
              fontWeight: 600,
              paddingTop: "0.375rem",
              paddingBottom: "0.375rem",
              paddingLeft: "0.75rem",
              paddingRight: "0.75rem",
              backgroundColor: "rgb(79 70 229)",
              borderRadius: "0.375rem",
              width: "50%",
              justifyContent: "center",
              cursor: "pointer",
              ...tooltip.skipBtnStyles,
            }}
          >
            {tooltip?.skipBtnText}
          </button>
        )}
        <div style={{ ...tooltip.stagesStyle }}>
          stage {tooltip.index! + 1} of {tooltipsCount}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
