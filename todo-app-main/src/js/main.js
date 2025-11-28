//DOM Selector
const bodyTheme= document.body;
const btnSwitchTheme = document.getElementById('btn-switch-theme');
const inputTodo = document.getElementById('input-text-todo');
const todoList = document.getElementById('todo-list');
const remainingText = document.getElementById('remaining-todo');
const navDesktop = document.querySelector('.navigation_dekstop');
const navMobile = document.querySelector('.navigation_mobile');
const btnClear = document.getElementById('btn-clear');
const div = document.createElement('input')
const a = document.createElement('a')

console.dir(div)
console.dir(a)

//STATEAWAL
function getInitialTodos() {
    const todosFromStorage = localStorage.getItem('todoList');

    if (todosFromStorage) {
        return JSON.parse(todosFromStorage);
    }

    return [
        { text: "Jog around the park 3x", completed: false },
        { text: "10 minutes meditation", completed: true },
        { text: "Read for 1 hour", completed: false },
        { text: "Pick up groceries", completed: false },
        { text: "Complete Todo App on Frontend Mentor", completed: false }
    ];
}

let todo = getInitialTodos();

let currentFilter = 'all';

// fungsi UTAMA
function render() {
    todoList.innerHTML = '';
    const itemsLeft = todo.filter(item => !item.completed).length;
    const todoString = JSON.stringify(todo);

    todo.forEach((item, index) => {

        const shouldShow =
            (currentFilter === 'all') ||
            (currentFilter === 'active' && !item.completed) ||
            (currentFilter === 'completed' && item.completed);

        if (!shouldShow) {
            return;
        }

        const isCompleted = item.completed;
        const completedClass = isCompleted ? 'todo-completed' : '';
        const checkedAttribute = isCompleted ? 'checked' : '';

        let textHtml = `
            <label class="todo-items ${completedClass}">
                <input class="checkbox" type="checkbox" name="todo" data-index="${index}" ${checkedAttribute}>
                <span class="custom-box"></span>
                <span class="todo-text">${item.text}</span> <button class="btn-delete" data-index="${index}"> <svg class="icon-cross" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                        <path fill="#9394a5" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132L.707 17.677 0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
                    </svg>
                 </button>
            </label>
        `;
        todoList.innerHTML += textHtml;
    });

    remainingText.textContent = `${itemsLeft} items left`;

    const allFilterLinks = document.querySelectorAll('.navigation a');
    console.log(allFilterLinks)
    allFilterLinks.forEach(link => {
        if (link.textContent.toLowerCase() === currentFilter) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    localStorage.setItem('todoList', todoString);
}




// ADD TODO
inputTodo.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const todoText = inputTodo.value;
        if (todoText.trim() !== '') {
            todo.push({ text: todoText, completed: false });
            console.log(todo);
        }
        inputTodo.value = '';
        render();
    }
});

//ADD DONE TODO
todoList.addEventListener('change', e => {
    if (e.target.classList.contains('checkbox')) {
        const indexToToggle = e.target.dataset.index;
        todo[indexToToggle].completed = !todo[indexToToggle].completed;

        render();
    }
});

// DELETE TODO
todoList.addEventListener('click', e => {
    const deleteButton = e.target.closest('.btn-delete');
    if (deleteButton) {
        const indexToDelete = deleteButton.dataset.index;
        console.log(deleteButton)
        todo.splice(indexToDelete, 1);

        render();
    }
});

//COLOR SWITCH EVENT
btnSwitchTheme.addEventListener('click' ,() =>{
    const iconTheme = btnSwitchTheme.querySelector('img');
    bodyTheme.classList.toggle('dark-mode');
    const isDarkMode = bodyTheme.classList.contains('dark-mode');

    if (isDarkMode) {
        iconTheme.src = '/images/icon-sun.svg';
        iconTheme.alt = 'Switch to light theme';
    } else {
        iconTheme.src = '/images/icon-moon.svg';
        iconTheme.alt = 'Switch to dark theme';
    }
    render()
});

// FILTER TODOS
function handleFilterClick(e) {
    if (e.target.tagName === 'A') {
        e.preventDefault();
        const filterType = e.target.textContent.toLowerCase();
        currentFilter = filterType;
        // console.log('Filter diubah ke:', currentFilter);
        render();
    }
}

navDesktop.addEventListener('click', handleFilterClick);
navMobile.addEventListener('click', handleFilterClick);


btnClear.addEventListener('click' , () =>{
    todo = todo.filter(item => !item.completed);
    render();
})

new Sortable(todoList, {
    animation: 150,
    ghostClass: 'sortable-ghost',

    onEnd: function(e) {
        const [movedItem] = todo.splice(e.oldIndex, 1);
        todo.splice(e.newIndex, 0, movedItem);

        localStorage.setItem('todoList', JSON.stringify(todo));
    }
});

render();