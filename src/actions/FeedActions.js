import _ from 'lodash';

import {
  VIDEOS_FETCH_SUCCESS,
  MY_VIDEOS_FETCH
} from './types';

import { auth, db } from '../firebase/firebase';



export const updateMetaData = (VideoId, video, path, val) => {
  return (dispatch) => {
    const { currentUser } = auth;
    db.ref(`/Videos/${VideoId}/${path}/${currentUser.uid}`).once('value', (snapshot) => {
      if (val) {
        db.ref(`/Videos/${VideoId}/${path}/${currentUser.uid}`).set(val);
        if (val != snapshot.val()) {
          video[`${path}_counter`] += 1
          if (!video[path])
            video[path] = {}
          video[path] = { [currentUser.uid]: true }
          return dispatch({
            type: VIDEOS_FETCH_SUCCESS,
            payload: {
              [VideoId]: video
            }
          })
        }
      }
      else {
        db.ref(`/Videos/${VideoId}/${path}/${currentUser.uid}`).remove();
        if (val != snapshot.val()) {
          video[`${path}_counter`] -= 1
          video[path] = _.omit(video[path], currentUser.uid)
          return dispatch({
            type: VIDEOS_FETCH_SUCCESS,
            payload: {
              [VideoId]: video
            }
          })
        }
      }
    });
  }
}