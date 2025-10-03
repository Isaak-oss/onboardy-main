import React, { useState } from "react";
import { QuestionsViewTypes } from "../../AllQuestions.tsx";
import { Question } from "../../../../../../types/rawTypes.ts";
import WebCamRecorder from "./WebCamRecorder.tsx";
import QuestionsList from "./QuestionsList.tsx";
import { useCameraCapture } from "./useCameraCapture.ts";

const CameraView = ({
  setView,
  questions,
  duration,
}: {
  setView: (view: QuestionsViewTypes) => void;
  questions: Question[];
  duration: number;
}) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);

  const { webcamRef, seconds } = useCameraCapture({ onError: () => setView("error") });

  const onFinish = () => {
    setView("success");
  };

  return (
    <div className={'relative'}>
      <div className="flex gap-5">
        <WebCamRecorder webcamRef={webcamRef} seconds={seconds} duration={duration} />
        <QuestionsList
          currentQuestionIdx={currentQuestionIdx}
          setCurrentQuestionIdx={setCurrentQuestionIdx}
          questions={questions}
          onFinish={onFinish}
        />
      </div>
    </div>
  );
};

export default CameraView;
