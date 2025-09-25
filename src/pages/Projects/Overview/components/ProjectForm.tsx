import React from "react";
import FormContainer from "../../../../components/FormContainer/FormContainer.tsx";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../../../components/CustomInput/CustomInput.tsx";
import CustomBtn from "../../../../components/CustomBtn/CustomBtn.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectsApi } from "../../../../api/projects/projectsApi.ts";
import { ProjectScheme } from "../../../../types/formTypes.ts";
import { errorParser, setErrorsToForm } from "../../../../utils/errorParser.ts";
import { isValidUrl } from "../../../../services/isValid.ts";

type ProjectFormProps = {
  onClose: () => void;
};

const ProjectForm = ({ onClose }: ProjectFormProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, setError } = useForm<ProjectScheme>();

  const { mutate, isLoading } = useMutation(["projects"], projectsApi.createProject, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["projects"]);
      onClose();
    },
    onError: (error) => {
      setErrorsToForm(errorParser(error)?.error, setError);
    },
  });

  const onSubmit = (data: ProjectScheme) => {
    if (isValidUrl(data.url)) {
      if (!data.url.endsWith("/")) {
        data.url = data.url + "/";
      }
      mutate(data);
    } else {
      setError("url", { message: "Url is not valid!" });
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <Controller
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput label={"Name"} value={value} onChange={onChange} error={error?.message} />
          )}
          name={"name"}
        />
        <Controller
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              label={"Description"}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
          name={"description"}
        />
        <Controller
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <CustomInput
              label={"Url (with '/' in the end)"}
              value={value}
              onChange={onChange}
              error={error?.message}
            />
          )}
          name={"url"}
        />
      </div>
      <CustomBtn title="Create project" className="w-[auto] mt-5" isLoading={isLoading} />
    </FormContainer>
  );
};

export default ProjectForm;
