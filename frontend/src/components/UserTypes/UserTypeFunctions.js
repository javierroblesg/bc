import * as ActionTypes from '../../router/actionTypes';
import { flashMessageSuccess, flashMessageFailure, flashMessageReset, flashMessageLoading } from '../Notifications/NotificationsFunctions';
const baseURL = process.env.NODE_ENV === 'production' ? "/api" : 'http://localhost:3001/api';

//USER_TYPES
export const userTypesLoading = () => {
  return {
    type: ActionTypes.USERTYPES_LOADING
  }
}

export const userTypesFailed = (message) => {
  return {
    type: ActionTypes.USERTYPES_FAILED,
    message
  }
}

export const userTypesSuccess = (userTypes) => {
  return {
    type: ActionTypes.USERTYPES_SUCCESS,
    payload: userTypes
  }
}

export const fetchUserTypes = () => async (dispatch) => {
  dispatch(userTypesLoading());
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return await fetch( baseURL + '/user_types', {
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
  .then(userTypes => {
    dispatch(userTypesSuccess(userTypes))
  })
  .catch(error => {
    dispatch(userTypesFailed(error.message))
  })
}

//POST USER TYPE
export const postNewUserType = (newUserType) => async (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return await fetch(baseURL + '/user_types', {
    method: 'POST',
    headers: { 'Authorization': bearer, 'Content-Type': 'application/json'},
    body: JSON.stringify(newUserType)
  })
  .then(response => {
    if(response.ok) {
      return response;
    } else {
      let error = new Error(`Error: ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  }, error => {throw error})
  .then(response => response.json())
  .then(response => {
    if (response.success) {
      dispatch(flashMessageSuccess('Tipo de usuario agregado satisfactoriamente', 'fa fa-fw fa-users'))
      dispatch(flashMessageReset())
      dispatch(fetchUserTypes())
    } else {
      let error = new Error(`Error: ${response.status}`);
      error.message = response.message;
      throw error;
    }
  })
  .catch(error => {
    dispatch(flashMessageFailure(error.message, 'flashMessage', 'fa fa-fw fa-users'));
    dispatch(flashMessageReset());
  })
}

//DELETE USER TYPE
export const fetchDeleteUserType = (userTypeId) => async (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return await fetch( baseURL + '/user_types/' + userTypeId , {
    method: 'DELETE',
    headers: { 'Authorization': bearer, 'Content-Type': 'application/json'}
  })
  .then(response => {
    if (response.ok) {
      dispatch(flashMessageSuccess('Tipo de suario eliminado satisfactoriamente', 'fa fa-fw fa-users'))
      dispatch(flashMessageReset())
      dispatch(fetchUserTypes())
    } else {
      let error = new Error(`Error: ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  }, error => { throw error })
  .catch(error => {
    dispatch(flashMessageFailure(error.message, 'flashMessage', 'fa fa-fw fa-users'))
    dispatch(flashMessageReset())
  })
}