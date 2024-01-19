const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todos-list");
const filterList = document.querySelector(".filter");
const allTaskBtn = document.querySelector(".all-task-btn");
const compeleteBtn = document.querySelector(".compelete-btn");
let todos = [];

function newTodo(e) {
    e.preventDefault();

    let newTodoItem = {
        id: Date.now(),
        title: todoInput.value,
        isComplete: false,
    };
    todos.push(newTodoItem);
    addList(todos);
    todoInput.value = "";
}
function addList(todos) {
    let item = "";
    todos.forEach((todo) => {
        item += `
        <li class="todo-item">
        <div class="title">
        <input type="checkbox" id="${todo.id}" onclick="funcComplete(${
            todo.id
        })" ${todo.isComplete ? "checked" : ""}/>
            <span>${todo.title}</span>
        </div>
            <div class="actions">
            <button class="btn btn-delete" id="${
                todo.id
            }" onclick="removeTodo(${
            todo.id
        })"><i class="fas fa-trash fs-18"></i>
            </button>



            <button class="btn">
            <i class="fas fa-edit fs-18"></i>
            </button>

            
            </div>
        </li>
            `;
    });
    todoList.innerHTML = item;
}

function filterdTodos(str) {
    console.log(str);
    if (str == "all") {
        addList(todos);
    } else if (str == "compelete") {
        const filterResult = todos.filter((todo) => todo.isComplete == true);
        addList(filterResult);
    }
}

todoForm.addEventListener("submit", newTodo);
allTaskBtn.addEventListener("click", () => filterdTodos("all"));
compeleteBtn.addEventListener("click", () => filterdTodos("compelete"));

console.log(todoForm);

function removeTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    addList(todos);
}

function funcComplete(id) {
    todos.forEach((todo) => {
        if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
        }
    });
    addList(todos);
}
