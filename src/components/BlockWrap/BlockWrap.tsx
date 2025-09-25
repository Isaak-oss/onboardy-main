import React from "react";

const BlockWrap = ({
  children,
  additionalClassNames,
}: {
  children: React.ReactNode;
  additionalClassNames?: string;
}) => {
  return (
    <div
      className={`rounded-lg border bg-[white] text-card-foreground shadow-sm ${additionalClassNames}`}
    >
      <div className="flex flex-col p-6"> {children}</div>
    </div>
  );
};

export default BlockWrap;
