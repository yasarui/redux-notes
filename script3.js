
//element references
const todosWrapper = document.getElementById("todosWrapper");
const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const deleteTodo = document.getElementById("deleteTodo");
const deleteAllTodo = document.getElementById("deleteAllTodo");



function todoReducer(currentState = {todos:[]},action){
    const newState = Object.assign({},currentState);
    switch(action.type){
        case "ADD_TODO":
           newState.todos.push(action.payload);
           return newState;
           break;
        case "DELETE_TODO":
           newState.todos.pop();
           return newState;
           break;
        case "DELETE_ALL_TODO":
           newState.todos= [];
           return newState;
           break;
        default:
          return currentState
    }
}

const store = Redux.createStore(todoReducer);

store.subscribe(render)

function render(){
    const state = store.getState();
    renderList(state.todos);
}

function renderList(todos){
    todosWrapper.innerHTML = "";
    todos.forEach(element => {
        const li = document.createElement("li");
        li.innerHTML = element;
        li.className = "list-group-item";
        todosWrapper.appendChild(li);
    });
}

addTodo.addEventListener("click",()=>{
    const todo = todoInput.value;
    todoInput.value = "";
    store.dispatch({
        type:"ADD_TODO",
        payload:todo
    })
}); 

deleteTodo.addEventListener("click",()=>{
    store.dispatch({
        type:"DELETE_TODO"
    })
})

deleteAllTodo.addEventListener("click",()=>{
    store.dispatch({
        type:"DELETE_ALL_TODO"
    })
})