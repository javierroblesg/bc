import * as ActionTypes from './actionTypes';

export const flashMessage = (state = {
  success: null,
  message: null,
  category: null
}, action) => {
  switch (action.type) {
    case ActionTypes.FLASHMESSAGE_SUCCESS:
      return {...state, success: true, message: action.message, category: null };
    case ActionTypes.FLASHMESSAGE_FAILURE:
      return {...state, success: false, message: action.message, category: action.category };
    case ActionTypes.FLASHMESSAGE_RESET:
      return {...state, success: null, message: null, category: null };
    default:
      return state;
  }
}