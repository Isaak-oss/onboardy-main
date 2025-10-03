import React, { HTMLAttributes } from "react";

type InputLabelProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
};

const InputLabel = ({ label, ...rest }: InputLabelProps) => {
  if (!label) return;
  return (
    <div {...rest} className={`block text-sm/6 font-medium text-gray-900 ${rest.className}`}>
      {label}
    </div>
  );
};

export default InputLabel;
