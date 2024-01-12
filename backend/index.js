const express = require("express");
const crypto = require("crypto");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const tarefas = [
  {
    id: crypto.randomUUID(),
    text: "Estudar javascript",
    prazo: "10 dias"
  },
  {
    id: crypto.randomUUID(),
    text: "Estudar CSS",
    prazo: "5 dias"
  },
  {
    id: crypto.randomUUID(),
    text: "Estudar HTML",
    prazo: "2 dias"
  }
];

app.get("/", (req, res) => {
  res.send("Olá mundo!");
});

app.get("/tarefas", (req, res) => {
  res.send(tarefas);
});

app.get("/tarefas/:id", (req, res) => {
  const idParam = req.params.id;
  const tarefa = tarefas.find(tarefa => tarefa.id === idParam);
  res.send(tarefa);
});

app.post("/inserir", (req, res) => {
  const tarefa = req.body;

  const novaTarefa = {
    id: crypto.randomUUID(),
    ...tarefa
  };

  !tarefa || !tarefa.text || !tarefa.prazo
    ? res.status(400).send("Faltam dados da tarefa")
    : res.send("Tarefa registrada com sucesso!");

  tarefas.push(novaTarefa);
});

app.delete("/deletar/:id", (req, res) => {
  const idParam = req.params.id;
  const index = tarefas.findIndex(tarefa => tarefa.id === idParam);

  tarefas.splice(index, 1);
  res.send(`Tarefa com ID ${idParam} removida com sucesso!`);
});

const port = 3000;

app.listen(port, () => {
  console.log(`O app está rodando na porta ${port}`);
});