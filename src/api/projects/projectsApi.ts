import { Project } from "../../types/rawTypes.ts";
import { instance } from "../api.ts";

export const projectsApi = {
  getProjects: (): Promise<Project[]> => {
    return instance.get("/projects");
  },
  getProject: (projectId: string): Promise<Project> => {
    return instance.get(`/projects/${projectId}`);
  },
  createProject: (data?: { name: string }): Promise<Project> => {
    return instance.post("/projects", data);
  },
  deleteProject: (projectId: string): Promise<Project> => {
    return instance.delete(`/projects/${projectId}`);
  },
};
