import * as ActionTypes from '../../router/actionTypes';
import { flashMessageSuccess, flashMessageFailure, flashMessageReset } from '../Notifications/NotificationsFunctions';
const baseURL = process.env.NODE_ENV === 'production' ? "/api" : 'http://localhost:3001/api';

//USERS
export const usersLoading = () => {
  return {
    type: ActionTypes.USERS_LOADING
  }
}

export const usersFailed = (message) => {
  return {
    type: ActionTypes.USERS_FAILED,
    message
  }
}

export const usersSuccess = (users) => {
  return {
    type: ActionTypes.USERS_SUCCESS,
    payload: users
  }
}

export const fetchUsers = () => async (dispatch) => {
  dispatch( usersLoading() );
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return await fetch( baseURL + '/users', {
    method: 'GET',
    headers: { 'Authorization': bearer, 'Content-Type': 'application/json'}
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
  .then(users => {
    users.forEach( user => {
      user.last_connection= new Intl.DateTimeFormat('en-US', {year: 'numeric', day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit', second:'2-digit', timeZone:'America/Monterrey'}).format(new Date(Date.parse(user.last_connection)));
    })
    dispatch(usersSuccess(users))
  })
  .catch(error => {
    dispatch( usersFailed(error.message) )
  })
}

//SINGLE USER
export const singleUserLoading = () => {
  return {
    type: ActionTypes.USER_LOADING
  }
}

export const singleUserSuccess = (singleUser) => {
  return {
    type: ActionTypes.USER_SUCCESS,
    payload: singleUser
  }
}

export const fetchSingleUser = (userID) => async (dispatch) => {
  dispatch(singleUserLoading());
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return await fetch( baseURL + '/users/' + userID, {
    method: 'GET',
    headers: { 'Authorization': bearer, 'Content-Type': 'application/json'}
  })
  .then(response => {
    if (response.ok) {
      return response;
    } else {
      if(response.status === 404) {
        let error = new Error(`User not found in database`);
        error.response = response;
        throw error;
      } else {
        let error = new Error(`Error: ${response.status}: ${response.statusText}`);
        error.response = response;
        throw error;
      }
    }
  }, error => { throw error })
  .then(response => response.json())
  .then(singleUser => {
    singleUser.last_connection= new Intl.DateTimeFormat('en-US', {year: 'numeric', day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit', second:'2-digit', timeZone:'America/Monterrey'}).format(new Date(Date.parse(singleUser.last_connection)));
    singleUser.createdAt= new Intl.DateTimeFormat('en-US', {year: 'numeric', day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit', second:'2-digit', timeZone:'America/Monterrey'}).format(new Date(Date.parse(singleUser.createdAt)));
    dispatch(singleUserSuccess(singleUser))
  })
  .catch(error => {
    dispatch(flashMessageFailure(error.message, 'fetching')) 
    dispatch(flashMessageReset())
  })
}