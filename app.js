"use strict";

/**********************************************
 *** ISSUES
 **********************************************/

// 1. Connection between data completed and checked.
// 2. Deleting a task
// 3. All Active Completed
// 4. Clear Completed

/////////////////////////////////////////////////
// Data

let id = 8;
const dummy_tasks = [
  {
    id: 1,
    title: "Complete online JavaScript course",
    completed: true,
  },
  {
    id: 2,
    title: "Jog around the park 3x",
    completed: true,
  },
  {
    id: 3,
    title: "10 minutes meditation",
    completed: false,
  },
  {
    id: 4,
    title: "Read for 1 hour",
    completed: false,
  },
  {
    id: 5,
    title: "Pick up groceries",
    completed: false,
  },
  {
    id: 6,
    title: "Complete todo app on Frontend Mentor",
    completed: false,
  },
];

/////////////////////////////////////////////////
// Elements
const containerTask = document.querySelector(".item__task");
const containerTasks = document.querySelector(".items");
const containerItemsLeft = document.querySelector(".filter__items-left");

const btnAdd = document.querySelector(".add");
/* const btnDelete = document.querySelectorAll(".delete");
 */
const taskInput = document.querySelector(".input__task");

/////////////////////////////////////////////////
// Functions

const displayTasks = function (tasks) {
  containerTasks.innerHTML = "";

  tasks.forEach(function (task, i) {
    const html = `   
      <label class="item"
            ><p>${task.title}</p>
            <input
              type="checkbox"
              class="item__task"
              name="item__task"
              ${task.completed === true ? "checked" : ""}
            /><span class="checkmark"></span>
            <div class="delete"></div>
          </label>`;

    containerTasks.insertAdjacentHTML("afterbegin", html);
  });
};

const updateUI = function (tasks) {
  displayTasks(tasks);
  let total = 0;
  for (const i in tasks) {
    if (tasks[i].completed === false) {
      total++;
    }
  }
  containerItemsLeft.innerHTML = `${total} items left`;
};

updateUI(dummy_tasks);
///////////////////////////////////////
// Event handlers

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  const task = taskInput.value;

  if (task.length === 0) {
    dummy_tasks.push({
      id: id++,
      title: "No name task",
      completed: false,
    });
  } else {
    dummy_tasks.push({
      id: id++,
      title: task,
      completed: false,
    });
  }
  updateUI(dummy_tasks);
  taskInput.value = "";
});
