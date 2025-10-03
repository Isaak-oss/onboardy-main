import React from "react";
import { Question } from "../../../../../../types/rawTypes.ts";
import Title from "../../../../../../components/Texts/Title.tsx";
import CustomBtn from "../../../../../../components/CustomBtn/CustomBtn.tsx";

type QuestionsListProps = {
  questions: Question[];
  currentQuestionIdx: number;
  setCurrentQuestionIdx: (currentQuestionIdx: number) => void;
  onFinish: () => void;
};

const QuestionsList = ({
  questions,
  currentQuestionIdx,
  setCurrentQuestionIdx,
  onFinish,
}: QuestionsListProps) => {
  return (
    <div className='flex-[0.5]'>
      <Title text={"Current Question:"} />
      <div>
        <div>
          <p className="text-lg">
            {currentQuestionIdx + 1}. {questions[currentQuestionIdx].question}
          </p>
        </div>
        <div>
          {currentQuestionIdx + 1 < questions.length && (
            <CustomBtn title="Next" onClick={() => setCurrentQuestionIdx(currentQuestionIdx + 1)} />
          )}
          {currentQuestionIdx + 1 === questions.length && (
            <CustomBtn title="Finish" className="bg-green-600" onClick={onFinish} />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;
