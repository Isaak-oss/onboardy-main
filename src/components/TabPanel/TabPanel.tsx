import React, { useState } from "react";
import TabBtns from "./TabBtns/TabBtns.tsx";

type TabPanelProps = {
  tabs: { title: string; content: React.ReactNode }[];
};

const TabPanel = ({ tabs }: TabPanelProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div>
      <TabBtns
        titles={tabs.map((e) => e.title)}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <div className="mt-4">{tabs[activeIndex].content}</div>
    </div>
  );
};

export default TabPanel;
