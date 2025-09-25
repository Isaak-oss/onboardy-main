"use client";

import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { projectsApi } from "../../../api/projects/projectsApi.ts";
import { useTranslation } from "react-i18next";
import CodeHighlighter from "../../../components/CodeHighlighter/CodeHighlighter.tsx";
import Loader from "../../../components/Loader/Loader.tsx";
import CustomBtn from "../../../components/CustomBtn/CustomBtn.tsx";
import { connectTooltipsToUserScript } from "../../../consts/consts.ts";
import { useAppSelector } from "../../../store/store.ts";
import DeleteIcon from "../../../components/SvgIcons/DeleteIcon.tsx";
import { toast } from "react-toastify";
import BlockWrap from "../../../components/BlockWrap/BlockWrap.tsx";
import CopyBtn from "../../../components/CodeHighlighter/CopyBtn.tsx";
import TabPanel from "../../../components/TabPanel/TabPanel.tsx";

const Project = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const params = useParams();
  const projectId = params!.projectId;

  const { data, isLoading } = useQuery(["projects", projectId], () =>
    projectsApi.getProject(params!.projectId as string),
  );
  const { mutate: deleteProject, isLoading: isDeleteLoading } = useMutation(
    ["projects", projectId],
    () => projectsApi.deleteProject(params!.projectId as string),
    {
      onSuccess: () => {
        router.push("/projects");
        toast.success(t("Project Deleted Successfully"));
      },
    },
  );

  const user = useAppSelector((state) => state.auth.user);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return "No Data";
  }

  return (
    <section className="overflow-hidden bg-slate-50 p-10 flex-1 ">
      <div className="container mx-auto">
        <div className="flex items-start gap-[15px]">
          <div className="flex-1">
            <div className="flex items-center gap-[15px] mb-8">
              <h1 className={"text-2xl font-bold"}>{data.name}</h1>
              {isDeleteLoading ? (
                <Loader />
              ) : (
                <div onClick={() => deleteProject()} className={"cursor-pointer"}>
                  <DeleteIcon />
                </div>
              )}
            </div>
            <BlockWrap>
              <h2 className={"text-2xl font-semibold leading-none tracking-tight pb-1"}>
                {t("Project")} ID
              </h2>
              <CodeHighlighter codeString={data.id.toString() || ""} />
            </BlockWrap>
            <BlockWrap additionalClassNames={"mt-6"}>
              <h2 className={"text-2xl font-semibold leading-none tracking-tight pb-1"}>
                {t("Base Url")}
              </h2>
              <p className="text-sm text-muted-foreground mt-6">{data?.url}</p>
            </BlockWrap>
            <BlockWrap additionalClassNames={"mt-6"}>
              <h2 className={"text-2xl font-semibold leading-none tracking-tight pb-1"}>
                {t("Description")}
              </h2>
              <p className="text-sm text-muted-foreground mt-6">{data?.description}</p>
            </BlockWrap>
            <BlockWrap additionalClassNames={"mt-6"}>
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">Installation Script</h3>
                <CopyBtn
                  codeString={connectTooltipsToUserScript(
                    projectId as string,
                    user?.apiKey || "",
                    process.env.NEXT_PUBLIC_BASE_API_URL || "",
                  )}
                />
              </div>
              <CodeHighlighter
                codeString={connectTooltipsToUserScript(
                  projectId as string,
                  user?.apiKey || "",
                  process.env.NEXT_PUBLIC_BASE_API_URL || "",
                )}
              />
              <p className="text-sm text-muted-foreground mt-6">
                {t("You must insert this script on your Web-app/Web-site for tooltip show")}
              </p>
            </BlockWrap>
            <BlockWrap additionalClassNames={"mt-6"}>
              <h2 className={"text-2xl font-semibold leading-none tracking-tight mb-6"}>
                {t("Dashboard")}
              </h2>
              <p className={"text-sm mb-6"}>
                {t(
                  "If you need to be authorized in your project to get access to the pages on which you want to place Tooltips, first pass authorization (saved data for entering such as token will be stored only within your browser)",
                )}
              </p>
              <CustomBtn
                title={t("Authorize In My Web-app/Web-site")}
                className={"max-w-[auto] mb-6"}
                onClick={() => router.push(`/projects/${projectId}/access`)}
              />
              <p className={"text-sm mb-6"}>
                {t("If you ready to create tooltips, click button under this message :)")}
              </p>
              <CustomBtn
                title={t("Open Project Dashboard")}
                className={"max-w-[auto]"}
                onClick={() => router.push(`/projects/${projectId}/dashboard`)}
              />
            </BlockWrap>
          </div>
          <div className="flex-[0.5]">
            <BlockWrap additionalClassNames={"mt-[65px]"}>
              <h3 className="text-2xl font-semibold leading-none tracking-tight mb-6">
                Quick Help
              </h3>
              <TabPanel
                tabs={[
                  {
                    title: "Setup",
                    content: (
                      <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4">
                        <h4 className="font-medium">Getting Started</h4>
                        <ol className="list-decimal pl-4 space-y-2 text-sm">
                          <li>Copy the installation script</li>
                          <li>Paste it into your website's header</li>
                          <li>Authorize your website</li>
                          <li>Start creating tooltips</li>
                        </ol>
                      </div>
                    ),
                  },
                  {
                    title: "Usage",
                    content: (
                      <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4">
                        <h4 className="font-medium">Creating Tooltips</h4>
                        <p className="text-sm">
                          After authorization, you can select elements on your website and add
                          tooltips to them. Customize appearance, timing, and behavior from the
                          dashboard.
                        </p>
                      </div>
                    ),
                  },
                  {
                    title: "FAQ",
                    content: (
                      <div className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4 mt-4">
                        <h4 className="font-medium">Common Questions</h4>
                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>Q: Is it secure?</strong>
                          </p>
                          <p>A: Yes, all authorization data is stored locally in your browser.</p>
                        </div>
                      </div>
                    ),
                  },
                ]}
              />
            </BlockWrap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
