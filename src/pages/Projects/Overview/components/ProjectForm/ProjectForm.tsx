import React from "react";
import FormContainer from "../../../../../components/FormContainer/FormContainer.tsx";
import { FormProvider } from "react-hook-form";
import CustomBtn from "../../../../../components/CustomBtn/CustomBtn.tsx";
import { Project } from "../../../../../types/rawTypes.ts";
import QuestionsFields from "./Fileds/QuestionsFields.tsx";
import MainFields from "./Fileds/MainFields.tsx";
import { useProjectForm } from "./useProjectForm.ts";
import PersonalQuestionsFields from "./Fileds/PersonalQuestionsFields.tsx";

type ProjectFormProps = {
  onClose: () => void;
  projectData?: Project;
};

const ProjectForm = ({ onClose, projectData }: ProjectFormProps) => {
  const { handleSubmit, isDataPending, form, onSubmit } = useProjectForm({ onClose, projectData });

  return (
    <FormProvider {...form}>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <MainFields />
          <QuestionsFields />
          <PersonalQuestionsFields />
        </div>
        <CustomBtn
          title={projectData ? "Update project" : "Create project"}
          className="w-[auto] mt-5"
          isLoading={isDataPending}
          type="submit"
        />
      </FormContainer>
    </FormProvider>
  );
};

export default ProjectForm;
