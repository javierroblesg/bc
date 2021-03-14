import * as ActionTypes from './actionTypes';

export const servicesCategories = (state = {
  isLoading: false,
  categories: [],
  errorMessage: null,
  loaded: false
}, action) => {
  switch (action.type) {
    case ActionTypes.SERVICESCATEGORIES_LOADING:
      return {...state, isLoading: true, categories: [], errorMessage: null, loaded: false};
    case ActionTypes.SERVICESCATEGORIES_SUCCESS:
      return {...state, isLoading: false, categories: action.payload, errorMessage: null, loaded: true};
    case ActionTypes.SERVICESCATEGORIES_FAILED:
      return {...state, isLoading: false, categories: [], errorMessage: action.message, loaded: true};
    default:
      return state;
  }
}