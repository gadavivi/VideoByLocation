import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from "redux-promise";
import ReduxThunk from 'redux-thunk';

import App from './components/App';
import rootReducer from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk,ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <App />
  </Provider>,
  document.getElementById('app'));