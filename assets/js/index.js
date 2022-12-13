const addTask = document.querySelector("#addTask");
const btnAddTask = document.querySelector("#btnAddTask");
const totalTask = document.querySelector("#totalTask");
const idTask = document.querySelector("#idTask");
const taskList = document.querySelector("#taskList");
const buttonList = document.querySelector("#buttonList");
const buttonDelete = document.querySelector("#buttonDelete");

let tasks = [];

const render = () => {
  taskList.innerHTML = "";
  for (const [indice, descripcion] of tasks.entries()) {
    const linkDelete = document.createElement("a");
    linkDelete.classList.add("link-delete");
    linkDelete.innerHTML = "&times;";
    linkDelete.href = "";
    linkDelete.onclick = (evento) => {
      evento.preventDefault();
      if (!confirm("¿Eliminar tarea?")) {
        return;
      }
      tasks.splice(indice, 1);
      render();
    };

    idTask.innerHTML = "";
    tasks.forEach((item, index) => {
      idTask.innerHTML += `<li>${index + 1}</li>`;
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = function () {
      if (this.checked) {
        tasks[indice].estado = true;
      } else {
        tasks[indice].estado = false;
      }
      render();
    };

    const span = document.createElement("span");
    span.textContent = descripcion.descripcion;
    const li = document.createElement("li");
    if (descripcion.estado) {
      checkbox.checked = true;
      span.classList.add("strikethrough");
    }
    li.appendChild(span);
    li.appendChild(checkbox);
    li.appendChild(linkDelete);
    taskList.appendChild(li);
  }
  totalTask.textContent = tasks.length;
};

btnAddTask.addEventListener("click", (e) => {
  e.preventDefault();
  const inputTask = addTask.value;
  if (!inputTask) {
    alert("Faltan campos por llenar");
    return;
  }
  tasks.push({
    id: tasks.length,
    descripcion: inputTask,
    estado: false,
  });
  addTask.value = "";
  render();
});
