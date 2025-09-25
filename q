[33mcommit eabe2a841ad2b2bf829842e2353c5f5da4cdb9d0[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m, [m[1;31morigin/develop[m[33m)[m
Author: iSAAK <gajerjosif@gmail.com>
Date:   Fri Apr 4 17:31:58 2025 +0600

    show next tooltip on click Next btn on dashboard

[1mdiff --git a/src/components/Tools/Tooltip/Tooltip.tsx b/src/components/Tools/Tooltip/Tooltip.tsx[m
[1mindex 1f5ace4..5a023d7 100644[m
[1m--- a/src/components/Tools/Tooltip/Tooltip.tsx[m
[1m+++ b/src/components/Tools/Tooltip/Tooltip.tsx[m
[36m@@ -4,11 +4,12 @@[m [mimport { useEffect, useRef, useState } from "react";[m
 type TooltipProps = {[m
   tooltip: ClientToolTip;[m
   tooltipsCount?: number;[m
[32m+[m[32m  showNextTooltip: () => void[m
 };[m
 [m
 const maxTooltipW = 300;[m
 [m
[31m-const Tooltip = ({ tooltip, tooltipsCount }: TooltipProps) => {[m
[32m+[m[32mconst Tooltip = ({ tooltip, tooltipsCount, showNextTooltip }: TooltipProps) => {[m
   const tooltipWrap = useRef<HTMLDivElement | null>(null);[m
   const [leftPosition, setLeftPosition] = useState<number | string | null>(0);[m
   const [rightPosition, setRightPosition] = useState<number | string | null>(0);[m
[36m@@ -62,6 +63,7 @@[m [mconst Tooltip = ({ tooltip, tooltipsCount }: TooltipProps) => {[m
       >[m
         <div style={{ ...tooltip.textStyles }}>{tooltip?.text}</div>[m
         <button[m
[32m+[m[32m          onClick={showNextTooltip}[m
           style={{[m
             display: "flex",[m
             color: "rgb(255 255 255)",[m
[1mdiff --git a/src/consts/consts.ts b/src/consts/consts.ts[m
[1mindex 9e0be90..398c270 100644[m
[1m--- a/src/consts/consts.ts[m
[1m+++ b/src/consts/consts.ts[m
[36m@@ -24,6 +24,7 @@[m [mexport const interactiveScript = `[m
                 '*'[m
         );[m
         const element = document.querySelector(event.data.selector);[m
[32m+[m[32m        element.scrollIntoView({ behavior: "smooth", block: "center" });[m
         createHighlightBlock(element)[m
       }[m
       if (event.data.type === "viewMode") {[m
[1mdiff --git a/src/pages/Projects/DashBoard/components/PagePreview/OpenedUrl/OpenedUrl.tsx b/src/pages/Projects/DashBoard/components/PagePreview/OpenedUrl/OpenedUrl.tsx[m
[1mindex 45a4b80..4f6e128 100644[m
[1m--- a/src/pages/Projects/DashBoard/components/PagePreview/OpenedUrl/OpenedUrl.tsx[m
[1m+++ b/src/pages/Projects/DashBoard/components/PagePreview/OpenedUrl/OpenedUrl.tsx[m
[36m@@ -43,7 +43,6 @@[m [mconst OpenedUrl = () => {[m
   );[m
 [m
   useEffect(() => {[m
[31m-    console.log(focusedTooltip?.nowClosed)[m
     if (!id) {[m
       clearHighlight();[m
     }[m
[1mdiff --git a/src/pages/Projects/DashBoard/components/PagePreview/PagePreview.tsx b/src/pages/Projects/DashBoard/components/PagePreview/PagePreview.tsx[m
[1mindex 6e1be79..5e9c66d 100644[m
[1m--- a/src/pages/Projects/DashBoard/components/PagePreview/PagePreview.tsx[m
[1m+++ b/src/pages/Projects/DashBoard/components/PagePreview/PagePreview.tsx[m
[36m@@ -6,7 +6,13 @@[m [mimport { useDashboardContext } from "../../providers/DashboardProvider.tsx";[m
 [m
 const PagePreview = () => {[m
   const { t } = useTranslation();[m
[31m-  const { focusedTooltip, isTooltipShown, project, tooltips } = useDashboardContext();[m
[32m+[m[32m  const { focusedTooltip, isTooltipShown, project, tooltips, setFocusedTooltip } = useDashboardContext();[m
[32m+[m
[32m+[m[32m  const showNextTooltip = () => {[m
[32m+[m[32m    const nextIndex = focusedTooltip!.index! + 1;[m
[32m+[m[32m    const nextTooltip = tooltips?.find((tooltip) => tooltip.index === nextIndex);[m
[32m+[m[32m    setFocusedTooltip(nextTooltip ? nextTooltip : null)[m
[32m+[m[32m  };[m
 [m
   return ([m
     <div className="border-r-2 p-0 flex-1 ">[m
[36m@@ -20,7 +26,11 @@[m [mconst PagePreview = () => {[m
             </h2>[m
           )}[m
           {focusedTooltip?.rect && isTooltipShown && ([m
[31m-            <Tooltip tooltip={focusedTooltip} tooltipsCount={tooltips?.length} />[m
[32m+[m[32m            <Tooltip[m
[32m+[m[32m              tooltip={focusedTooltip}[m
[32m+[m[32m              tooltipsCount={tooltips?.length}[m
[32m+[m[32m              showNextTooltip={showNextTooltip}[m
[32m+[m[32m            />[m
           )}[m
         </>[m
       </div>[m
