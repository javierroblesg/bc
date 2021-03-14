import * as ActionTypes from './actionTypes';

export const users = (state = {
  isLoading: false,
  users: [],
  errorMessage: null,
  loaded: false
}, action) => {
  switch (action.type) {
    case ActionTypes.USERS_LOADING:
      return {...state, isLoading: true, users: [], errorMessage: null, loaded: false};
    case ActionTypes.USERS_SUCCESS:
      return {...state, isLoading: false, users: action.payload, errorMessage: null, loaded: true};
    case ActionTypes.USERS_FAILED:
      return {...state, isLoading: false, users: [], errorMessage: action.message, loaded: true};
    default:
      return state;
  }
}

export const singleUser = (state = {
  isLoading: false,
  user: [],
  errorMessage: null,
  loaded: false
}, action) => {
  switch (action.type) {
    case ActionTypes.USER_LOADING:
      return {...state, isLoading: true, user: [], errorMessage: null, loaded: false};
    case ActionTypes.USER_SUCCESS:
      return {...state, isLoading: false, user: action.payload, errorMessage: null, loaded: true};
    default:
      return state;
  }
}

export const userTypes = (state = {
  isLoading: false,
  userTypes: [],
  errorMessage: null,
  loaded: false
}, action) => {
  switch (action.type) {
    case ActionTypes.USERTYPES_LOADING:
      return {...state, isLoading: true, userTypes: [], errorMessage: null, loaded: false};
    case ActionTypes.USERTYPES_SUCCESS:
      return {...state, isLoading: false, userTypes: action.payload, errorMessage: null, loaded: true};
    case ActionTypes.USERTYPES_FAILED:
      return {...state, isLoading: false, userTypes: [], errorMessage: action.message, loaded: true};
    default:
      return state;
  }
}