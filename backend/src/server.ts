import express from "express";
import cors from "cors";
import { projectRepository } from "./repository/project.repository";
const app = express();
const PORT = 3000;
const HOST = `http://localhost:${PORT}/`;

app.use(express.json());
app.use(cors());

app.get("/projects", async (_, res) => {
  try {
    const projects = await projectRepository.listAllProjects();
    return res.json(projects);
  } catch (err) {
    return res.status(500).json("Erro ao buscar projetos.");
  }
});
app.post("/projects", async (req, res) => {
  const { name } = req.body;
  const budget = parseInt(req.body.budget);
  try {
    const project = await projectRepository.createNewProject(name, budget);
    return res.json(project);
  } catch (err) {
    return res.status(500).json("Erro ao criar projeto.");
  }
});
app.post("/projects/:id/simulate", async (req, res) => {
  const { id } = req.params;
  try {
    // Gerador de dados fakes de consumo da API (números aleatórios para simular o uso real)
    const randomTokens = Math.floor(Math.random() * 500) + 50; // entre 50 e 550 tokens
    const randomCost = randomTokens * 0.00002;
    const newLog = await projectRepository.createLog(
      id,
      randomTokens,
      randomCost
    );

    return res.status(201).json({
      message: "Requisição simulada com sucesso!",
      log: newLog,
    });
  } catch (err) {
    return res.status(500).json("Erro ao simular requisição");
  }
});

app.listen(PORT, () => console.log(`Local: ${HOST}`));
