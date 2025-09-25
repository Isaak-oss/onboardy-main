"use client";

import React from "react";
import { useAppDispatch } from "../../store/store.ts";
import { deleteAuth } from "../../store/slices/authSlice.ts";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../LanguageChanger/LanguageChanger.tsx";
import SettingsIcons from "../SvgIcons/SettingsIcons.tsx";
import HeaderLink from "./HeaderLink.tsx";
import ConfigIcon from "../SvgIcons/ConfigIcon.tsx";
import ProjectsIcon from "../SvgIcons/ProjectsIcon.tsx";
import LogOutIcon from "../SvgIcons/LogOutIcon.tsx";

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const logOut = () => {
    dispatch(deleteAuth());
  };

  return (
    <>
      <header className="sticky top-0 z-[100] border-b bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-7">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">TooltipMaster</h1>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageChanger />
            <HeaderLink url={"/settings"} icon={<SettingsIcons />} title={t("Settings")} />
            <HeaderLink url={"/configuration"} icon={<ConfigIcon />} title={t("Configuration")} />
            <HeaderLink url={"/projects"} icon={<ProjectsIcon />} title={t("Projects")} />
            <button
              onClick={logOut}
              className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-red-500 flex items-center gap-1"
            >
              <LogOutIcon />
              Log out
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
