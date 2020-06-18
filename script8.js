import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reduxMiddleware from 'redux-promise-middleware';

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

function userReducer(currentState= initialState,action){
     const user = {
         name:"",
         gender:"",
         location:"",
         email:"",
         imageUrl:""
     }
     switch(action.type){
         case "FETCH_USER_PENDING":
           return {...currentState,requestSend:true,status:"pending",statusClass:"pending"};
         case "FETCH_USER_FULFILLED":
            user.name = `${action.payload.data.results[0].name.first} ${action.payload.data.results[0].name.last}`;
            user.gender = action.payload.data.results[0].gender;
            user.email = action.payload.data.results[0].email;
            user.location = action.payload.data.results[0].location.city;
            user.imageUrl = action.payload.data.results[0].picture.large;
            return {...currentState,user:user,requestSend:false,requestReceived:true,status:"Completed",statusClass:"Success"};
         case "FETCH_USER_REJECTED":
         return {...currentState,requestSend:false,requestReceived:true,status:"Completed",statusClass:"Failure"};
         default:
           return currentState;
     }
}

const store = createStore(userReducer,applyMiddleware(reduxMiddleware));

store.subscribe(render);

function render(){
   var state = store.getState();
   console.log(state);
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

document.getElementById("get-random-user").addEventListener("click",function(event){
    event.preventDefault();
    // store.dispatch((dispatch)=>{
    //     dispatch({type:"FETCH_USER"});
    //     axios.get("https://randomuser.me/api/")
    //     .then((data)=>{
    //        console.log(data.data.results[0]);
    //        dispatch({type:"USER_RECEIVED",payload:data.data.results[0]})
    //     })
    //     .catch(()=>{

    //     });
    //     dispatch({type:"AFTER_ASYNC"});
    // });
    store.dispatch({
        type:'FETCH_USER',
        payload:axios.get("https://randomuser.me/api/")
    })
});
