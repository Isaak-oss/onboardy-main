import React, { useEffect, useRef, useState } from "react";

type TabBtnsProps = {
  titles: string[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};

const TabBtns = ({ titles, activeIndex, setActiveIndex }: TabBtnsProps) => {
  const [tumbOptions, setTumbOptions] = useState({ left: 0, width: 0 });
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (btnRefs.current[activeIndex]) {
      const { offsetLeft, offsetWidth } = btnRefs.current[activeIndex]!;
      setTumbOptions({ left: offsetLeft, width: offsetWidth });
    }
  }, [activeIndex]);

  const onTabChange = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-3">
      {titles.map((title, index) => (
        <button
          key={title}
          // @ts-ignore
          ref={(el) => (btnRefs.current[index] = el)}
          onClick={() => onTabChange(index)}
          className={`relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
            activeIndex === index ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {title}
        </button>
      ))}
      <div
        style={{
          transform: `translateX(${tumbOptions.left}px)`,
          width: tumbOptions.width,
        }}
        className="absolute bottom-1 left-0 h-8 bg-[white] rounded-md transition-all duration-300"
      />
    </div>
  );
};

export default TabBtns;
