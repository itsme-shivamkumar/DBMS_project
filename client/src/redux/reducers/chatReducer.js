import {GET_CHAT} from '../types';
// import { Route } from 'react-router-dom';

const initialState = {
   
   chats: [],
   

};

export default function(state=initialState, action){
    switch(action.type){
        // case LOADING_DATA:
        //     console.log("loading state me hai");
        //     return {
        //         ...state,
        //         loading: true
        //     }
        case GET_CHAT:
            console.log("helli")
            console.log(action.type)
            return {...state,
                 chats: action.payload
                }

        default:
            // console.log(action)
            console.log("chatReducer default");
            console.log(action.type)
            return state;    


    }
}