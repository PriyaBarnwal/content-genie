import {
    REMOVE_IMAGE, 
    ADD_IMAGE,
    SET_LOADING,
    UPDATE_RESULT,
    SET_ERROR,
    UPDATE_CAPTION
  } from '../actions/constants'
  
  const initialState = {
    image: {},
    error: {},
    loading: false,
    results: [
      // {url: 'https://pradeep-test-bucket.s3.us-west-1.amazonaws.com/IMG_3525.jpeg'},
      // {url: 'https://pradeep-test-bucket.s3.us-west-1.amazonaws.com/christmas-gettyimages-184652817.jpeg'},
      // {url: 'https://assets.editorial.aetnd.com/uploads/2009/10/christmas-gettyimages-184652817.jpg'},
      // {url: 'https://assets.editorial.aetnd.com/uploads/2009/10/christmas-gettyimages-184652817.jpg'}
    //   "https://pradeep-test-bucket.s3.us-west-1.amazonaws.com/IMG_3525.jpeg",
    // "https://pradeep-test-bucket.s3.us-west-1.amazonaws.com/christmas-gettyimages-184652817.jpeg",
    // "https://vista-hackathon.s3.us-west-2.amazonaws.com/output_images/fill/6A9TJ.jpg",
    // "https://vista-hackathon.s3.us-west-2.amazonaws.com/dump_images/37ZZ7.png"
    ],
    selected: {
    },
    selectedCaption: 0,
    captionGenerated: false,
    captions: [
    ],
    hashtags: [
    ],
    resultsGenerated: false
  }

  const imagesReducer = (state=initialState, action) => {
    let {type, payload} = action
  
    switch(type) {
      case ADD_IMAGE:
        return {
          ...state,
          image: payload
        }
      case REMOVE_IMAGE:
        return {
          ...state,
          image: {},
        }
      case 'SELECT_IMAGE': 
        return {
          ...state,
          selected: payload,
          image: {data_url: payload.res}
        }
      case 'SELECT_CAPTION':
        return {
          ...state,
          selectedCaption: payload
        }
      case UPDATE_RESULT:
        return {
          ...state,
          loading: false,
          results: payload,
          selected: {
            res: payload[0],
            idx: 0
          },
          image: {data_url: payload[0]},
          captionGenerated: false,
          resultsGenerated: true
        }
      case UPDATE_CAPTION:
        return {
          ...state,
          loading: false,
          captionGenerated: true,
          captions: Object.values(payload.captions),
          hashtags: payload.hashtags
        }
      case SET_LOADING: 
        return {
          ...state,
          loading: true,
          resultsGenerated: payload.type === 'results' ? false : state.resultsGenerated
        }
      case SET_ERROR: 
        return {
          ...state,
          loading: false,
          error: true
        }
      case 'RESET':
        return initialState
      default: 
        return state
    }
  }
  
export default imagesReducer