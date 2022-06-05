import {SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT} from '../types';
// import { Route } from 'react-router-dom';

const initialState = {
    screams: [],
    scream: {},
    loading: false

};
let index;
export default function(state= initialState, action){
    switch(action.type){
        case LOADING_DATA:
            console.log("loading state me hai");
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            console.log("set screams me hai")
            return { 
                ...state,
                screams: action.payload,
                loading: false
            }
        case SET_SCREAM:
            console.log("set scream me hai");
            console.log(action.type);
            return {
                ...state,
                scream:action.payload
            }   
        case LIKE_SCREAM:
        case UNLIKE_SCREAM: 
        console.log("like and unlike");   
            index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index]= action.payload;
            if(state.scream.screamId === action.payload.screamId){
                state.scream = action.payload;
            }
            return {
                ...state
            }
        case DELETE_SCREAM:
            console.log("deleteScream");
            index = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(index, 1);
            return {
                ...state
            }
        case POST_SCREAM:
            console.log("postScraeds");
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case SUBMIT_COMMENT:
            console.log("postScream");
            console.log(action.payload)
            return{
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }

        default:
            // console.log("defaulte");
            console.log("dataReducer default")
            return state;    


    }
}