import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import CustomInput from "../../../../../../components/CustomFields/CustomInput/CustomInput.tsx";
import { ProjectScheme } from "../../../../../../types/formTypes.ts";

const MainFields = () => {
  const { control } = useFormContext<ProjectScheme>();

  return (
    <>
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
      <Controller
        control={control}
        name={"duration"}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CustomInput
            label={"Duration"}
            value={value}
            type={"number"}
            onChange={(e) => onChange(Number(e.target.value) > 20 ? 20 : e.target.value)}
            error={error?.message}
            placeholder={"Max durations is 20 minutes"}
          />
        )}
      />
    </>
  );
};

export default MainFields;
