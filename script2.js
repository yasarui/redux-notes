//element references
const count = document.getElementById("count");
const addOne = document.getElementById("addBtn");
const subBtn = document.getElementById("subBtn");
const resetBtn = document.getElementById("resetBtn");

//reducer function
function counter(currentState = {count:0},action){
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

let store = Redux.createStore(counter);

store.subscribe(render);

function render(){
    const state = store.getState();
    count.innerHTML = state.count;
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

//Unlike the previous example ,we have used the object instead of the primitive
//so we are creating a newObject inside the reducer