import React, { SelectHTMLAttributes } from "react";
import InputLabel from "../InputLabel.tsx";
import ErrorLabel from "../ErrorLabel.tsx";

type CustomSelectProps = {
  options: { value: string; label: string }[];
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

const CustomSelect = ({ options, label, error, ...rest }: CustomSelectProps) => {
  return (
    <div>
      <InputLabel label={label} />
      <select
        {...rest}
        className={`block rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 resize-none mt-2 ${rest.className}`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ErrorLabel error={error} />
    </div>
  );
};

export default CustomSelect;
