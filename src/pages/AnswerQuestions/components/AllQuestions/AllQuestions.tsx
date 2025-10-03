import React, { useState } from "react";
import { Question } from "../../../../types/rawTypes.ts";
import MainView from "./ScreenView/MainView.tsx";
import CameraView from "./ScreenView/CameraView/CameraView.tsx";
import SuccessView from "./ScreenView/SuccessView.tsx";
import ErrorView from "./ScreenView/ErrorView.tsx";

export type QuestionsViewTypes = "main" | "camera" | "error" | "success";

const AllQuestions = ({ questions, duration }: { questions: Question[], duration: number }) => {
  const [view, setView] = useState<QuestionsViewTypes>("main");

  const getCurrentView = () => {
    switch (view) {
      case "camera":
        return <CameraView setView={setView} questions={questions} duration={duration}/>;
      case "success":
        return <SuccessView setView={setView} />;
      case "error":
        return <ErrorView setView={setView} />;
      default:
        return <MainView setView={setView} />;
    }
  };

  return <div>{getCurrentView()}</div>;
};

export default AllQuestions;
