import React, { HTMLAttributes, InputHTMLAttributes } from "react";
import InputLabel from "../InputLabel.tsx";
import ErrorLabel from "../ErrorLabel.tsx";

type CustomInputProps = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  label?: string;
  containerProps?: HTMLAttributes<HTMLDivElement>;
  error?: string;
  extraInfo?: string;
  multiple?: boolean;
};

const CustomInput = ({
  label,
  containerProps,
  error,
  extraInfo,
  multiple,
  ...rest
}: CustomInputProps) => {
  return (
    <div {...containerProps}>
      <InputLabel label={label} />
      {multiple ? (
        <textarea
          {...rest}
          className={`block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 resize-none ${rest.className}`}
        />
      ) : (
        <input
          {...rest}
          className={`block w-full rounded-md border-0 p-1.5 mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 resize-none ${rest.className}`}
        />
      )}
      <ErrorLabel error={error} />
      {extraInfo && (
        <div className={"block text-sm/6 leading-[18px] text-gray-500"}>{extraInfo}</div>
      )}
    </div>
  );
};

export default CustomInput;
