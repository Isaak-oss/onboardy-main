import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomInput from "../../../../../../components/CustomFields/CustomInput/CustomInput.tsx";
import CustomBtn from "../../../../../../components/CustomBtn/CustomBtn.tsx";
import { ProjectScheme } from "../../../../../../types/formTypes.ts";
import { projectFormDefaultValues } from "../useProjectForm.ts";

const QuestionsFields = () => {
  const { control, watch, setValue } = useFormContext<ProjectScheme>();

  const questions = watch("questions");

  const addNewQuestion = () => {
    setValue("questions", [...questions, ...projectFormDefaultValues.questions]);
  };

  const deleteQuestion = (index: number) => {
    setValue(
      "questions",
      questions.filter((_, idx) => idx !== index),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="block text-sm/6 font-medium text-gray-900">Questions:</div>
      {questions.map((_, index) => (
        <div className="border border-gray-950 p-2 rounded-md flex flex-col gap-2 ml-2" key={index}>
          <Controller
            control={control}
            name={`questions.${index}.question`}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                label={"Question"}
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name={`questions.${index}.note`}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                label={"Question note"}
                value={value}
                onChange={onChange}
                error={error?.message}
              />
            )}
          />
          <div className="flex gap-2">
            {questions.length > 1 && (
              <CustomBtn
                title="Delete"
                className="w-[150px] mt-5 bg-red-500"
                onClick={() => deleteQuestion(index)}
                type="button"
              />
            )}
            {index === questions.length - 1 && (
              <CustomBtn
                title="Add new question"
                className="w-[150px] mt-5 bg-green-600"
                onClick={addNewQuestion}
                type="button"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionsFields;
