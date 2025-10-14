function login() {
  const username = document.getElementById("name").value.toString();
  const pass = document.getElementById("password").value.toString();

  if (
    username &&
    String(username).length > 2 &&
    pass &&
    String(pass).length > 5
  ) {
    alert("Login success");
  } else {
    alert("Username/Password is incorrect");
  }
}

function addTask(task, tasklist) {
  let text = task.value.trim();
  if (text === "") return;
  const li = document.createElement("li");
  li.id = "task-" + Math.random().toString(36).slice(2, 11);
  li.innerHTML = `<div class="li-row"><div>${text}</div> <button onclick="deleteThis(this.closest('li'))">Delete</button>
            <button id="complete" onclick="completeThis(this.closest('li'))">Complete</button></div>`;
  tasklist.appendChild(li);
  task.value = "";
}

function deleteThis(listitem) {
  listitem.remove();
}

function completeThis(listitem) {
  listitem.classList.add("li-completed");
}

const taskInput = document.getElementById("task");
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask(taskInput, document.getElementById("tasklist"));
  }
});

const collapsibleHeaders = document.querySelectorAll(
  ".section .collapsible"
);

collapsibleHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const content = header.nextElementSibling;
    if (content) {
      content.classList.toggle("hidden");
    }
  });
});
