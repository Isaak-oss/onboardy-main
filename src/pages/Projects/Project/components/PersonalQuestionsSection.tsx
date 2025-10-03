import React from "react";
import Title from "../../../../components/Texts/Title.tsx";
import BlockWrap from "../../../../components/BlockWrap/BlockWrap.tsx";
import { PersonalQuestion } from "../../../../types/rawTypes.ts";

const PersonalQuestionsSection = ({
  personalQuestions,
}: {
  personalQuestions: PersonalQuestion[];
}) => {
  return (
    <BlockWrap>
      <Title text={"Personal Questions"} />
      <ol>
        {personalQuestions.map((question, index) => (
          <li key={index}>
            <p className="text-sm text-muted-foreground pb-1">
              {index + 1}. {question.field} (Answer Type: {question.fieldType}) <br />
              Answer:{" "}
              <span className={`text-${question.answer ? "blue-600" : "red-500"}`}>
                {question.answer || "Not Answered yet"}
              </span>
            </p>
          </li>
        ))}
      </ol>
    </BlockWrap>
  );
};

export default PersonalQuestionsSection;
