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
const timeBox = document.querySelector(".time");
let todos = [];

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const currentDate = new Date();
const day = currentDate.getDate();
const monthIndex = currentDate.getMonth();
const monthName = monthNames[monthIndex];
const year = currentDate.getFullYear();

timeBox.innerHTML = `<span class="fs-45">${day}</span>
<div>
    <div class="fs-15"> ${monthName}</div>
    <div class="fs-15 text-light-gray">${year}</div>
</div>`;

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

/**
 * javascript comment
 * @Date: 2024-01-19 21:45:48
 * @Desc: add todo item in todos
 */
const newTodo = (e) => {
    if (todoInput.value !== "") {
        e.preventDefault();
        let newTodoItem = {
            id: Date.now(),
            title: todoInput.value.trim(),
            isComplete: false,
        };
        todos.push(newTodoItem);
        addList(todos);
        saveToLocalStorage();
        todoInput.value = "";
    }
};

/**
 * javascript comment
 * @Date: 2024-01-19 21:46:30
 * @Desc: pass each todo in html
 */
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
            <button class="btn" onclick="editFunc(${todo.id})">
            <i class="fas fa-edit fs-18"></i>
            </button>
            <button class="btn btn-delete" id="${
                todo.id
            }" onclick="removeTodo(${
            todo.id
        })"><i class="fas fa-trash fs-18"></i>
            </button>
            
            </div>
        </li>
            `;
    });
    todoList.innerHTML = item;
}

/**
 * javascript comment
 * @Date: 2024-01-19 21:47:38
 * @Desc:  filter todo with two item one all todos and completed rodo
 */
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

/**
 * javascript comment
 * @Date: 2024-01-19 21:48:24
 * @Desc: remove todo with id  and save in local storage
 */
const removeTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    addList(todos);
    saveToLocalStorage();
};
/**
 * javascript comment
 * @Date: 2024-01-19 21:50:08
 * @Desc: after each action , I call this function and save todos in local storage
 */
const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
/**
 * javascript comment
 * @Date: 2024-01-19 21:55:49
 * @Desc: toggle todo complete checker
 */
const funcComplete = (id) => {
    todos.forEach((todo) => {
        if (todo.id === id) {
            todo.isComplete = !todo.isComplete;
        }
    });
    addList(todos);
    saveToLocalStorage();
};

const editTodoInput = document.querySelector(".edit-todo-input");
const saveEditBtn = document.querySelector(".save-edit-btn");

/**
 * javascript comment
 * @Date: 2024-01-19 21:54:37
 * @Desc: in this function we show modal , edit todo item and save in local storage
 */
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

const editFunc = (id) => {
    openEditModal(id);
};
