const lista_tarefas = document.getElementById("tarefas");

const chamadaApi = fetch("http://localhost:3000/tarefas");

chamadaApi.then(response => {
  return response.json();
}).then(tarefas => {
  tarefas.map(tarefa => {
    lista_tarefas.insertAdjacentHTML("beforeend", `<li>
      <p>Tarefa: ${tarefa.text}</p>
      <p>Prazo: ${tarefa.prazo}</p>
    </li>`);
  });
});