document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    const li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <button onclick="removeTask(this)">Remove</button>`;
    taskList.appendChild(li);

    saveTask(taskInput.value);

    taskInput.value = "";
}

function removeTask(button) {
    const taskList = document.getElementById("taskList");
    const li = button.parentNode;
    taskList.removeChild(li);

    const tasks = getTasks();
    const index = tasks.indexOf(li.innerText.split(" ")[0]);
    tasks.splice(index, 1);
    saveTasks(tasks);
}

function clearTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
}

function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById("taskList");

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.innerHTML = `${task} <button onclick="removeTask(this)">Remove</button>`;
        taskList.appendChild(li);
    });
}

function getTasks() {
    const tasksString = localStorage.getItem("tasks");
    return tasksString ? JSON.parse(tasksString) : [];
}
