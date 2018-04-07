import {
    NEW_FIELD_UPDATE,
    SAVE_VIDEO,
    SAVE_VIDEO_PROCESS,
    ERROR_SAVE_VIDEO
  } from '../actions/types';
  
  const INITIAL_STATE = {
    uri: '',
    error: '',
    uploading: false
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case NEW_FIELD_UPDATE:
        return { ...state, [action.payload.prop]: action.payload.value };
      case SAVE_VIDEO_PROCESS:
        return { ...state, uploading: true}
      case SAVE_VIDEO:
        return INITIAL_STATE;
      case ERROR_SAVE_VIDEO:
        return {...state, error: action.payload, uploading: false }
      default:
        return state;
    }
  };