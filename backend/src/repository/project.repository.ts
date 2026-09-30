import { prisma } from "../lib/prisma";

class ProjectRepository {
  async listAllProjects() {
    return await prisma.project.findMany({
      include: {
        logs: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async createNewProject(name: string, budget: number) {
    return await prisma.project.create({
      data: { name, budget },
    });
  }

  async createLog(projectId: string, tokens: number, cost: number) {
    return await prisma.apiLog.create({
      data: {
        projectId,
        tokens,
        cost,
        endpoint: "/v1/chat/completions",
      },
    });
  }
}

export const projectRepository = new ProjectRepository();
