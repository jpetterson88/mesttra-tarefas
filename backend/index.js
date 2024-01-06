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
  const tarefa = tarefas.find(tarefa => tarefa.id == idParam);
  res.send(tarefa);
});

const port = 3000;

app.listen(port, () => {
  console.log(`O app está rodando na porta ${port}`);
});