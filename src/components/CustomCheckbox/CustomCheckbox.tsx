import React, { ChangeEvent, InputHTMLAttributes } from "react";

type CustomCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
};

const CustomCheckbox = ({ checked, onChange, name, label, ...rest }: CustomCheckboxProps) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex h-5 shrink-0 items-center">
        <div className="group grid size-4 grid-cols-1">
          <input
            {...rest}
            onChange={(e) => onChange(e)}
            checked={checked}
            id="filter-mobile-color-0"
            name={name}
            type="checkbox"
            className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
          />
          <svg
            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              className="opacity-1 group-has-checked:opacity-100"
              d="M3 8L6 11L11 3.5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {label && (
        <label
          htmlFor="filter-mobile-color-0"
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default CustomCheckbox;
