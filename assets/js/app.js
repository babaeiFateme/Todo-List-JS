const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todos-list");
const allTaskBtn = document.querySelector(".all-task-btn");
const compeleteBtn = document.querySelector(".compelete-btn");
const addBtn = document.querySelector(".add-btn");
const closeBtn = document.querySelector(".close-btn");
const addModal = document.querySelector(".add-modal");
const editModal = document.querySelector(".edit-modal");
const overlay = document.querySelector(".overlay");
let todos = [];

const storedTodos = JSON.parse(localStorage.getItem("todos"));
if (storedTodos) {
    todos = storedTodos;
    addList(todos);
}

addBtn.addEventListener("click", () => {
    addModal.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    addModal.classList.add("hidden");
    overlay.classList.add("hidden");
});

function newTodo(e) {
    e.preventDefault();
    let newTodoItem = {
        id: Date.now(),
        title: todoInput.value,
        isComplete: false,
    };

    todos.push(newTodoItem);
    addList(todos);
    saveToLocalStorage();
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
            <button class="btn" onclick="editFunc(${todo.id})">
            <i class="fas fa-edit fs-18"></i>
            </button>
            </div>
        </li>
            `;
    });
    todoList.innerHTML = item;
}

function filterdTodos(str) {
    if (str == "all") {
        addList(todos);
    } else if (str == "compelete") {
        const filterResult = todos.filter((todo) => todo.isComplete == true);
        addList(filterResult);
        saveToLocalStorage();
    }
}

todoForm.addEventListener("submit", newTodo);
allTaskBtn.addEventListener("click", () => filterdTodos("all"));
compeleteBtn.addEventListener("click", () => filterdTodos("compelete"));

console.log(todoForm);

function removeTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    addList(todos);
    saveToLocalStorage();
}
function saveToLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function funcComplete(id) {
    todos.forEach((todo) => {
        if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
        }
    });
    addList(todos);
    saveToLocalStorage();
}


const editTodoInput = document.querySelector(".edit-todo-input");
const saveEditBtn = document.querySelector(".save-edit-btn");

const openEditModal = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
        editModal.classList.remove("hidden");
        overlay.classList.remove("hidden");
        editTodoInput.value = todoToEdit.title;

        saveEditBtn.addEventListener("click", () => {
            todoToEdit.title = editTodoInput.value;
            editModal.classList.add("hidden");
            overlay.classList.add("hidden");

            addList(todos);
            saveToLocalStorage();
        });
    }
};

function editFunc(id) {
    openEditModal(id);
}

overlay.addEventListener("click", () => {
    editModal.classList.add("hidden");
    overlay.classList.add("hidden");
});
