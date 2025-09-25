"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { ReactNode } from "react";

const ProgressBarProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar height="4px" color="#000" options={{ showSpinner: true }} shallowRouting />
    </>
  );
};

export default ProgressBarProvider;
