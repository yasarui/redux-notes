
//referencing input elements
const nameLi = document.getElementById("nameLi");
const genderLi = document.getElementById("genderLi");
const emailLi = document.getElementById("emailLi");
const locationLi = document.getElementById("locationLi");
const statusLi = document.getElementById("statusLi");
const image = document.getElementById("image");

const initialState = {
    requestSend:false,
    requestReceived:false,
    user:{
        name:"",
        gender:"",
        email:"",
        location:"",
        imageUrl:"",
    },
    status:"",
    statusClass:""
}

function userReducer(currenState = initialState, action){
     const user = {
        name:"",
        gender:"",
        email:"",
        location:"",
        imageUrl:"",         
     }
     switch(action.type){
         case "FETCHING_USER":
            return {...currenState,requestSend:true,status:"Pending",statusClass:"Pending"};
            break;
         case "FETCHING_USER_SUCCESS":
            user.name = `${action.payload.name.first} ${action.payload.name.last}`;
            user.gender = action.payload.gender;
            user.email = action.payload.email;
            user.location = action.payload.location.city;
            user.imageUrl = action.payload.picture.large;   
            return {...currenState,user:user,requestSend:false,requestReceived:true,status:"Completed",statusClass:"Success"}
            break;
         case "FETCHING_USER_FAILURE":
            return {...currenState,requestSend:false,requestReceived:true,status:"Completed",statusClass:"Failure"};
            break;
         default:
           return currenState
     }
}

const logger = window.reduxLogger.logger;
const thunk = window.ReduxThunk.default;
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || Redux.compose;
const store = Redux.createStore(userReducer,composeEnhancers(Redux.applyMiddleware(thunk)))

store.subscribe(render);

function render(){
    var state = store.getState();
    if(state.status == "pending"){
        statusLi.innerHTML = "Pending";
    }else{
        nameLi.innerHTML = state.user.name;
        emailLi.innerHTML = state.user.email;
        locationLi.innerHTML = state.user.location;
        genderLi.innerHTML = state.user.gender;
        image.setAttribute("src",state.user.imageUrl);
        statusLi.innerHTML = "Success";
    }
}

document.getElementById("randomUser").addEventListener('click',(e)=>{
    e.preventDefault();
    store.dispatch(async (dispatch)=>{
        dispatch({type:"FETCHING_USER"});
        try{
            const user = await axios.get("https://randomuser.me/api/");
            dispatch({type:"FETCHING_USER_SUCCESS",payload:user.data.results[0]});
        }catch(e){
            console.log("Error is ",e);
            dispatch({type:"FETCHING_USER_FAILURE"})
        }
    })
});