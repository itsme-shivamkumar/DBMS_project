import {
      GET_CHAT
   } from '../types';

import axios from 'axios';

//Get all screams
export const getChats = () => dispatch => {
    
    axios.get('/getChats').then(res => {
        dispatch({
            type: GET_CHAT,
            payload: res.data
        })
    })
}