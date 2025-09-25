export const errorParser = (err: any) => {
  if (!err?.response?.data) {
    return err;
  }

  return err?.response?.data;
};

export const setErrorsToForm = (
  errors: Record<string, string>,
  setError: (name: any, error: any) => void,
) => {
  Object.keys(errors).forEach((key: string) => {
    setError(key, { message: errors[key] });
  });
};
