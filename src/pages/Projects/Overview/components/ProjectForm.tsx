import React, { useEffect } from "react";
import FormContainer from "../../../../components/FormContainer/FormContainer.tsx";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../../components/CustomInput/CustomInput.tsx";
import CustomBtn from "../../../../components/CustomBtn/CustomBtn.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../../../../api/projects/projectsApi.ts";
import { ProjectScheme } from "../../../../types/formTypes.ts";
import { errorParser, setErrorsToForm } from "../../../../utils/errorParser.ts";
import { Project } from "../../../../types/rawTypes.ts";
import { serializeProjectDataForForm } from "../../../../api/projects/serializer.ts";

type ProjectFormProps = {
  onClose: () => void;
  projectData?: Project;
};

const defaultValues = { questions: [{ question: "", note: "" }] };

const ProjectForm = ({ onClose, projectData }: ProjectFormProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, setError, setValue, watch, reset } = useForm<ProjectScheme>({
    defaultValues,
  });

  useEffect(() => {
    if (projectData) {
      reset(
        serializeProjectDataForForm({
          ...projectData,
          questions: projectData.questions,
        }),
      );
    }
  }, [projectData]);

  const { mutate, isLoading } = useMutation(["projects"], projectsApi.createProject, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["projects"]);
      onClose();
    },
    onError: (error) => {
      setErrorsToForm(errorParser(error)?.error, setError);
    },
  });

  const { mutate: updateProject, isLoading: isUpdateLoading } = useMutation(
    ["project"],
    (data: ProjectScheme) => projectsApi.updateProject(data, projectData?.id),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["project", projectData?.id?.toString()]);
        onClose();
      },
      onError: (error) => {
        setErrorsToForm(errorParser(error)?.error, setError);
      },
    },
  );

  const onSubmit = (data: ProjectScheme) => {
    const formattedQuestions = data.questions.filter((question) => question.question !== "");
    const formattedData = { ...data, questions: formattedQuestions };
    if (!projectData) {
      mutate(formattedData);
    } else {
      updateProject(formattedData);
    }
  };

  const questions = watch("questions");

  const addNewQuestion = () => {
    setValue("questions", [...questions, { question: "", note: "" }]);
  };

  const deleteQuestion = (index: number) => {
    setValue(
      "questions",
      questions.filter((_, idx) => idx !== index),
    );
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          rules={{ required: true }}
          name={"name"}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              label={"Name *"}
              value={value}
              onChange={onChange}
              error={error && "Required"}
            />
          )}
        />
        <Controller
          control={control}
          name={"description"}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              label={"Description"}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
        />
        <div className="flex flex-col gap-2">
          <div className="block text-sm/6 font-medium text-gray-900">Questions:</div>
          {questions.map((_, index) => (
            <div
              className="border border-gray-950 p-2 rounded-md flex flex-col gap-2 ml-2"
              key={index}
            >
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
                    isLoading={isLoading}
                    onClick={() => deleteQuestion(index)}
                    type="button"
                  />
                )}
                {index === questions.length - 1 && (
                  <CustomBtn
                    title="Add new question"
                    className="w-[150px] mt-5 bg-green-500"
                    isLoading={isLoading}
                    onClick={addNewQuestion}
                    type="button"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CustomBtn
        title={projectData ? "Update project" : "Create project"}
        className="w-[auto] mt-5"
        isLoading={isLoading || isUpdateLoading}
        type="submit"
      />
    </FormContainer>
  );
};

export default ProjectForm;
