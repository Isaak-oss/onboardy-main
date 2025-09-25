"use client";

import React from "react";
import CodeHighlighter from "../../components/CodeHighlighter/CodeHighlighter.tsx";
import { interactiveScript } from "../../consts/consts.ts";
import { useTranslation } from "react-i18next";
import CopyBtn from "../../components/CodeHighlighter/CopyBtn.tsx";

const Configuration = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-300 p-10 flex-1">
      <h1 className={"text-2xl/9 font-bold tracking-tight text-gray-900"}>
        {t("How to configure your project")}
      </h1>
      <div className="mt-5">
        <div>
          1.{" "}
          {t(
            'Check your WEB-site/WEB-app for "X-Frame-Options". It`s can block the display on our dashboard',
          )}
        </div>
      </div>
      <div className="mt-5">
        <div>2. {t("You need to add this script to create a tooltips on our Dashboard")}</div>
        <div className={"w-[50%]"}>
          <CopyBtn codeString={interactiveScript} />
          <CodeHighlighter codeString={interactiveScript} />
        </div>
      </div>
      <div className="mt-5">
        <div>
          3.{" "}
          {t(
            "For Tooltip show you need script which you can find in the project (Projects -> Project)",
          )}
        </div>
      </div>
    </section>
  );
};

export default Configuration;
