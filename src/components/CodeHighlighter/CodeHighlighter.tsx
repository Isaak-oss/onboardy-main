"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/prism";

type CodeHighlighterProps = {
  codeString: string;
};

const CodeHighlighter = ({ codeString }: CodeHighlighterProps) => {
  // const { t } = useTranslation();
  // const [copied, setCopied] = useState(false);
  //
  // const handleCopy = () => {
  //   navigator.clipboard.writeText(codeString).then(() => {
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   });
  // };

  return (
    <div className="mt-3">
      {/*<div*/}
      {/*  onClick={handleCopy}*/}
      {/*  style={{*/}
      {/*    zIndex: 1,*/}
      {/*  }}*/}
      {/*  className={`bg-gray-500 cursor-pointer p-2 pr-5 text-white text-right `}*/}
      {/*>*/}
      {/*  {copied ? t("Copied") : t("Copy")}*/}
      {/*</div>*/}
      <SyntaxHighlighter
        language="javascript"
        style={nightOwl}
        customStyle={{
          margin: 0,
          padding: "5px 10px",
          borderRadius: "calc(0.5rem - 2px)",
          maxHeight: "300px"
        }}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighter;
