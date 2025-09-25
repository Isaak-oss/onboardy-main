import React, { useRef, useState } from "react";
import { ColorResult, ChromePicker } from "react-color";
import CustomInput from "../CustomInput/CustomInput.tsx";
import { useOnClickOutside } from "usehooks-ts";

type ColorPickerProps = {
  color?: string;
  setColor: (color: string) => void;
  label: string;
};

const ColorPicker = ({ color = "", setColor, label }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorPickerRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(colorPickerRef, () => setIsOpen(false));

  const colorChangeHandler = (color: ColorResult) => {
    if (color) {
      setColor(color.hex);
    }
  };

  return (
    <div className="relative">
      <CustomInput value={color} onClick={() => setIsOpen(true)} label={label} />
      {isOpen && (
        <div className="absolute select-none top-[115%] z-10" ref={colorPickerRef}>
          <ChromePicker color={color} onChange={colorChangeHandler} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
