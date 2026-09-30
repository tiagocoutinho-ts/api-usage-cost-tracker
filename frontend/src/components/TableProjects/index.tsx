import { useEffect, useState } from "react";
import { getAllProjects, simulateRequest } from "../../services/project";
import type { ProjectsDataStruct } from "../../model/projects-model";

interface TableProjectProps {
  refreshTrigger?: number | boolean;
}

export function TableProject({ refreshTrigger }: TableProjectProps) {
  const [projectList, setProjectList] = useState<ProjectsDataStruct[] | null>(null);

  const fetchProjects = async () => {
    try {
      const projectData = await getAllProjects();
      setProjectList(projectData);
    } catch (err) {
      alert("Erro ao carregar lista de projetos.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  const handleSimulation = async (id: string) => {
    try {
      await simulateRequest(id);
      await fetchProjects();
    } catch (err) {
      alert("Erro ao simular requisição.");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-zinc-800 text-[11px] font-medium uppercase tracking-wider text-zinc-400 bg-zinc-950/60">
            <th className="px-5 py-3.5">Projeto</th>
            <th className="px-5 py-3.5">Orçamento</th>
            <th className="px-5 py-3.5">Total Gasto</th>
            <th className="px-5 py-3.5">Progresso de Uso</th>
            <th className="px-5 py-3.5">Criação</th>
            <th className="px-5 py-3.5 text-right">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/50 text-sm">
          {projectList && projectList.length > 0 ? (
            projectList.map((project) => {
              const totalSpent =
                project.logs?.reduce((acc, log) => acc + log.cost, 0) || 0;
              
              const budgetLimit = project.budget > 0 ? project.budget : 1;
              const progressPercent = Math.min(
                Math.round((totalSpent / budgetLimit) * 100),
                100
              );

              return (
                <tr key={project.id} className="hover:bg-zinc-800/20 transition-colors group">
                  <td className="px-5 py-4 font-medium text-zinc-100 flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-emerald-500 transition-colors"></span>
                    {project.name}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-zinc-300">
                    {Number(project.budget).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-emerald-400 font-medium">
                    {totalSpent.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>

                  <td className="px-5 py-4 w-44">
                    <div className="w-full bg-zinc-950 border border-zinc-800/80 rounded-full h-2 overflow-hidden p-[1px]">
                      <div
                        style={{ width: `${progressPercent}%` }}
                        className={`h-full rounded-full transition-all duration-300 ${
                          progressPercent > 80 ? "bg-red-500" : "bg-emerald-500"
                        }`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 mt-1 block">
                      {progressPercent}% consumido
                    </span>
                  </td>

                  <td className="px-5 py-4 text-zinc-400 text-xs font-mono">
                    {new Date(project.createdAt).toLocaleDateString("pt-BR")}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => handleSimulation(project.id)}
                      className="bg-zinc-800/80 hover:bg-zinc-700 active:bg-zinc-900 text-zinc-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-700/50 transition-all shadow-sm cursor-pointer hover:border-zinc-600"
                    >
                      Simular Request
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-zinc-500 text-xs font-mono">
                Nenhum projeto registrado no sistema.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}