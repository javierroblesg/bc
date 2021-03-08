import * as ActionTypes from './actionTypes';

export const auth = (state = {
  isLoading: false,
  isAuthenticated: localStorage.getItem('token') ? true : false,
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? localStorage.getItem('user') : null,
  modules: localStorage.getItem('modules') ? JSON.parse(localStorage.getItem('modules')) : null,
  errorMessage: null
}, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {...state, isLoading: true, isAuthenticated: false, user: action.creds};
    case ActionTypes.LOGIN_SUCCESS:
      return {...state, isLoading: false, isAuthenticated: true, errorMessage: '', token: action.token, modules: action.modules, user: action.username};
    case ActionTypes.LOGIN_FAILURE:
      return {...state, isLoading: false, isAuthenticated: false, errorMessage: action.message};
    case ActionTypes.LOGOUT_REQUEST:
      return {...state, isLoading: true, isAuthenticated: true};
    case ActionTypes.LOGOUT_SUCCESS:
      return {...state, isLoading: false, isAuthenticated: false, token: '', user: null, modules: null}
    default:
      return state;
  }
}