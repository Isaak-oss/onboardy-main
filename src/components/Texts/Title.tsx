import React from "react";
import { useTranslation } from "react-i18next";

const Title = ({ text }: { text: string }) => {
  const { t } = useTranslation();

  return <h2 className={"text-2xl font-semibold leading-none tracking-tight pb-5"}>{t(text)}</h2>;
};

export default Title;
