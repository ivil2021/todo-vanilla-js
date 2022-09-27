const addTaskBtn = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const todosWrapper = document.querySelector('.todos-wrapper');

let todoItemElems = [];

let tasks;
// if local is empty, tasks array will be empty too
// if local is not empty, tasks will be filled by data from localstorage
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem('tasks')));

// функция конструктор,
// которая поможет создавать много однотипных объектов
function Task(description) {
  this.description = description;
  this.complete = false;
}

const createTemplate = (task, index) => {
    return `
      <div class="todo-item ${task.complete ? 'checked' : ''}">
        <div class="description"><p>${task.description}</p></div>
        <div class="buttons">
          <input onClick="completeTask(${index})"
          class="btn-complete" type="checkbox" ${task.complete ? 'checked' : ''}></>
          <button onClick="deleteTask(${index})"  class="btn-delete">Delete</button>
        </div>
      </div>
    `
}

const filterTasks = () => {
  const activeTasks = tasks.length && tasks.filter(item => item.complete === false);
  const completedTasks = tasks.length && tasks.filter(item => item.complete === true);
  tasks = [...activeTasks, ...completedTasks];
  console.log(tasks);
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = '';
    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemElems = document.querySelectorAll('.todo-item');
    }
  };

  // чтобы при инициализации заполнять хтмл
  fillHtmlList();

const updateLocal = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const completeTask = (index) => {
  console.log(index);
  tasks[index].complete = !tasks[index].complete;
  if (tasks[index].complete) {
    todoItemElems[index].classList.add('checked');
  } else {
    todoItemElems[index].classList.remove('checked');
  }
  updateLocal();
  fillHtmlList();
};

addTaskBtn.addEventListener('click', () => {
  tasks.push(new Task(deskTaskInput.value));
  console.log(tasks);
  // localStorage.setItem('tasks', JSON.stringify(tasks));
  updateLocal();
  fillHtmlList();
  deskTaskInput.value = '';
});

const deleteTask = (index) => {
  todoItemElems[index].classList.add('deletion');

  setTimeout(() => {
    console.log(index);
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
  }, 500);
};
