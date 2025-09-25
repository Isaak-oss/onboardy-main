import React from "react";
import { useRouter } from "next/navigation";

const ProjectCard = ({ name, id }: { name: string; id: number }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/projects/${id}`)}
      className={
        "overflow-hidden bg-white text-sm/6 ring-1 shadow-lg ring-gray-900/5 p-2 w-[250px] h-[100px] flex items-center justify-center cursor-pointer transform transition duration-300 hover:scale-110"
      }
    >
      <div className={"font-semibold text-gray-900"}>{name}</div>
    </div>
  );
};

export default ProjectCard;
