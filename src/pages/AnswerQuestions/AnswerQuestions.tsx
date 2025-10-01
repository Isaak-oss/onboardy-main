"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../../api/projects/projectsApi.ts";
import { useParams } from "next/navigation";
import Loader from "../../components/Loader/Loader.tsx";

const AnswerQuestions = () => {
  const params = useParams();

  const { data: questions, isLoading } = useQuery(["project", params!.projectId], () =>
    projectsApi.getQuestions(params!.projectId as string),
  );

  return (
    <>
      <header className="sticky top-0 z-[100] border-b bg-white shadow-sm">
        <div className="flex h-16 items-center justify-between px-7">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-primary">Answer Questions</h1>
          </div>
        </div>
      </header>
      <section className="overflow-hidden bg-slate-50 p-10 flex-1 ">
        <div className="container mx-auto">
          {isLoading ? (
            <Loader />
          ) : !questions ? (
            "Questions Failed to Load"
          ) : (
            <ol>
              {questions.map((question, index) => (
                <li key={index}>
                  <p className="text-lg">
                    {index + 1}. {question.question || "Empty"}{" "}
                    {question.note && `(${question.note})`}
                  </p>
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
};

export default AnswerQuestions;
