import React, { useState } from "react";
import CopyIcon from "../SvgIcons/CopyIcon.tsx";
import { useTranslation } from "react-i18next";

const CopyBtn = ({ codeString }: { codeString: string }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 flex items-center gap-1"
    >
      <CopyIcon />
      {copied ? t("Copied") : t("Copy")}
    </button>
  );
};

export default CopyBtn;
