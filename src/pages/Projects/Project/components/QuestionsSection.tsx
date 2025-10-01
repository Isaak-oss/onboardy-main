import React from "react";
import Title from "../../../../components/Texts/Title.tsx";
import { Question } from "../../../../types/rawTypes.ts";
import BlockWrap from "../../../../components/BlockWrap/BlockWrap.tsx";

const QuestionsSection = ({ questions }: { questions: Question[] }) => {
  return (
    <BlockWrap>
      <Title text={"Questions"} />
      <ol>
        {questions.map((question, index) => (
          <li key={index}>
            <p className="text-sm text-muted-foreground ">
              {index + 1}. {question.question || "Empty"} {question.note && `(${question.note})`}
            </p>
          </li>
        ))}
      </ol>
    </BlockWrap>
  );
};

export default QuestionsSection;
