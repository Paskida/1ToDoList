"use strict";

/**********************************************
 *** ISSUES
 **********************************************/

// 1. Connection between data completed and checked???  + Items left
// 2. Clear Completed
// 3. Handle the error on delete button

///////////////////////////////////////
// DATA
///////////////////////////////////////

const dummy_tasks = JSON.parse(localStorage.getItem("tasks")) || [];

///////////////////////////////////////
// ELEMENTS
///////////////////////////////////////

const containerTasks = document.querySelector(".items");
const containerItemsLeft = document.querySelector(".filter__items-left");

const btnAdd = document.querySelector(".add");
const btnAll = document.querySelector(".filter__item-all");
const btnActive = document.querySelector(".filter__item-active");
const btnCompleted = document.querySelector(".filter__item-completed");
const btnClearCompleted = document.querySelector(".filter__clear-completed");

const taskInput = document.querySelector(".input__task");

///////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////

const displayTask = function (task, placeToAdd = "afterbegin") {
  const html = `
    <div class="item" id="${task.id}">
      <label class="item-label" ${task.completed ? "checked" : ""}>${task.title}
            <input type="checkbox" class="item__task" name="item__task"/>
              <span class="checkmark"></span>
      </label>
      <button class="delete">
        <div class="delete-cross"></div>
      </button>
      
    </div> `;
  containerTasks.insertAdjacentHTML(placeToAdd, html);
};

const displayAllTasks = function (tasks) {
  tasks.forEach((task) => displayTask(task));
};

const deleteTask = function (i) {
  dummy_tasks.splice(i, 1);
  localStorage.setItem("tasks", JSON.stringify(dummy_tasks));
};

const deleteCompletedTasks = function () {
  const modified_tasks = dummy_tasks.filter((task) => task.completed);
};

const changeTasksCounter = function () {
  const notCompletedLength = dummy_tasks.filter(
    (task) => !task.completed
  ).length;
  containerItemsLeft.innerHTML = `${notCompletedLength} items left`;
};

const showUI = function (tasks) {
  displayAllTasks(tasks);
  changeTasksCounter();
};

showUI(dummy_tasks);

///////////////////////////////////////
// EVENT HANDLERS
///////////////////////////////////////

// Adding a task
btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  const taskValue = taskInput.value.trim();
  const title = !taskValue.length ? "No name task" : taskValue;

  const ids = dummy_tasks.map((task) => task.id);
  let prevId = ids.length > 0 ? Math.max(...ids) : 0;

  const task = {
    id: prevId + 1,
    title,
    completed: false,
  };

  dummy_tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(dummy_tasks));
  displayTask(task);
  changeTasksCounter();

  taskInput.value = "";
});

// Checking and unchecking - !!! save in local storage
containerTasks.addEventListener("click", function (e) {
  e.preventDefault();

  const targetEl = e.target;
  targetEl.closest(".item-label").classList.toggle("checked");

  const neededId = e.target.closest(".item").id;
  const foundItem = dummy_tasks.find((task) => (task.id = neededId));
  console.log(foundItem);
  foundItem.completed = !foundItem.completed;
  //?????
  /* localStorage.setItem(foundItem, JSON.stringify(foundItem.completed)); */
});

// Deleting
// Deleting from UI + deleting from LocalStorage on updating the page
const deleteBtn = document.querySelectorAll(".delete"); // here, because in the beginning it doesn't exist

deleteBtn.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    deleteTask(e.target.closest(".item").id);
    e.target.closest(".item").classList.add("hide-to-delete");
  })
);

btnClearCompleted.addEventListener("click", function (e) {
  e.preventDefault();

  deleteCompletedTasks();
  containerItemsAll.forEach((item) =>
    item.classList.contains("checked")
      ? item.parentNode.classList.add("hide-to-delete")
      : ""
  );
});

// FILTERS

const containerItemsAll = document.querySelectorAll(".item-label"); // here, because in the beginning it doesn't exist

// Show all
btnAll.addEventListener("click", function (e) {
  e.preventDefault();

  containerItemsAll.forEach((item) => item.parentNode.classList.remove("hide"));
});

// Show unchecked - active
btnActive.addEventListener("click", function (e) {
  e.preventDefault();

  containerItemsAll.forEach((item) =>
    item.classList.contains("checked")
      ? item.parentNode.classList.add("hide")
      : item.parentNode.classList.remove("hide")
  );
});

// Show checked - completed
btnCompleted.addEventListener("click", function (e) {
  e.preventDefault();

  containerItemsAll.forEach((item) =>
    item.classList.contains("checked")
      ? item.parentNode.classList.remove("hide")
      : item.parentNode.classList.add("hide")
  );
});

function solution(n) {
  const k = String(n).slice(0, 1);
  const l = String(n).slice(1, 2);
  return +k + +l;
}

console.log(solution(29));
