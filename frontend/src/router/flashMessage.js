import * as ActionTypes from './actionTypes';

export const flashMessage = (state = {
  success: null,
  message: null,
  loading: false,
  category: null,
  icon: null
}, action) => {
  switch (action.type) {
    case ActionTypes.FLASHMESSAGE_SUCCESS:
      return {...state, success: true, message: action.message, loading: false, category: null, icon: action.icon };
    case ActionTypes.FLASHMESSAGE_FAILURE:
      return {...state, success: false, message: action.message, loading: false, category: action.category, icon: action.icon };
    case ActionTypes.FLASHMESSAGE_LOADING:
      return {...state, success: null, message: null, loading: true, category: null, icon: null};
    case ActionTypes.FLASHMESSAGE_RESET:
      return {...state, success: null, message: null, loading: false, category: null, icon: action.icon };
    default:
      return state;
  }
}