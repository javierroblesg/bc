import * as ActionTypes from '../../router/actionTypes';

//LOGOUT
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
