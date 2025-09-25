import React from "react";

const Error = ({ error }: { error: string }) => {
  if (!error) return null;

  return <div className={"text-red-600"}>{error}</div>;
};

export default Error;
