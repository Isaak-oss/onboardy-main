import React from "react";

type FormContainerProps = {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const FormContainer = ({ children, onSubmit }: FormContainerProps) => {
  return (
    <div className={"bg-white p-5"}>
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
};

export default FormContainer;
