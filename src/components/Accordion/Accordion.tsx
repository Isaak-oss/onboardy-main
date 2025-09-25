import { ReactNode, useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../SvgIcons/ArrowDownIcon.tsx";

type AccordionProps = {
  title?: string;
  children?: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
};

const transitionDelay = 300;

const Accordion = ({ title, children, open, setOpen }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(open || false);
  const [overflow, setOverflow] = useState<"visible" | "hidden">("hidden");
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
    if (setOpen) {
      setOpen(!isOpen);
    }
  };

  // change overflow property for absolute content on children
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setOverflow("visible");
      }, transitionDelay);
    } else {
      setOverflow("hidden");
    }
  }, [isOpen]);

  useEffect(() => {
    if (typeof open === "boolean") {
      setIsOpen(open);
    }
  }, [open]);

  return (
    <div className="w-full border-b border-gray-300">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full py-3 px-4 bg-gray-100 text-left text-sm/6 font-medium text-gray-900 hover:bg-gray-200 transition"
      >
        {title}
        <span className={`transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          <ArrowDownIcon />
        </span>
      </button>
      <div
        ref={contentRef}
        className={`transition-[max-height] duration-${transitionDelay}`}
        style={{
          maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0",
          overflow: overflow,
        }}
      >
        <div className="py-2 px-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
