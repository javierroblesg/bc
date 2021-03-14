import * as ActionTypes from '../../router/actionTypes';

//FLASH MESSAGE
export const flashMessageSuccess = (message, icon) => {
  return {
    type: ActionTypes.FLASHMESSAGE_SUCCESS,
    message,
    icon
  }
}

export const flashMessageFailure = (message, category, icon) => {
  return {
    type: ActionTypes.FLASHMESSAGE_FAILURE,
    message,
    category,
    icon
  }
}

export const flashMessageLoading = () => {
  return {
    type: ActionTypes.FLASHMESSAGE_LOADING,
  }
}

export const flashMessageReset = () => {
  return {
    type: ActionTypes.FLASHMESSAGE_RESET
  }
}