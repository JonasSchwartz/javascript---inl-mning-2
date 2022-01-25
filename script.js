const form = document.querySelector('#form');
const input = document.querySelector('#input');
const output = document.querySelector('#output');

let toDoList = [];
  let toDoListTwo = [];

const fetchTodos = async () => {
  const resp = await fetch('https://jsonplaceholder.typicode.com/todos')
  const data = await resp.json()
  toDoListTwo = data;

  toDoList = toDoListTwo.slice(0, 200);
  showList();
}

fetchTodos ();

const showList = () => {
  output.innerHTML = ''
  toDoList.forEach(listItem => {
    createItem(listItem)
  })
}


const createItem = item => {

  let card = document.createElement('div');
  card.classList.add('list-item');

  let chGroup = document.createElement('label');
  chGroup.classList.add('custom-checkbox');

  let chBox = document.createElement('input');
  chBox.type = 'checkbox';
  chBox.name = 'chBox';
  chBox.id = item.id ;
  chBox.checked = item.completed;

  let chMark = document.createElement('span');
  chMark.classList.add('checkmark');
  
  let titleText = document.createElement('h5');
  titleText.classList.add('list-item-txt');
  titleText.innerText = item.title;
  
  let btn = document.createElement('button');
  btn.classList.add('btn', 'btn-del');
  if (chBox.checked !== true) {
    btn.classList.add('visi-btn');
  }
  btn.innerText = 'DEL';


  btn.addEventListener('click', () => {
    if (chBox.checked === true) {
      removeItem(item.id)
    }
  })
  chGroup.append(chBox, chMark);
  card.append(chGroup, titleText, btn);
  output.appendChild(card);
}
function removeItem(id) {
  toDoList = toDoList.filter(item => item.id !== id)
  showList()
 
}
form.addEventListener('submit', e => {
  e.preventDefault();
  if(input.value !== '') {
    createNewItem(input.value);
    input.value = '';
    
  } 
  
})
const createNewItem = title => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
  .then(res => res.json())
  .then(data => {
    toDoList.unshift(data);
    data.userId = 1;
    data.id = Date.now().toString();
    
    showList()
    
  })
}

   output.addEventListener('change', e => {
  if (e.target.checked) {
    toDoList.find(item => item.id == e.target.id).completed = true;
    }
  else {
    toDoList.find(item => item.id == e.target.id).completed = false;
    }
              showList()
    });












