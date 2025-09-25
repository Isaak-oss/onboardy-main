import Tooltip from "../../../../../components/Tools/Tooltip/Tooltip.tsx";
import OpenedUrl from "./OpenedUrl/OpenedUrl.tsx";
import { isValidUrl } from "../../../../../services/isValid.ts";
import { useTranslation } from "react-i18next";
import { useDashboardContext } from "../../providers/DashboardProvider.tsx";

const PagePreview = () => {
  const { t } = useTranslation();
  const { focusedTooltip, isTooltipShown, project, tooltips, setFocusedTooltip } = useDashboardContext();

  const showNextTooltip = () => {
    const nextIndex = focusedTooltip!.index! + 1;
    const nextTooltip = tooltips?.find((tooltip) => tooltip.index === nextIndex);
    setFocusedTooltip(nextTooltip ? nextTooltip : null)
  };

  return (
    <div className="border-r-2 p-0 flex-1 ">
      <div className="relative h-full w-full">
        <>
          {isValidUrl(focusedTooltip?.url) || project.url ? (
            <OpenedUrl />
          ) : (
            <h2 className="text-center text-2xl/9 font-bold tracking-tight text-red-500">
              {t("Url not valid or not saved")}
            </h2>
          )}
          {focusedTooltip?.rect && isTooltipShown && (
            <Tooltip
              tooltip={focusedTooltip}
              tooltipsCount={tooltips?.length}
              showNextTooltip={showNextTooltip}
            />
          )}
        </>
      </div>
    </div>
  );
};

export default PagePreview;
