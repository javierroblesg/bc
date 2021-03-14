import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { auth } from './auth';
import { users, singleUser, userTypes } from './users';
import { servicesCategories } from './services';
import { flashMessage } from './flashMessage'

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      auth,
      users,
      userTypes,
      singleUser,
      flashMessage,
      servicesCategories
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
}