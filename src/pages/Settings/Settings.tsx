"use client";

import React, { useEffect, useState } from "react";
import CodeHighlighter from "../../components/CodeHighlighter/CodeHighlighter.tsx";
import { useAppSelector } from "../../store/store.ts";
import { TooltipStylesComponent } from "../../types/rawTypes.ts";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea.tsx";
import { defaultStylesExample } from "../../consts/consts.ts";
import CustomBtn from "../../components/CustomBtn/CustomBtn.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { settingsApi } from "../../api/settings/settingsApi.ts";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { t } = useTranslation();
  const apiKey = useAppSelector((state) => state.auth.user?.apiKey);
  const [styles, setStyles] = useState({ containerStyles: "", textStyles: "", btnStyles: "" });

  const { data } = useQuery(["settings"], settingsApi.getMySettings);
  const { mutate } = useMutation(["settings"], settingsApi.updateSettings, {
    onSuccess: () => {
      toast.success(t("Settings updated successfully"));
    },
    onError: () => {
      toast.error(t("Settings updated failed"));
    },
  });

  const changeStylesHandler = (type: TooltipStylesComponent, value: string) => {
    setStyles((prev) => ({ ...prev, [type]: value }));
  };

  const onSaveStyles = () => {
    mutate({ defaultTooltipStyles: styles });
  };

  useEffect(() => {
    if (data?.defaultTooltipStyles) {
      setStyles(data.defaultTooltipStyles);
    }
  }, [data]);

  return (
    <section className="bg-gray-300 p-10 flex-1">
      <h1 className={"text-2xl/9 font-bold tracking-tight text-gray-900"}>{t("Settings")}</h1>
      <div className="mt-5">
        <div>{t("Your api key")}</div>
        <div className={"w-[50%]"}>
          <CodeHighlighter codeString={apiKey || ""} />
        </div>
      </div>
      <div className="mt-5">
        <div>{t("Set default styles to Tooltip")}</div>
        <div className="mt-3">
          <div>{t("Example")}</div>
          <CustomTextarea disabled value={defaultStylesExample} />
        </div>
        <div className="mt-2">{t("Container styles")}</div>
        <CustomTextarea
          onChange={(e) => changeStylesHandler("containerStyles", e.target.value)}
          value={styles.containerStyles}
        />
        <div className="mt-2">{t("Text styles")}</div>
        <CustomTextarea
          onChange={(e) => changeStylesHandler("textStyles", e.target.value)}
          value={styles.textStyles}
        />
        <div className="mt-2">{t("Button styles")}</div>
        <CustomTextarea
          onChange={(e) => changeStylesHandler("btnStyles", e.target.value)}
          value={styles.btnStyles}
        />
        <CustomBtn title={t("Save")} onClick={onSaveStyles} className={"mt-5 w-[100px]"} />
      </div>
    </section>
  );
};

export default Settings;
