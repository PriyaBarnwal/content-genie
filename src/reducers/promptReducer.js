import {
    REMOVE_PROMPT, 
    ADD_PROMPT
  } from '../actions/constants'
  
  const initialState = {
    includes: [],
    avoid: []
  }

  const promptReducer = (state=initialState, action) => {
    let {type, payload} = action
  
    switch(type) {
      case ADD_PROMPT:
        const promptType = payload.type,
						  newPrompt = [...state[promptType], payload.value]
        return {
          ...state,
          [promptType]: newPrompt
        }
      case REMOVE_PROMPT:
				const newRes = state[payload.type].filter(pr => pr!==payload.val)
        return {
          ...state,
          [payload.type]: newRes
        }
      default: 
        return state
    }
  }
  
export default promptReducer