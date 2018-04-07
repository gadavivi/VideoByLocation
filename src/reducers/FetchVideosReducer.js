import _ from "lodash";
import {
    VIDEOS_FETCH_SUCCESS,
    VIDEOS_REMOVE,
    META_DATA_UPDATE
  } from '../actions/types';
  
  const INITIAL_STATE = {
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case VIDEOS_FETCH_SUCCESS:
        return { ...state, ...action.payload }
      case VIDEOS_REMOVE:
        return _.omit(state, action.payload.key);
      default:
        return state;
    }
  };