import React, { ReactNode, useState } from "react";
import BlockWrap from "./BlockWrap.tsx";
import { EditBtn } from "../ActionBtns/ActionBtns.tsx";

type ToggleBlockWrapProps = {
  mainSection: ReactNode;
  openedSection: ReactNode;
};

const ToggleBlockWrap = ({ mainSection, openedSection }: ToggleBlockWrapProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BlockWrap additionalClassNames="relative group">
      <div
        className={`absolute top-[10px] right-[10px] opacity-0 group-hover:opacity-100 transition-all`}
      >
        <EditBtn onClick={() => setIsOpen(!isOpen)} />
      </div>
      {isOpen ? openedSection : mainSection}
    </BlockWrap>
  );
};

export default ToggleBlockWrap;
