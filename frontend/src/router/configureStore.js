import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { auth } from './auth';
import { users, singleUser } from './users';
import { flashMessage } from './flashMessage'

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth,
      users,
      singleUser,
      flashMessage
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}