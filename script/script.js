function deletarTarefa(tarefaId) {

  let tarefasLocalStorage, tarefas;

  
  tarefasLocalStorage = JSON.parse(localStorage.getItem("tarefas"));

    tarefas = tarefasLocalStorage === null ? [] : tarefasLocalStorage;
  tarefas = tarefas.filter((tarefa) => tarefa.id !== parseInt(tarefaId));

  
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  criarListagemDeTarefas(tarefas);
}

function concluirTarefa(tarefaId) {
  
  let tarefasLocalStorage, tarefas;

    tarefasLocalStorage = JSON.parse(localStorage.getItem("tarefas"));

  
  tarefas = tarefasLocalStorage === null ? [] : tarefasLocalStorage;
  tarefas = tarefas.map((tarefa) =>
    tarefa.id === tarefaId ? { ...tarefa, done: !tarefa.done } : tarefa
  );

  
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  criarListagemDeTarefas(tarefas);
}

function criarListagemDeTarefas(tarefas) {
  const listagemTarefasUl = document.getElementById("listagemTarefas");
  listagemTarefasUl.innerHTML = "";

  
  for (let index = 0; index < tarefas.length; index++) {
    const tarefa = tarefas[index];

    
    const li = document.createElement("li");

    
    li.innerHTML = `<div class="tarefa">
      <input
        type="checkbox"
        id="${tarefa.id}"
        name="${tarefa.name}"
        value="${tarefa.id}"
        onclick="concluirTarefa(${tarefa.id})"
        ${tarefa.done && "checked"}
      />
      <label for="${tarefa.name}" ${tarefa.done && 'class="done"'}>${
      tarefa.name
    }</label>
      <span class="material-icons" onclick="deletarTarefa(${
        tarefa.id
      })">delete_forever</span>
    </div>`;

    // adicionei o li (item de lista) para dentro da ul
    listagemTarefasUl.appendChild(li);
  }
}

function inserirTarefa() {
  
  let inputValue, tarefas, tarefasLocalStorage;

  
  inputValue = document.querySelector("#tarefa").value;

  if (inputValue !== "") {
    
    tarefasLocalStorage = JSON.parse(localStorage.getItem("tarefas"));

    
    tarefas = tarefasLocalStorage === null ? [] : tarefasLocalStorage;

    
    tarefas.push({
      
      id: Math.floor(Math.random() * 1000000000000000),
      name: inputValue,
      done: false,
    });

    
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    
    document.querySelector("#tarefa").value = "";

    criarListagemDeTarefas(tarefas);
  }
}


(function () {
  
  let tarefasLocalStorage, tarefas;

  
  tarefasLocalStorage = JSON.parse(localStorage.getItem("tarefas"));

  
  tarefas = tarefasLocalStorage === null ? [] : tarefasLocalStorage;

  criarListagemDeTarefas(tarefas);
})();
