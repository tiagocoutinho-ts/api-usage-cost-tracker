import type { ProjectsDataStruct } from "../model/projects-model";
import { api } from "./api";

interface CreateProjectPayload {
  name: string;
  budget: number;
}

export const createProject = async (payload: CreateProjectPayload) => {
  await api.post("/projects", payload);
  return;
};

export const getAllProjects = async (): Promise<ProjectsDataStruct[]> => {
  const { data } = await api.get("/projects");
  return data;
};

export const simulateRequest = async (id) => {
  const { data } = await api.post(`/projects/${id}/simulate`);
  return data
};
