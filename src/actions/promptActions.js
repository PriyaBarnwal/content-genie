import { REMOVE_PROMPT, ADD_PROMPT } from './constants'

export const removePrompt = (payload) => (dispatch) => {
    dispatch({
      type: REMOVE_PROMPT,
      payload
    })
}

export const addPrompt = (payload) => (dispatch) => {
    dispatch({
      type: ADD_PROMPT,
      payload
    })
}