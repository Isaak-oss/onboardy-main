import TooltipItem from "../../../../../components/Tools/Tooltip/TooltipItem/TooltipItem.tsx";
import { useTranslation } from "react-i18next";
import { useDashboardContext } from "../../providers/DashboardProvider.tsx";

const SideBar = () => {
  const { t } = useTranslation();
  const { tooltips, isTooltipShown, setIsTooltipShown, project } = useDashboardContext();

  const toggleShownBtn = () => {
    setIsTooltipShown(!isTooltipShown);
  };

  return (
    <div className="overflow-y-scroll p-5 w-[30%] max-h-[75vh]">
      {tooltips && tooltips.length > 0 && (
        <>
          <div className="flex items-center mb-5">
            <input
              id="toggleTooltip"
              type="checkbox"
              className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              onChange={toggleShownBtn}
              checked={isTooltipShown}
            />
            <label className="ml-3 min-w-0 flex-1" htmlFor="toogleTooltip">
              {t("Toggle tooltips preview")}
            </label>
          </div>
          {tooltips?.map((tooltip, index) => (
            <TooltipItem tooltip={tooltip} index={index} baseUrl={project.url} />
          ))}
        </>
      )}
    </div>
  );
};

export default SideBar;
