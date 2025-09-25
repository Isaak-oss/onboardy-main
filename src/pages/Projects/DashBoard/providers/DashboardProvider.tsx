import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { ClientToolTip, Project } from "../../../../types/rawTypes.ts";

type AdditionalFocusedTooltipProps = { isCustomSelector?: boolean; nowClosed?: boolean };

type DashboardContextType = {
  tooltips: ClientToolTip[] | null;
  focusedTooltip: (ClientToolTip & AdditionalFocusedTooltipProps) | null;
  isTooltipShown: boolean;
  setTooltips: (tooltips: ClientToolTip[] | null) => void;
  updateTooltips: (tooltip: Partial<ClientToolTip & AdditionalFocusedTooltipProps> | null) => void;
  setFocusedTooltip: (tooltip: (ClientToolTip & AdditionalFocusedTooltipProps) | null) => void;
  setIsTooltipShown: (isShown: boolean) => void;
  project: Project;
  viewMode: boolean;
  setViewMode: (viewMode: boolean) => void;
};

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: { tooltips: ClientToolTip[]; project: Project };
}) => {
  const [tooltips, setTooltips] = useState<ClientToolTip[] | null>(initialState.tooltips || null);
  const [focusedTooltip, setFocusedTooltip] = useState<
    (ClientToolTip & { isCustomSelector?: boolean }) | null
  >(null);
  const [isTooltipShown, setIsTooltipShown] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<boolean>(true);

  const updateTooltips = (
    payload: Partial<ClientToolTip & { isCustomSelector?: boolean }> | null,
  ) => {
    if (!payload || !tooltips) return;
    setTooltips(
      (prevTooltips) =>
        prevTooltips?.map((tooltip) => {
          if (tooltip.id === payload.id) {
            const updatedTooltip = { ...tooltip, ...payload };
            setFocusedTooltip(updatedTooltip);
            return updatedTooltip;
          }
          return tooltip;
        }) || null,
    );
  };

  useEffect(() => {
    setTooltips(initialState.tooltips || null);
  }, [initialState.tooltips]);

  return (
    <DashboardContext.Provider
      value={{
        tooltips,
        focusedTooltip,
        isTooltipShown,
        setTooltips,
        updateTooltips,
        setFocusedTooltip,
        setIsTooltipShown,
        project: initialState.project,
        viewMode,
        setViewMode,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useClientContext must be used within a ClientProvider");
  }
  return context;
};
