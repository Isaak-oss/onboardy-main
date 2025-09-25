import React from "react";
import { useDashboardContext } from "../providers/DashboardProvider.tsx";
import BlockWrap from "../../../../components/BlockWrap/BlockWrap.tsx";
import CustomBtn from "../../../../components/CustomBtn/CustomBtn.tsx";

const ShortInfo = () => {
  const { project, viewMode, setViewMode, setFocusedTooltip, focusedTooltip } =
    useDashboardContext();

  const onAddTooltipHandler = () => {
    setFocusedTooltip({});
    if (focusedTooltip?.id) {
      setViewMode(false);
    } else {
      setViewMode(!viewMode);
    }
  };

  return (
    <BlockWrap additionalClassNames="mb-5">
      <div className="flex items-center justify-between">
        <h2 className="flex-1">Project Base Url: {project.url}</h2>
        <div className="flex-[0.4] flex items-center gap-2 justify-end">
          <CustomBtn
            title={
              !focusedTooltip?.id && !viewMode
                ? "Create tooltip, choose element"
                : "Add new tooltip"
            }
            onClick={onAddTooltipHandler}
          />
        </div>
      </div>
    </BlockWrap>
  );
};

export default ShortInfo;
