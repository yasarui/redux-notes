
//Action creators

const createPolicy = (name,amount) => {
    return {
        type:"CREATE_POLICY",
        payload: {name,amount}
    }
}

const deletePloicy = (name) => {
    return {
        type:"DELETE_POLICY",
        payload: {name}
    }
}

const createClaim = (name,amount) => {
    return {
        type:"CREATE_CLAIM",
        payload: {name,amount}
    }
}


//Reducers

function policyReducer(currentListOfPolicies = [],action){
   switch(action.type){
       case "CREATE_POLICY":
          return [...currentListOfPolicies,action.payload];
          break;
       case "DELETE_POLICY":
          return currentListOfPolicies.filter((item)=> item.name !== action.payload.name)
          break;
       default:
         return currentListOfPolicies;
   }
}

function claimsReducer(currentListofClaims = [],action){
    switch(action.type){
        case "CREATE_CLAIM":
          return [...currentListofClaims,action.payload]
          break;
        default:
          return currentListofClaims
    }
}

function accountingReducer(currentAmount = 100,action){
    switch(action.type){
        case "CREATE_CLAIM":
          return currentAmount - action.payload.amount;
          break;
        case "CREATE_POLICY":
          return currentAmount + action.payload.amount;
          break;
        default:
          return currentAmount;
    }
}

const logger = window.reduxLogger.logger;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const appCombinedReducers = Redux.combineReducers({ 
     polices:policyReducer,
     claims:claimsReducer,
     accounts:accountingReducer
});
const store = Redux.createStore(appCombinedReducers,composeEnhancers(Redux.applyMiddleware(logger)));

store.dispatch(createPolicy('Alex', 20));
store.dispatch(createPolicy('Jim', 30));
store.dispatch(createPolicy('Bob', 40));

store.dispatch(createClaim("Alex",120));
store.dispatch(createClaim("Jim",50));

store.dispatch(deletePloicy('Bob'))

console.log("The Final State is ",store.getState())


//Differet versions of Implemeting the ReduxDev Tools

// 1. With Only One Reducer

// let store = Redux.createStore(policyReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

//2. With Combine Reducer

/*
let store = Redux.createStore(Redux.combineReducers({polices:policyReducer,claims:claimsReducer,accounts:accountingReducer}),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
*/

//3. With Middlewares also

/*
const logger = window.reduxLogger.logger;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const store = Redux.createStore(Redux.combineReducers({polices:policyReducer,claims:claimsReducer,accounts:accountingReducer}),composeEnhancers(Redux.applyMiddleware(logger)));
*/