import * as ActionTypes from '../../router/actionTypes';
import { flashMessageSuccess, flashMessageFailure, flashMessageReset, flashMessageLoading } from '../Notifications/NotificationsFunctions';
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
    singleUser.user.modules = JSON.parse(singleUser.user.modules);
    singleUser.user.last_connection= new Intl.DateTimeFormat('en-US', {year: 'numeric', day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit', second:'2-digit', timeZone:'America/Monterrey'}).format(new Date(Date.parse(singleUser.user.last_connection)));
    singleUser.user.createdAt= new Intl.DateTimeFormat('en-US', {year: 'numeric', day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit', second:'2-digit', timeZone:'America/Monterrey'}).format(new Date(Date.parse(singleUser.user.createdAt)));
    singleUser.user.categories = singleUser.categories;
    dispatch(singleUserSuccess(singleUser.user))
  })
  .catch(error => {
    dispatch(flashMessageFailure(error.message, 'fetching', 'fa fa-user-o')) 
    dispatch(flashMessageReset())
  })
}

//POST USER
export const postNewUser = (newUser) => async (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return await fetch(baseURL + '/users', {
    method: 'POST',
    headers: { 'Authorization': bearer, 'Content-Type': 'application/json'},
    body: JSON.stringify(newUser)
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
      dispatch(flashMessageSuccess('Usuario agregado satisfactoriamente', 'fa fa-user-o'))
      dispatch(flashMessageReset())
      dispatch(fetchUsers())
    } else {
      let error = new Error(`Error: ${response.status}`);
      error.message = response.message;
      throw error;
    }
  })
  .catch(error => {
    dispatch(flashMessageFailure(error.message, 'flashMessage', 'fa fa-user-o'));
    dispatch(flashMessageReset());
  })
}

//DELETE USER
export const fetchDeleteUser = (userId) => async (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return await fetch( baseURL + '/users/' + userId , {
    method: 'DELETE',
    headers: { 'Authorization': bearer, 'Content-Type': 'application/json'}
  })
  .then(response => {
    if (response.ok) {
      dispatch(flashMessageSuccess('usuario eliminado satisfactoriamente', 'fa fa-user-o'))
      dispatch(flashMessageReset())
      dispatch(fetchUsers())
    } else {
      let error = new Error(`Error: ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  }, error => { throw error })
  .catch(error => {
    dispatch(flashMessageFailure(error.message, 'flashMessage', 'fa fa-user-o'))
    dispatch(flashMessageReset())
  })
}

//UPDATE USER
export const updateUser = (userId, userInfo) => async (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return await fetch( baseURL + '/users/' + userId , {
    method: 'PUT',
    headers: { 'Authorization': bearer, 'Content-Type': 'application/json'},
    body: JSON.stringify(userInfo)
  }) 
  .then(response => {
    if (response.ok) {
      dispatch(flashMessageSuccess('Usuario actualizado exitosamente', 'fa fa-user-o'))
      dispatch(flashMessageReset())
      dispatch(fetchSingleUser(userId))
    } else {
      let error = new Error(`Error: ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  }, error => { throw error })
  .catch(error => {
    dispatch(flashMessageFailure(error.message, 'flashMessage', 'fa fa-user-o'))
    dispatch(flashMessageReset())
  })
}

//UPDATE USER MODULES
export const updateUserModules = (userId, modules) => async (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  const update = {
    modules
  }
  return await fetch( baseURL + '/users/modules/' + userId , {
    method: 'PUT',
    headers: { 'Authorization': bearer, 'Content-Type': 'application/json'},
    body: JSON.stringify(update)
  }) 
  .then(response => {
    if (response.ok) {
      dispatch(flashMessageSuccess('Usuario actualizado exitosamente', 'fa fa-user-o'))
      dispatch(flashMessageReset())
      dispatch(fetchSingleUser(userId))
    } else {
      let error = new Error(`Error: ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  }, error => { throw error })
  .catch(error => {
    dispatch(flashMessageFailure(error.message, 'flashMessage', 'fa fa-user-o'))
    dispatch(flashMessageReset())
  })
}

//SERVICES_CATEGORIES
export const servicesCategoriesLoading = () => {
  return {
    type: ActionTypes.SERVICESCATEGORIES_LOADING
  }
}

export const servicesCategoriesFailed = (message) => {
  return {
    type: ActionTypes.SERVICESCATEGORIES_FAILED,
    message
  }
}

export const servicesCategoriesSuccess = (categories) => {
  return {
    type: ActionTypes.SERVICESCATEGORIES_SUCCESS,
    payload: categories
  }
}

export const fetchServicesCategories = () => async (dispatch) => {
  dispatch(servicesCategoriesLoading());
  const bearer = 'Bearer ' + localStorage.getItem('token');
  return await fetch( baseURL + '/services_categories', {
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
  .then(categories => {
    dispatch(servicesCategoriesSuccess(categories))
  })
  .catch(error => {
    dispatch(servicesCategoriesFailed(error.message))
  })
}

//UPDATE USER SERVICES
export const updateUserServices = (userId, categoryId) => async (dispatch) => {
  const bearer = 'Bearer ' + localStorage.getItem('token');
  const update = {
    categoryId
  }
  return await fetch( baseURL + '/users/categories/' + userId , {
    method: 'PUT',
    headers: { 'Authorization': bearer, 'Content-Type': 'application/json'},
    body: JSON.stringify(update)
  }) 
  .then(response => {
    if (response.ok) {
      dispatch(flashMessageSuccess('Usuario actualizado exitosamente', 'fa fa-user-o'))
      dispatch(flashMessageReset())
      dispatch(fetchSingleUser(userId))
    } else {
      let error = new Error(`Error: ${response.status}: ${response.statusText}`);
      error.response = response;
      throw error;
    }
  }, error => { throw error })
  .catch(error => {
    dispatch(flashMessageFailure(error.message, 'flashMessage', 'fa fa-user-o'))
    dispatch(flashMessageReset())
  })
}