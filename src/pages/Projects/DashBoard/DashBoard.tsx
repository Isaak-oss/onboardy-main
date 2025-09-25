"use client";

import SideBar from "./components/SideBar/SideBar.tsx";
import PagePreview from "./components/PagePreview/PagePreview.tsx";
import { useQuery } from "@tanstack/react-query";
import { dashBoardApi } from "../../../api/dashBoard/dashBoardApi.ts";
import { useParams } from "next/navigation";
import { projectsApi } from "../../../api/projects/projectsApi.ts";
import Loader from "../../../components/Loader/Loader.tsx";
import { DashboardProvider } from "./providers/DashboardProvider.tsx";
import ShortInfo from "./components/ShortInfo.tsx";

const DashBoard = () => {
  const params = useParams();
  const { data, isLoading } = useQuery(
    ["tooltips"],
    () => dashBoardApi.getTooltips(params!.projectId as string),
    {
      enabled: !!params?.projectId,
      select: (data) => (data ? [...data].sort((a, b) => a.index! - b.index!) : []),
    },
  );
  const { data: project, isLoading: isProjectLoading } = useQuery(
    ["projects", params!.projectId],
    () => projectsApi.getProject(params!.projectId as string),
  );

  if (isProjectLoading || isLoading) {
    return <Loader />;
  }

  return (
    <DashboardProvider
      initialState={{
        tooltips: data!.map((tooltip) => ({
          ...tooltip,
          url: tooltip.url?.includes(project?.url || "") ? tooltip.url : project?.url,
        })),
        project: project!,
      }}
    >
      <section className="overflow-hidden bg-slate-50 p-5 flex-1 flex flex-col">
        <ShortInfo />
        <div className="flex flex-1">
          <PagePreview />
          <SideBar />
        </div>
      </section>
    </DashboardProvider>
  );
};

export default DashBoard;
