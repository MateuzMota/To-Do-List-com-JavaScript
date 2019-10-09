var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');
var buttonElement2 = document.querySelector('#app .buttonsBody .buttonLimpar')

var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

function renderToDos(){
    listElement.innerHTML = '';

     
    for(todo of todos){

        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);

        var linkElement = document.createElement('a');

        linkElement.setAttribute('href', '#');

        var pos = todos.indexOf(todo);

        linkElement.setAttribute('onClick', 'deleteTodo('+ pos +')')

        
        var linkText = document.createTextNode('Excluir');

        linkElement.appendChild(linkText);
        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        listElement.appendChild(todoElement);

    }
}

renderToDos()

function addTodo(){
    var todoText = inputElement.value;
    if(todoText !== ''){ todos.push(`${todoText} - `); };
    inputElement.value = '';
    renderToDos();
    saveToStorage();
}

function limparTodo(){
    localStorage.clear();
    renderToDos();
    window.location.reload()
}

buttonElement.onclick = addTodo;
document.addEventListener('keypress', function(e){
    if((e.which == 13) || (e.keyCode == 13)){
        addTodo();
    }
  }, false);

buttonElement2.onclick = limparTodo;

function deleteTodo(pos){
    todos.splice(pos, 1);
    renderToDos();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('list_todos', JSON.stringify(todos));
}