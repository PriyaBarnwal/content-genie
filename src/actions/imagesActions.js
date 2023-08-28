import {REMOVE_IMAGE, ADD_IMAGE, SET_LOADING, SET_ERROR, UPDATE_RESULT, UPDATE_CAPTION} from './constants'
import axios from 'axios'

export const removeImage = (image_name) => (dispatch) => {
    dispatch({
      type: REMOVE_IMAGE,
      payload: image_name
    })
}

export const addImage = (data) => (dispatch) => {
    dispatch({
      type: ADD_IMAGE,
      payload: data
    })
}

export const selectImage =(res, idx) => (dispatch) => {
  dispatch({
    type: 'SELECT_IMAGE',
    payload: {
      res, idx
    }
  })
}

export const selectCaption =(idx) => (dispatch) => {
  dispatch({
    type: 'SELECT_CAPTION',
    payload: idx
  })
}

export const fillObject =(masked, original, textPrompt, negativePrompt) => async(dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  })

  try {
    let res1 = axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": masked}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }}),
      res2 = axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": original}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }})
    Promise.all([res1, res2]).then(async(res)=> {
      console.log("****", res)
      const formData = {
        "image": [
          {
            "image_url": res[1].data
          }
        ],
        "mask": [
          {
            "mask_url": res[0].data
          }
        ],
        "text_prompt": textPrompt,
        "negative_prompt": negativePrompt
      }
      const result = await axios.post(`http://localhost:8000/v1/fill_anything`, {...formData}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }})
debugger
      dispatch({
      type: UPDATE_RESULT,
      payload: result.data?.image_urls
    })
    })
  } catch(err) {
      dispatch({
        type: SET_ERROR,
        payload: err
      })
    }
}

export const replaceObject =(masked, original, textPrompt) => async(dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  })

  try {
    let res1 = axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": masked}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }}),
      res2 = axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": original}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }})
    Promise.all([res1, res2]).then(async(res)=> {
      console.log("****", res)
      const formData = {
        "image": [
          {
            "image_url": res[1].data
          }
        ],
        "mask": [
          {
            "mask_url": res[0].data
          }
        ],
        "text_prompt": textPrompt
      }
      const result = await axios.post(`http://localhost:8000/v1/replace_anything`, {...formData}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }})
debugger
      dispatch({
      type: UPDATE_RESULT,
      payload: result.data?.image_urls
    })
    })
  } catch(err) {
    dispatch({
      type: SET_ERROR,
      payload: err
    })
  }
}

export const removeObject =(masked, original) => async(dispatch) => {
  console.log('***** removeObject')
  dispatch({
    type: SET_LOADING,
    payload: true
  })

  try {
    let res1 = axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": masked}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }}),
      res2 = axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": original}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }})
    Promise.all([res1, res2]).then(async(res)=> {
      console.log("****", res)
      const formData = {
        "image": [
          {
            "image_url": res[1].data
          }
        ],
        "mask": [
          {
            "mask_url": res[0].data
          }
        ]
      }
      const result = await axios.post(`http://localhost:8000/v1/remove_anything`, {...formData}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }})

      dispatch({
      type: UPDATE_RESULT,
      payload: result.data?.image_urls
    })
    })
    

    
    
  } catch(err) {
    dispatch({
      type: SET_ERROR,
      payload: err
    })
  }
}

export const generateCaption = (image_url) => async(dispatch) => {
  
  dispatch({
    type: SET_LOADING,
    payload: true
  })

  try {
    const res = await axios.post(`http://localhost:8000/v1/get_captions?image_url=${image_url}`, {}, {headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }})

    dispatch({
      type: UPDATE_CAPTION,
      payload: res
    })
  } catch(err) {
    dispatch({
      type: SET_ERROR,
      payload: err
    })
  }
}