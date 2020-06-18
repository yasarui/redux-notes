//element references
const count = document.getElementById("count");
const addOne = document.getElementById("addBtn");
const subBtn = document.getElementById("subBtn");
const resetBtn = document.getElementById("resetBtn");
const todosWrapper = document.getElementById("todosWrapper");
const todoInput = document.getElementById("todoInput");
const addTodo = document.getElementById("addTodo");
const deleteTodo = document.getElementById("deleteTodo");
const deleteAllTodo = document.getElementById("deleteAllTodo");

//reducer function
function counterReducer(currentState = {count:0},action){
    var newState = {
        count:currentState.count
    }
    switch(action.type){
        case 'INCREMENT':
          newState.count = newState.count + 1;
          return newState;
          break;
        case 'DECREMENT':
          newState.count = newState.count - 1;
          return newState;
          break;
        case 'RESET':
          newState.count = 0;
          return newState;
          break;
        default:
          return currentState;
    }
}

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

const logger = store => next => action => {
    console.log("action dispatched",action);
    const result = next(action);
    console.log("Next state ",store.getState());
    return result;
}

let store = Redux.createStore(Redux.combineReducers({counterReducer,todoReducer}),Redux.applyMiddleware(logger));

store.subscribe(render);

function render(){
    const state = store.getState();
    count.innerHTML = state.counterReducer.count;
    renderList(state.todoReducer.todos);
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
render();

addOne.addEventListener("click",function(){
     store.dispatch({type:'INCREMENT'});
});

subBtn.addEventListener("click",function(){
    store.dispatch({type:'DECREMENT'});
});

resetBtn.addEventListener("click",function(){
    store.dispatch({type:'RESET'});
});

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

//Here we are using middleware which we create