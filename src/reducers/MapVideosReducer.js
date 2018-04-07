import _ from "lodash";
import {
    MAP_VIDEOS_FETCH_SUCCESS,
    MAP_VIDEOS_REMOVE
  } from '../actions/types';
  
  const INITIAL_STATE = {
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case MAP_VIDEOS_FETCH_SUCCESS:
        return { ...state, ...action.payload };
      case MAP_VIDEOS_REMOVE:
        return _.omit(state, action.payload.key);
    default:
        return state;
    }
  };