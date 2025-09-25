"use client";

import { I18nextProvider } from "react-i18next";
import { createInstance, InitOptions } from "i18next";
import { ReactNode } from "react";
import initTranslations from "../app/i18n.ts";

type TranslationsProviderParams = {
  locale: string;
  namespaces: string[];
  children?: ReactNode;
  resources?: InitOptions["resources"];
};

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: TranslationsProviderParams) {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
