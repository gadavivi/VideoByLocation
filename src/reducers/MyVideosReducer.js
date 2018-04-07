import _ from "lodash";
import {
    MY_VIDEOS_FETCH,
    DELETE_VIDEO_PROCESS,
    DELETE_VIDEO
  } from '../actions/types';
  
  const INITIAL_STATE = {
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case MY_VIDEOS_FETCH:
        return action.payload;
      case DELETE_VIDEO_PROCESS:
        const del_video = {...state[action.payload], ...{waingToBeDelete:true}}
        return {...state, [action.payload]: del_video }
      case DELETE_VIDEO:
        return _.omit(state, action.payload);
    default:
        return state;
    }
  };