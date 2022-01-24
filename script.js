const form = document.querySelector('#todoForm')
const input = document.querySelector('#todoInput')
const output = document.querySelector('#output')

 let todos = [];

 const fetchToDo = async() => {
     const res = await fetch (`https://jsonplaceholder.typicode.com/todos`)
     const data = await res.json()
    
     todos = data;
     
     listToDos();
   
 }
fetchToDo(); 

const listToDos = () => {
    output.innerHTML = '';
    todos.forEach(todo => {
    output.appendChild(createToDoElement(todo))
    })
}

const createToDoElement = todo => {
    let card = document.createElement('div');
    card.classList.add('todo')

    let title = document.createElement('p')
    title.classList.add('todo-title')
    title.innerText = todo.title

    let button = document.createElement('button')
    button.classList.add('btn','btn-danger','btn-sm')
    button.innerText = 'X';

    card.appendChild(title)
    card.appendChild(button)

button.addEventListener('click', () => removeTodo (todo.id, card))

    return card;
}

function removeTodo(id,todo) {

   todos = todos.filter(todo => todo.id !== id)
   
   todo.remove()

    
}

const createNewTodo = title => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method:'post',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            title,
            completed:false
        })
    })

    .then(res => res.json())
    .then(data => {
        console.log(data);
        todos.unshift(data)
        output.appendChild(createToDoElement(data))
    })
}





form.addEventListener('submit',e => {
    e.preventDefault();
if(input.value !== '') {
    input.value = '';
    input.focus()
}

}) 