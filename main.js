let input = document.querySelector("input");
let add = document.querySelector("button");
let tasksDiv = document.querySelector(".tasks");

// empty array to tasks
let arrayOfTasks = [];

// check if there is tasks in local storage
if (window.localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("task"));
}

getTasksFromLocalStorage();

add.onclick = () => {
  if (input.value !== "") {
    addTaskToArray(input.value); // add task to array
    input.value = ""; // clear input field
  }
};

// delete task button
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    deleteTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
  }

  if (e.target.classList.contains("done")) {
    if (e.target.checked) {
      e.target.parentElement.classList.add("completed");
      toggleStatusOfcompletely(e.target.parentElement.getAttribute("data-id"));
    } else {
      e.target.parentElement.classList.remove("completed");
    }
  }
});

// function to add tasks to array
function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  // push task to array
  arrayOfTasks.push(task);

  // add elements to page
  addElementToPageFrom(arrayOfTasks);

  // add tasks to local storage
  addTasksToLocalStorage(arrayOfTasks);
}

function addElementToPageFrom(arrayOfTasks) {
  // clear div
  tasksDiv.innerHTML = "";

  // looping on array of tasks
  arrayOfTasks.forEach((item) => {
    // create div
    let div = document.createElement("div");
    div.className = "task";
    if (item.completed === true) {
      div.className = "task completed";
    }

    var done = document.createElement("input");
    done.setAttribute("type", "checkbox");
    done.className = "done";
    done.checked = item.completed;
    div.appendChild(done);

    div.setAttribute("data-id", item.id);
    div.appendChild(document.createTextNode(item.title));

    // create delete button
    let del = document.createElement("i");
    del.className = "delete fa-regular fa-trash-can";

    // append delete button to parent div
    div.appendChild(del);

    // add task to tasks div
    tasksDiv.appendChild(div);
  });
}

// create function add tasks to local storage
function addTasksToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}

// function get tasks data from local storgae
function getTasksFromLocalStorage() {
  let data = window.localStorage.getItem("task");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks);
  }
}

function deleteTaskFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((item) => item.id !== Number(taskId));
  addTasksToLocalStorage(arrayOfTasks);
}

function toggleStatusOfcompletely(taskId) {
  arrayOfTasks.forEach((item) => {
    if (item.id === Number(taskId)) {
      if (item.completed === false) {
        item.completed = true;
      } else {
        item.completed = false;
      }
    }
  });
  addTasksToLocalStorage(arrayOfTasks);
}
