import { ButtonHTMLAttributes } from "react";
import Loader from "../Loader/Loader.tsx";

type CustomBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title?: string;
  isLoading?: boolean;
};

const CustomBtn = ({ title, isLoading, ...rest }: CustomBtnProps) => {
  return (
    <button
      {...rest}
      disabled={isLoading}
      className={`flex left-auto right-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:scale-105 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${rest.className}`}
    >
      {isLoading ? <Loader /> : title}
    </button>
  );
};

export default CustomBtn;
