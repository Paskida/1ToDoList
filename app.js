///////////////////////////////////////
// DATA
///////////////////////////////////////

let dummy_tasks = JSON.parse(localStorage.getItem("tasks")) || [];

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

// Display functionality
const displayTask = function (task, placeToAdd = "afterbegin") {
  const html = `
    <div class="item" id="${task.id}">
      <label class="item-label ${task.completed ? "checked" : ""}" ${
    task.completed ? "checked" : ""
  }>${task.title}
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

// Delete functionality
const deleteTask = function (el) {
  dummy_tasks = dummy_tasks.splice(el.id, 1);
  localStorage.setItem("tasks", JSON.stringify(dummy_tasks));
  el.remove();
};

const deleteCompletedTasks = function () {
  const filteredTasks = dummy_tasks.reduce((acc, task) => {
    if (task.completed) {
      const taskEl = document.getElementById(`${task.id}`);
      taskEl.remove();
    } else {
      acc.push(task);
    }

    return acc;
  }, []);
  localStorage.setItem("tasks", JSON.stringify(filteredTasks));
};

// Task Counter functionality
const changeTasksCounter = function () {
  const notCompletedLength = dummy_tasks.filter(
    (task) => !task.completed
  ).length;
  containerItemsLeft.innerHTML = `${notCompletedLength} items left`;
};

// Show All
const showUI = function (tasks) {
  displayAllTasks(tasks);
  changeTasksCounter();
};

showUI(dummy_tasks);

///////////////////////////////////////
// EVENT HANDLERS
///////////////////////////////////////

// Adding a task

const addTask = function () {
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
};

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

document.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Checking and unchecking
function changeTaskCompleted(parentEl) {
  const neededId = parentEl.id;
  const foundItemIndex = dummy_tasks.findIndex(
    (task) => +task.id === +neededId
  );

  dummy_tasks[foundItemIndex].completed =
    !dummy_tasks[foundItemIndex].completed;

  localStorage.setItem("tasks", JSON.stringify(dummy_tasks));
}

// Checking and unchecking
containerTasks.addEventListener("click", function (e) {
  e.preventDefault();

  const targetEl = e.target;

  if (targetEl.classList.contains("delete")) {
    const parentEl = targetEl.closest(".item");
    deleteTask(parentEl);
    changeTasksCounter();
    return;
  }

  if (
    targetEl.classList.contains("item-label") ||
    targetEl.classList.contains("checkmark")
  ) {
    const parentEl = targetEl.closest(".item");
    targetEl.closest(".item-label").classList.toggle("checked");
    changeTaskCompleted(parentEl);
    changeTasksCounter();
    return;
  }
});

btnClearCompleted.addEventListener("click", function (e) {
  e.preventDefault();

  deleteCompletedTasks();
  [...containerItemsAll].forEach((item) =>
    item.classList.contains("checked")
      ? item.parentNode.classList.add("hide-to-delete")
      : ""
  );
});

// FILTERS

const containerItemsAll = document.getElementsByClassName("item-label");

// Show all
btnAll.addEventListener("click", function (e) {
  e.preventDefault();

  [...containerItemsAll].forEach((item) =>
    item.parentNode.classList.remove("hide")
  );
});

// Show unchecked - active
btnActive.addEventListener("click", function (e) {
  e.preventDefault();

  [...containerItemsAll].forEach((item) =>
    item.classList.contains("checked")
      ? item.parentNode.classList.add("hide")
      : item.parentNode.classList.remove("hide")
  );
});

// Show checked - completed
btnCompleted.addEventListener("click", function (e) {
  e.preventDefault();
  [...containerItemsAll].forEach((item) =>
    !item.classList.contains("checked")
      ? item.parentNode.classList.add("hide")
      : item.parentNode.classList.remove("hide")
  );
});
