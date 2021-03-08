import * as ActionTypes from '../../router/actionTypes';

//FLASH MESSAGE
export const flashMessageSuccess = (message) => {
  return {
    type: ActionTypes.FLASHMESSAGE_SUCCESS,
    message
  }
}

export const flashMessageFailure = (message, category) => {
  return {
    type: ActionTypes.FLASHMESSAGE_FAILURE,
    message,
    category
  }
}

export const flashMessageReset = () => {
  return {
    type: ActionTypes.FLASHMESSAGE_RESET
  }
}