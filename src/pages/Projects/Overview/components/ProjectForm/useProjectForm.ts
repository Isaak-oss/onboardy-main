import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../../../../../api/projects/projectsApi.ts";
import { errorParser, setErrorsToForm } from "../../../../../utils/errorParser.ts";
import { PersonalQuestionFieldType, ProjectScheme } from "../../../../../types/formTypes.ts";
import {
  serializeProjectDataForForm,
  serializeProjectDataForServer,
} from "../../../../../api/projects/serializer.ts";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Project } from "../../../../../types/rawTypes.ts";

export const projectFormDefaultValues = {
  questions: [{ question: "", note: "" }],
  personalQuestions: [
    {
      field: "First name",
      fieldType: "text" as PersonalQuestionFieldType,
      isRequired: true,
      disabled: true,
    },
    {
      field: "Last name",
      fieldType: "text" as PersonalQuestionFieldType,
      isRequired: true,
      disabled: true,
    },
    { field: "", fieldType: "text" as PersonalQuestionFieldType, isRequired: false },
  ],
};

type Props = {
  onClose: () => void;
  projectData?: Project;
};

export const useProjectForm = ({ onClose, projectData }: Props) => {
  const queryClient = useQueryClient();

  const form = useForm<ProjectScheme>({
    defaultValues: projectFormDefaultValues,
  });

  const { handleSubmit, setError, reset } = form;

  useEffect(() => {
    if (projectData) {
      reset(serializeProjectDataForForm(projectData));
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
    const formattedData = serializeProjectDataForServer({ ...data, questions: formattedQuestions });
    if (!projectData) {
      mutate(formattedData);
    } else {
      updateProject(formattedData);
    }
  };

  return {
    onSubmit,
    isDataPending: isUpdateLoading || isLoading,
    handleSubmit,
    form,
  };
};
