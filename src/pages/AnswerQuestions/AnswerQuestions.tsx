"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../../api/projects/projectsApi.ts";
import { useParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import DataBoundary from "../../components/DataBoundary/DataBoundary.tsx";
import { AnswerQuestionsScheme } from "../../types/formTypes.ts";
import PersonalFormModal from "./components/PersonalFormModal/PersonalFormModal.tsx";
import AllQuestions from "./components/AllQuestions/AllQuestions.tsx";

const personalAnswers = sessionStorage.getItem("personalAnswers");

const AnswerQuestions = () => {
  const params = useParams();

  const form = useForm<AnswerQuestionsScheme>();

  const { data, isLoading } = useQuery(["project", params!.projectId], () =>
    projectsApi.getQuestions(params!.projectId as string),
  );

  useEffect(() => {
    if (personalAnswers) {
      const parsedPersonalAnswers = JSON.parse(personalAnswers);
      if (parsedPersonalAnswers.projectId === params!.projectId) {
        form.reset({ personalAnswers: parsedPersonalAnswers?.personalAnswers });
      }
    }
    console.log(form.getValues());
  }, []);

  return (
    <FormProvider {...form}>
      <header className="border-b bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-7">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Answer Questions</h1>
          </div>
        </div>
      </header>
      <section className="overflow-hidden bg-slate-50 p-10 flex-1 ">
        <div className="mx-auto">
          <DataBoundary isLoading={isLoading} noData={!data}>
            {data && (
              <>
                <PersonalFormModal personalQuestions={data.personalQuestions} />
                <AllQuestions questions={data.questions} duration={data.duration}/>
              </>
            )}
          </DataBoundary>
        </div>
      </section>
    </FormProvider>
  );
};

export default AnswerQuestions;
