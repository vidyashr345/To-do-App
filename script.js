document.addEventListener("DOMContentLoaded", init);

function init(){
    loadTasks();
    document.getElementById("addTask").addEventListener("click", addTask);
}

function loadTasks(){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask(){
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if(task === ""){
        return;
    }

    addTaskToDOM(task);
    saveTask(task);
    taskInput.value = "";
}

function addTaskToDOM(task){
    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `${task} <button class="remove-btn">Remove</button>`;
    taskList.appendChild(li);

    li.querySelector(".remove-btn").addEventListener("click", function(){
        removeTask(task, li);
    });
}

function saveTask(task){
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTask(task, element){
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    let index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1); // Remove only one occurrence
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    element.remove();
}
