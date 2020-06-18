//element references
const count = document.getElementById("count");
const addOne = document.getElementById("addBtn");
const subBtn = document.getElementById("subBtn");
const resetBtn = document.getElementById("resetBtn");

//reducer function
function counter(state = 0,action){
    switch(action.type){
        case 'INCREMENT':
          return state + 1;
          break;
        case 'DECREMENT':
          return state - 1;
          break;
        case 'RESET':
          return 0;
          break;
        default:
          return state;
    }
}

let store = Redux.createStore(counter);

store.subscribe(render);

function render(){
    const state = store.getState();
    count.innerHTML = state;
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

//In this example the state is primitive so there is no point like creating a new object in the reducer