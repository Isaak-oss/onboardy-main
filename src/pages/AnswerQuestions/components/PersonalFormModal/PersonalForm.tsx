import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { AnswerQuestionsScheme } from "../../../../types/formTypes.ts";
import CustomInput from "../../../../components/CustomFields/CustomInput/CustomInput.tsx";
import { PersonalQuestion } from "../../../../types/rawTypes.ts";
import CustomBtn from "../../../../components/CustomBtn/CustomBtn.tsx";
import { useParams } from "next/navigation";

const PersonalForm = ({
  personalQuestions,
  onClose,
}: {
  personalQuestions: PersonalQuestion[];
  onClose: () => void;
}) => {
  const params = useParams();
  const projectId = params!.projectId;
  const { control, getValues, setError, clearErrors, setValue } =
    useFormContext<AnswerQuestionsScheme>();

  const onSavePersonalInfo = () => {
    const data = getValues();

    let hasError = false;

    personalQuestions.forEach((question, index) => {
      const answer = data.personalAnswers[index]?.answer;

      clearErrors(`personalAnswers.${index}.answer`);

      if (question.isRequired && (!answer || answer.trim() === "")) {
        setError(`personalAnswers.${index}.answer`, {
          type: "required",
          message: "This field is required",
        });
        hasError = true;
        return;
      }

      if (answer) {
        switch (question.fieldType) {
          case "number":
            if (isNaN(Number(answer))) {
              setError(`personalAnswers.${index}.answer`, {
                type: "type",
                message: "Must be a number",
              });
              hasError = true;
            }
            break;

          case "link":
            try {
              new URL(answer);
            } catch {
              setError(`personalAnswers.${index}.answer`, {
                type: "type",
                message: "Must be a valid URL",
              });
              hasError = true;
            }
            break;

          default:
            break;
        }
      }
    });

    if (hasError) return;
    sessionStorage.setItem(
      "personalAnswers",
      JSON.stringify({ personalAnswers: data.personalAnswers, projectId: projectId }),
    );
    onClose();
  };

  return (
    <div className="flex flex-col gap-2">
      {personalQuestions.map((question, index) => (
        <Controller
          key={index}
          control={control}
          name={`personalAnswers.${index}.answer`}
          rules={{ required: { message: "This field is Required!", value: question.isRequired } }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CustomInput
              value={value}
              onChange={(e) => {
                const value = e.target.value;
                setValue(`personalAnswers.${index}.id`, question.id);
                onChange(value);
              }}
              error={error?.message}
              label={`${question.field} (Only ${question.fieldType}) ${question.isRequired ? "*" : ""}`}
            />
          )}
        />
      ))}
      <CustomBtn title="Submit" className="mt-4" onClick={onSavePersonalInfo} type={"button"} />
    </div>
  );
};

export default PersonalForm;
