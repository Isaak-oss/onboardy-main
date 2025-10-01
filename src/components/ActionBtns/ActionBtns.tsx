import { HTMLAttributes, ReactNode } from "react";
import EditIcon from "../SvgIcons/EditIcon.tsx";

type ActionBtnProps = {
  icon: ReactNode;
  text: string;
} & HTMLAttributes<HTMLDivElement>;

const ActionBtn = ({ icon, text, ...rest }: ActionBtnProps) => {
  return (
    <div
      {...rest}
      className={`rounded-full border border-gray-950 px-2 py-1 bg-[rgba(0, 0, 0, 0.5)] cursor-pointer ${rest?.className}`}
    >
      <div className="flex gap-1 items-center">
        {icon}
        <div className="text-xs">{text}</div>
      </div>
    </div>
  );
};

export const EditBtn = ({ ...rest }: HTMLAttributes<HTMLDivElement>) => {
  return <ActionBtn icon={<EditIcon size={20} color="#000" />} text="Edit" {...rest} />;
};
