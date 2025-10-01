import {Project, Question} from "../../types/rawTypes.ts";
import { instance } from "../api.ts";
import {ProjectScheme} from "../../types/formTypes.ts";

export const projectsApi = {
  getProjects: (): Promise<Project[]> => {
    return instance.get("/projects");
  },
  getProject: (projectId: string): Promise<Project> => {
    return instance.get(`/projects/${projectId}`);
  },
  getQuestions: (projectId: string): Promise<Question[]> => {
    return instance.get(`/projects/${projectId}/questions`);
  },
  createProject: (data?: ProjectScheme): Promise<Project> => {
    return instance.post("/projects", data);
  },
  updateProject: (data?: ProjectScheme, projectId?: number): Promise<Project> => {
    return instance.put(`/projects/${projectId}`, data);
  },
  deleteProject: (projectId: string): Promise<Project> => {
    return instance.delete(`/projects/${projectId}`);
  },
};
