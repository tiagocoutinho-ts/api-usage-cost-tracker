import { useState } from "react";
import { createProject } from "../services/project";

export function useProjectForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const rawBudget = formData.get("budget") as string;

    const parseBudget = (value: string) => {
      if (!value) return NaN;
      const sanitized = value.replace(/\./g, "").replace(",", ".");
      return parseFloat(sanitized);
    };

    const budget = parseBudget(rawBudget);

    if (!name.trim() || isNaN(budget) || budget <= 0) {
      alert("Por favor, preencha o nome e um orçamento válido.");
      return;
    }

    const payload = { name, budget };

    try {
      setIsLoading(true);
      await createProject(payload);
      form.reset();
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      alert(`Falha ao criar projeto: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit, isLoading, refreshKey };
}