"use client";

import ProjectCard from "./components/ProjectCard.tsx";
import { useQuery } from "@tanstack/react-query";
import { projectsApi } from "../../../api/projects/projectsApi.ts";
import Loader from "../../../components/Loader/Loader.tsx";
import PlusIcon from "../../../components/SvgIcons/PlusIcon.tsx";
import ProjectForm from "./components/ProjectForm/ProjectForm.tsx";
import { useState } from "react";

const Projects = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { data, isLoading } = useQuery(["projects"], projectsApi.getProjects);

  return (
    <section className="overflow-hidden bg-slate-50 p-10 flex-1">
      <div className="flex items-center gap-[10px] mb-5">
        <div className={"text-2xl/9 font-bold tracking-tight text-gray-900"}>Projects</div>
        <div className={"cursor-pointer"} onClick={() => setIsFormOpen(!isFormOpen)}>
          <PlusIcon />
        </div>
      </div>
      {isFormOpen && <ProjectForm onClose={() => setIsFormOpen(false)} />}
      {isLoading ? (
        <Loader />
      ) : data?.length ? (
        <div className="mt-5 flex flex-wrap gap-[10px]">
          {data.map((project) => (
            <ProjectCard name={project.name} id={project.id} key={project.id} />
          ))}
        </div>
      ) : (
        <div className="text-sm tracking-tight text-gray-900 mt-5">No Projects</div>
      )}
    </section>
  );
};

export default Projects;
