import { useEffect, useRef } from "react";
import { ClientRect, ClientToolTip } from "../../../../../../types/rawTypes.ts";
import { useDashboardContext } from "../../../providers/DashboardProvider.tsx";
import { useMutation } from "@tanstack/react-query";
import { dashBoardApi } from "../../../../../../api/dashBoard/dashBoardApi.ts";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

const OpenedUrl = () => {
  const {
    updateTooltips,
    viewMode,
    setTooltips,
    setFocusedTooltip,
    tooltips,
    focusedTooltip,
    project,
  } = useDashboardContext();
  const params = useParams();

  const iframeRef = useRef<HTMLIFrameElement>(null);

  //state
  const id = focusedTooltip?.id;
  const url = focusedTooltip?.url || project.url;
  const cssSelector = focusedTooltip?.cssSelector;
  const isCustomSelector = focusedTooltip?.isCustomSelector;

  // create new tooltip
  const { mutate: createTooltip } = useMutation(
    (data: ClientToolTip | undefined) =>
      dashBoardApi.createTooltip(data, params!.projectId as string),
    {
      onSuccess: (data) => {
        setTooltips([...tooltips!, data]);
        setFocusedTooltip(data);
        toast.success("Tooltip Added successfully");
      },
      onError: () => {
        toast.error("Server error");
      },
    },
  );

  useEffect(() => {
    if (!id) {
      clearHighlight();
    }
    const handleMessage = (event: MessageEvent) => {
      const messageType = event.data.type;
      const element = event.data.element;
      switch (messageType) {
        case "urlChange":
          if (id) {
            updateTooltips({
              url: event.data.url,
              id,
            });
            if (cssSelector && iframeRef.current) {
              requestElementRect(cssSelector);
            }
          }
          break;
        case "rectResponse":
          if (id) {
            updateTooltips({
              rect: element.rect as ClientRect,
              id,
              cssSelector: element.cssSelector,
              isCustomSelector: false,
            });
          } else if (!focusedTooltip?.nowClosed) {
            createTooltip({
              url: event.data.url,
              rect: element.rect as ClientRect,
              cssSelector: element.cssSelector,
            });
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [focusedTooltip]);

  const requestElementRect = (selector: string) => {
    iframeRef.current?.contentWindow?.postMessage({ type: "getRect", selector }, "*");
  };

  const toggleViewModeOnIframe = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: "viewMode", viewMode }, "*");
  };

  const clearHighlight = () => {
    iframeRef.current?.contentWindow?.postMessage({ type: "deleteHighlight" }, "*");
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (isCustomSelector && !!iframe && !!cssSelector && id) {
      requestElementRect(cssSelector);
      iframe.onload = () => {
        requestElementRect(cssSelector);
      };
    }
  }, [cssSelector, isCustomSelector]);

  useEffect(() => {
    if (id && cssSelector) {
      requestElementRect(cssSelector);
    }
  }, [id]);

  useEffect(() => {
    toggleViewModeOnIframe();
  }, [viewMode]);

  return (
    <div
      className={`w-[100%] h-[100%] relative border-black border-2`}
      onClick={(e) => e.stopPropagation()}
    >
      <iframe
        src={url}
        width={"100%"}
        height={"100%"}
        ref={iframeRef}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};

export default OpenedUrl;
