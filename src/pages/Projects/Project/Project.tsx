"use client";

import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { projectsApi } from "../../../api/projects/projectsApi.ts";
import { useTranslation } from "react-i18next";
import Loader from "../../../components/Loader/Loader.tsx";
import DeleteIcon from "../../../components/SvgIcons/DeleteIcon.tsx";
import { toast } from "react-toastify";
import DescriptionSection from "./components/DescriptionSection.tsx";
import QuestionsSection from "./components/QuestionsSection.tsx";
import ArrowIcon from "../../../components/SvgIcons/ArrowIcon.tsx";
import { EditBtn } from "../../../components/ActionBtns/ActionBtns.tsx";
import ProjectForm from "../Overview/components/ProjectForm/ProjectForm.tsx";
import PersonalQuestionsSection from "./components/PersonalQuestionsSection.tsx";

const Project = () => {
  const { t } = useTranslation();

  const router = useRouter();
  const params = useParams();
  const projectId = params!.projectId;

  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery(["project", projectId], () =>
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
              <div onClick={() => router.back()} className="cursor-pointer">
                <ArrowIcon color="#000" direction="left" />
              </div>
              <h1 className={"text-2xl font-bold"}>{data.name}</h1>
              {isDeleteLoading ? (
                <Loader />
              ) : (
                <div onClick={() => deleteProject()} className={"cursor-pointer"}>
                  <DeleteIcon />
                </div>
              )}
              <EditBtn onClick={() => setIsFormOpen(!isFormOpen)} />
              <div className="ml-auto">
                Max Duration: {data.duration} minute
                <div className="flex items-center gap-1">
                  <p>Link for interviewer:</p>
                  <a
                    className="text-blue-600 underline"
                    href={`${process.env.NEXT_PUBLIC_PUBLIC_LINK_URL}answer-question/${data?.id}`}
                  >
                    {process.env.NEXT_PUBLIC_PUBLIC_LINK_URL}answer-question/{data?.id}
                  </a>
                </div>
              </div>
            </div>
            {!isFormOpen ? (
              <div className="flex flex-col gap-2">
                <DescriptionSection description={data?.description} />
                <PersonalQuestionsSection personalQuestions={data?.personalQuestions} />
                <QuestionsSection questions={data?.questions} />
              </div>
            ) : (
              <ProjectForm onClose={() => setIsFormOpen(false)} projectData={data} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Project;
