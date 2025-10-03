import React, { HTMLAttributes } from "react";

type ErrorLabelProps = HTMLAttributes<HTMLDivElement> & {
  error?: string;
};

const ErrorLabel = ({ error, ...rest }: ErrorLabelProps) => {
  if (!error) return;
  return (
    <div {...rest} className={"text-red-600"}>
      {error}
    </div>
  );
};

export default ErrorLabel;
