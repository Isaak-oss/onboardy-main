import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomInput from "../../../../../../components/CustomFields/CustomInput/CustomInput.tsx";
import CustomBtn from "../../../../../../components/CustomBtn/CustomBtn.tsx";
import { PersonalQuestionFieldType, ProjectScheme } from "../../../../../../types/formTypes.ts";
import CustomSelect from "../../../../../../components/CustomFields/CustomSelect/CustomSelect.tsx";
import CustomCheckbox from "../../../../../../components/CustomCheckbox/CustomCheckbox.tsx";

const PersonalQuestionsFields = () => {
  const { control, watch, setValue } = useFormContext<ProjectScheme>();

  const personalQuestions = watch("personalQuestions");

  const addNewQuestion = () => {
    setValue("personalQuestions", [
      ...personalQuestions,
      { field: "", fieldType: "text" as PersonalQuestionFieldType, isRequired: false },
    ]);
  };

  const deleteQuestion = (index: number) => {
    setValue(
      "personalQuestions",
      personalQuestions.filter((_, idx) => idx !== index),
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="block text-sm/6 font-medium text-gray-900">Personal Questions:</div>
      {personalQuestions.map((_, index) => (
        <div className="border border-gray-950 p-2 rounded-md flex flex-col gap-2 ml-2" key={index}>
          <Controller
            control={control}
            name={`personalQuestions.${index}.field`}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <CustomInput
                label={"Field"}
                value={value}
                onChange={onChange}
                error={error?.message}
                disabled={watch(`personalQuestions.${index}.disabled`)}
              />
            )}
          />
          <div className="flex gap-2 items-end">
            <Controller
              control={control}
              name={`personalQuestions.${index}.fieldType`}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <CustomSelect
                  value={value}
                  onChange={onChange}
                  label={"Field Type"}
                  error={error?.message}
                  disabled={watch(`personalQuestions.${index}.disabled`)}
                  options={[
                    { value: "text", label: "Text" },
                    { value: "number", label: "Number" },
                    { value: "link", label: "Link" },
                  ]}
                />
              )}
            />
            <Controller
              control={control}
              name={`personalQuestions.${index}.isRequired`}
              render={({ field: { value, onChange } }) => (
                <CustomCheckbox
                  onChange={onChange}
                  label={"Is Required"}
                  checked={value}
                  name={"isRequired"}
                  disabled={watch(`personalQuestions.${index}.disabled`)}
                />
              )}
            />
          </div>
          <div className="flex gap-2">
            {personalQuestions.length > 1 && !watch(`personalQuestions.${index}.disabled`) && (
              <CustomBtn
                title="Delete"
                className="w-[150px] mt-5 bg-red-500"
                onClick={() => deleteQuestion(index)}
                type="button"
              />
            )}
            {index === personalQuestions.length - 1 && (
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

export default PersonalQuestionsFields;
