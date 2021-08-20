const form = document.getElementById('form');
const input = document.getElementById('input');
const todos = document.getElementById('todos');

const todosLs = JSON.parse(localStorage.getItem('todosLs'));

if(todosLs){
    todosLs.forEach(todo => {
        addTodos(todo);
    });
}

form.addEventListener('submit', (e) => {

    e.preventDefault();
    addTodos();
});

function addTodos(todo){
    let todoTxt = input.value;
    if(todo){
        todoTxt = todo.text;
    }

    if (todoTxt) {
        const todoEl = document.createElement('li');

        if(todo && todo.completed){
            todoEl.classList.add('completed');
        }

        todoEl.innerText = todoTxt;

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
            updateLS();
        });

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault();

            todoEl.remove();
            updateLS();
        });

        todos.appendChild(todoEl);
        input.value = '';
    }
    
    updateLS();
}

function updateLS() {
    const allTodos = document.querySelectorAll('li');
    const todosItem = [];
    allTodos.forEach(todoEl => {
        todosItem.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        });
    });

    localStorage.setItem('todosItem', JSON.stringify(todosItem));
}
