import * as ActionTypes from '../../router/actionTypes';
const baseURL = process.env.NODE_ENV === 'production' ? "/api" : 'http://localhost:3001/api';

//LOGIN & LOGOUT
export const requestLogin = (creds) => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    creds
  }
}

export const receiveLogin = (response, username) => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    token: response.token,
    modules: response.modules,
    username: username
  }
}

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message
  }
}

export const loginUser = (creds) => async (dispatch) => {
  dispatch(requestLogin(creds));
  return await fetch(baseURL + '/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(creds)
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      let error = new Error(`Error: ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  }, error => { throw error })
  .then(response => response.json())
  .then(response => {
    if (response.success) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', creds.username);
      localStorage.setItem('modules', JSON.stringify(response.modules));
      dispatch(receiveLogin(response, creds.username));
    } else {
      let error = new Error(`Error: ${response.status}`);
      error.message = response.message;
      throw error;
    }
  })
  .catch(error => dispatch(loginError(error.message)))
}

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS
  }
}

export const logoutUser = () => async (dispatch) => {
  dispatch(requestLogout());
  localStorage.clear();
  dispatch(receiveLogout());
}
