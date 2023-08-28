import { combineReducers } from 'redux'
import imagesReducer from './imagesReducer'
import promptReducer  from './promptReducer'

export default combineReducers({
  images: imagesReducer,
  prompt: promptReducer
})