import { FieldValues, Path, UseFormSetError } from "react-hook-form";

export const parseServerError = (error: any) => {
  return error.response?.data;
};

export const setServerErrorToForm = <TFieldValues extends FieldValues>(
  error: Record<string, any>,
  setError: UseFormSetError<TFieldValues>,
) => {
  if (typeof error !== "object" || error === null) return;

  Object.entries(error).forEach(([field, message]) => {
    setError(field as Path<TFieldValues>, {
      type: "server",
      message: message as string,
    });
  });
};