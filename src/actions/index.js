import {
  AUTH_USER_SET
} from './types';


export const onSetAuthUser = (authUser) => {
  return (dispatch) => {
    dispatch({ type: AUTH_USER_SET, payload: authUser })
  }
};

export * from './FeedActions';
export * from './MyVideoActions';
export * from './PositionActions';
export * from './VideoActions';