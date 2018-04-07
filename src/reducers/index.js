import { combineReducers } from 'redux';
import sessionReducer from './session';
import UploadVideoReducer from './UploadVideoReducer';
import FetchVideosReducer from './FetchVideosReducer';
import UserPositionReducer from './UserPositionReducer';
import MyVideosReducer from './MyVideosReducer';
import MapVideosReducer from './MapVideosReducer';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  position: UserPositionReducer,
  video: UploadVideoReducer,
  fetchVideos: FetchVideosReducer,
  myVideos: MyVideosReducer,
  mapVideos: MapVideosReducer
});

export default rootReducer;
