import CustomBtn from "../../../CustomBtn/CustomBtn.tsx";
import { CSSProperties, useEffect, useRef, useState } from "react";
import {
  ClientToolTip,
  ComponentNames,
  TooltipStylesComponent,
} from "../../../../types/rawTypes.ts";
import ColorPicker from "../../../ColorPicker/ColorPicker.tsx";
import CustomInput from "../../../CustomFields/CustomInput/CustomInput.tsx";
import Accordion from "../../../Accordion/Accordion.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashBoardApi } from "../../../../api/dashBoard/dashBoardApi.ts";
import { dashBoardDataSerializer } from "../../../../services/serializer.ts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CustomCheckbox from "../../../CustomCheckbox/CustomCheckbox.tsx";
import { useParams } from "next/navigation";
import { useDashboardContext } from "../../../../pages/Projects/DashBoard/providers/DashboardProvider.tsx";

type TooltipItemProps = {
  tooltip: ClientToolTip;
  index: number;
  baseUrl: string;
};

const TooltipItem = ({ tooltip, index, baseUrl }: TooltipItemProps) => {
  const {
    text = "",
    btnText = "",
    skipBtnText = "",
    withStages = false,
    withRedirect = false,
    url = "",
    id = "",
    btnStyles = {},
    textStyles = {},
    containerStyles = {},
    skipBtnStyles = {},
    stagesStyle = {},
    rect,
    cssSelector,
  } = tooltip;

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);

  const params = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { setFocusedTooltip, updateTooltips, focusedTooltip, viewMode, setViewMode } =
    useDashboardContext();

  // react query hooks
  const { mutate: deleteTooltip, isLoading: isDeleteLoading } = useMutation(
    ["tooltips"],
    () => dashBoardApi.deleteTooltip(tooltip.id || "", params!.projectId as string),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["tooltips"]);
        setFocusedTooltip(null);
        toast.success("Tooltip deleted successfully.");
      },
      onError: () => {
        toast.error("Error");
      },
    },
  );
  const { mutate: updateTooltip } = useMutation(
    ({ id, data }: { id: string; data: ClientToolTip }) =>
      dashBoardApi.updateTooltip(id, data, params!.projectId as string),
    {
      onSuccess: () => {
        toast.success("Tooltip Updated Successfully.");
      },
      onError: () => {
        toast.error("Error");
      },
      onMutate: () => {
        setIsUpdateLoading(false);
      },
    },
  );

  /*
    TODO: need to be refactor. The problem is that if the user manually changes the сssSelector,
     then to get a new RECT with iframe needs to make postMessage which is performed in OpenedUrl.jsx
  */
  const rectRef = useRef(rect);
  useEffect(() => {
    rectRef.current = rect;
  }, [rect]);

  const onSaveItem = (tooltipData: ClientToolTip & { type: ComponentNames }) => {
    const { type } = tooltipData;
    if (type === "tooltip" && tooltipData.id) {
      setIsUpdateLoading(true);
      updateTooltips({ ...tooltipData, isCustomSelector: true });
      // TODO: This is the continuation of that part above
      setTimeout(() => {
        updateTooltip({
          id: tooltipData.id!,
          data: dashBoardDataSerializer({ ...tooltipData, rect: rectRef?.current }),
        });
      }, 500);
    }
  };

  // set current tooltip to show
  const onFocus = (open: boolean) => {
    if (open) {
      setFocusedTooltip({ ...tooltip, isCustomSelector: false });
    } else {
      setFocusedTooltip({ nowClosed: true });
    }
  };

  useEffect(() => {
    setCssSelectorValue(cssSelector);
    setUrlValue(url);
  }, [cssSelector, url]);

  // tooltip settings
  const [textValue, setTextValue] = useState(text);
  const [btnValue, setBtnValue] = useState(btnText);
  const [skipButtonValue, setSkipButtonValue] = useState(skipBtnText);
  const [withStagesValue, setWithStagesValue] = useState(withStages);
  const [withRedirectValue, setWithRedirectValue] = useState(withRedirect);
  const [urlValue, setUrlValue] = useState(url);
  const [cssSelectorValue, setCssSelectorValue] = useState(cssSelector);
  // styles
  const [btnStylesValue, setBtnStylesValue] = useState<CSSProperties>(btnStyles || {});
  const [textStylesValue, setTextStylesValue] = useState<CSSProperties>(textStyles || {});
  const [containerStylesValue, setContainerStyles] = useState<CSSProperties>(containerStyles || {});
  const [stagesStyleValue, setStagesStyleValue] = useState<CSSProperties>(stagesStyle || {});
  const [skipBtnStylesValue, setSkipBtnStylesValue] = useState<CSSProperties>(skipBtnStyles || {});

  const onAddHandler = () => {
    onSaveItem({
      id,
      text: textValue,
      btnText: btnValue,
      url: urlValue,
      type: "tooltip",
      textStyles: textStylesValue,
      btnStyles: btnStylesValue,
      containerStyles: containerStylesValue,
      stagesStyle: stagesStyleValue,
      skipBtnStyles: skipBtnStylesValue,
      skipBtnText: skipButtonValue,
      withStages: withStagesValue,
      index: index,
      withRedirect: withRedirectValue,
      cssSelector: cssSelectorValue,
    });
  };

  // change tooltip elements styles
  const changeStylesHandler = (
    type: TooltipStylesComponent,
    styleName: string,
    value: string | number,
  ) => {
    switch (type) {
      case "btnStyles":
        setBtnStylesValue((prev) => ({ ...prev, [styleName]: value }));
        break;
      case "textStyles":
        setTextStylesValue((prev) => ({ ...prev, [styleName]: value }));
        break;
      case "containerStyles":
        setContainerStyles((prev) => ({ ...prev, [styleName]: value }));
        break;
      case "skipBtnStyles":
        setSkipBtnStylesValue((prev) => ({ ...prev, [styleName]: value }));
        break;
      case "stagesStyle":
        setStagesStyleValue((prev) => ({ ...prev, [styleName]: value }));
        break;
      default:
        break;
    }
  };

  const isFocused = focusedTooltip?.id === id;

  return (
    <>
      <Accordion title={t(`Tooltip ${id}`)} open={isFocused} setOpen={onFocus}>
        <div className="rounded p-5 bg-white mb-5 flex flex-col gap-3 relative">
          <CustomCheckbox
            label={"View Mode"}
            checked={viewMode}
            onChange={(e) => setViewMode(e.target.checked)}
            name={"viewMode"}
          />
          <CustomInput
            value={urlValue}
            onChange={(e) => {
              if (e.target.value.includes(baseUrl)) {
                setUrlValue(e.target.value);
              } else {
                setUrlValue(baseUrl);
              }
            }}
            placeholder={t("Enter text")}
            label={t("Url")}
          />
          <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900">
            {t("Text")}
          </label>
          <textarea
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 resize-none"
            rows={5}
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            placeholder={t("Enter text")}
          />
          <CustomInput
            value={btnValue}
            onChange={(e) => setBtnValue(e.target.value)}
            placeholder={t("Enter text")}
            label={t("Button text")}
          />
          <CustomInput
            value={skipButtonValue}
            onChange={(e) => setSkipButtonValue(e.target.value)}
            placeholder={t("Enter text")}
            label={t("Skip button text")}
          />
          <CustomInput
            value={cssSelectorValue}
            onChange={(e) => setCssSelectorValue(e.target.value)}
            placeholder={t("Enter text")}
            label={t("Css selector")}
            multiple
            className={"h-[100px]"}
            extraInfo={
              "Change this field only if you are confident in your skills, otherwise your tooltip may not be displayed"
            }
          />
          <div>
            <CustomCheckbox
              label={"With Stages"}
              checked={withStagesValue}
              onChange={(e) => setWithStagesValue(e.target.checked)}
              name={"withStagesValue"}
            />
            {index !== 0 && (
              <CustomCheckbox
                label={"Redirect To This Page On Next Button Click"}
                checked={withRedirectValue}
                onChange={(e) => setWithRedirectValue(e.target.checked)}
                name={"withRedirectValue"}
              />
            )}
          </div>
          <Accordion title={t("Container Styles")}>
            <div className="flex flex-col gap-3">
              <ColorPicker
                label={t("Background color")}
                color={containerStylesValue.backgroundColor}
                setColor={(color) =>
                  changeStylesHandler("containerStyles", "backgroundColor", color)
                }
              />
            </div>
          </Accordion>
          <Accordion title={t("Text Styles")}>
            <div className="flex flex-col gap-3">
              <ColorPicker
                label={t("Text color")}
                color={textStylesValue.color}
                setColor={(color) => changeStylesHandler("textStyles", "color", color)}
              />
              <CustomInput
                label={t("Text Size")}
                value={textStylesValue.fontSize}
                type="number"
                onChange={(e) => {
                  const parsedValue = e.target.value === "" ? "" : Number(e.target.value);
                  changeStylesHandler("textStyles", "fontSize", parsedValue);
                }}
              />
            </div>
          </Accordion>
          <Accordion title={t("Button Styles")}>
            <div className="flex flex-col gap-3">
              <ColorPicker
                label={t("Background color")}
                color={btnStylesValue.backgroundColor}
                setColor={(color) => changeStylesHandler("btnStyles", "backgroundColor", color)}
              />
              <ColorPicker
                label={t("Text color")}
                color={btnStylesValue.color}
                setColor={(color) => changeStylesHandler("btnStyles", "color", color)}
              />
              <CustomInput
                label={t("Text Size")}
                value={btnStylesValue.fontSize}
                type="number"
                onChange={(e) => {
                  const parsedValue = e.target.value === "" ? "" : Number(e.target.value);
                  changeStylesHandler("btnStyles", "fontSize", parsedValue);
                }}
              />
            </div>
          </Accordion>
          <Accordion title={t("Skip Button Styles")}>
            <div className="flex flex-col gap-3">
              <ColorPicker
                label={t("Background color")}
                color={btnStylesValue.backgroundColor}
                setColor={(color) => changeStylesHandler("skipBtnStyles", "backgroundColor", color)}
              />
              <ColorPicker
                label={t("Text color")}
                color={btnStylesValue.color}
                setColor={(color) => changeStylesHandler("skipBtnStyles", "color", color)}
              />
              <CustomInput
                label={t("Text Size")}
                value={btnStylesValue.fontSize}
                type="number"
                onChange={(e) => {
                  const parsedValue = e.target.value === "" ? "" : Number(e.target.value);
                  changeStylesHandler("skipBtnStyles", "fontSize", parsedValue);
                }}
              />
            </div>
          </Accordion>
          <Accordion title={t("Stages Style")}>
            <div className="flex flex-col gap-3">
              <ColorPicker
                label={t("Text color")}
                color={btnStylesValue.color}
                setColor={(color) => changeStylesHandler("stagesStyle", "color", color)}
              />
              <CustomInput
                label={t("Text Size")}
                value={btnStylesValue.fontSize}
                type="number"
                onChange={(e) => {
                  const parsedValue = e.target.value === "" ? "" : Number(e.target.value);
                  changeStylesHandler("stagesStyle", "fontSize", parsedValue);
                }}
              />
            </div>
          </Accordion>
          <CustomBtn
            title={t("Save")}
            className="mx-auto mt-5"
            onClick={onAddHandler}
            isLoading={isUpdateLoading}
          />
          <CustomBtn
            title={t("Delete")}
            className="mx-auto bg-red-500"
            onClick={() => deleteTooltip()}
            isLoading={isDeleteLoading}
          />
        </div>
      </Accordion>
    </>
  );
};

export default TooltipItem;
