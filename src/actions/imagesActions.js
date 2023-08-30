import {REMOVE_IMAGE, ADD_IMAGE, SET_LOADING, SET_ERROR, UPDATE_RESULT, UPDATE_CAPTION} from './constants'
import axios from 'axios'

export const removeImage = (image_name) => (dispatch) => {
    dispatch({
      type: REMOVE_IMAGE,
      payload: image_name
    })
}

export const addImage = (data, step) => (dispatch) => {
    dispatch({
      type: ADD_IMAGE,
      payload: data
    })
    if(step || step ===0)
    dispatch({
      type: 'SET_HISTORY_STEP',
      payload: step
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

export const reset = () => (dispatch) => {
  dispatch({
    type: 'RESET'
  })
}

export const fillObject =(masked, original, textPrompt, negativePrompt) => async(dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  })
  dispatch({
    type: 'SET_HISTORY',
    payload: original
  })

  try {
    const main = async(image_url, mask_url) => {
      const formData = {
        "image": [
          {
            "image_url": image_url
          }
        ],
        "mask": [
          {
            "mask_url": mask_url
          }
        ],
        "text_prompt": textPrompt,
        "negative_prompt": negativePrompt
      }
      const result = await axios.post(`http://localhost:8000/v1/replace_anything`, {...formData}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }})
  
      dispatch({
        type: UPDATE_RESULT,
        payload: result.data?.image_urls
      })
    }

    let mask_url, image_url
    const promises = []
    if(masked.startsWith("https"))
      mask_url = masked
    else {
      promises.push(axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": masked}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }}))
    }
    if(original.startsWith("https"))
      image_url = original
    else {
      promises.push(axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": original}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }}))
    }
     
    if(promises.length>0) {
      Promise.all(promises).then(async(res)=> {
        if(res.length>1)
          main(res[1].data, res[0].data)
        else if (res.length>0)
          main(image_url || res[0].data, mask_url || res[0].data)
      })
    } else {
      main(image_url, mask_url)
    }
  } catch(err) {
      dispatch({
        type: SET_ERROR,
        payload: err
      })
    }
}

export const replaceObject =(masked, original, textPrompt, negativePrompt) => async(dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  })
  dispatch({
    type: 'SET_HISTORY',
    payload: original
  })

  try {
    const main = async(image_url, mask_url) => {
      const formData = {
        "image": [
          {
            "image_url": image_url
          }
        ],
        "mask": [
          {
            "mask_url": mask_url
          }
        ],
        "text_prompt": textPrompt,
        "negative_prompt": negativePrompt
      }
      const result = await axios.post(`http://localhost:8000/v1/fill_anything`, {...formData}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }})
  
      dispatch({
        type: UPDATE_RESULT,
        payload: result.data?.image_urls
      })
    }

    let mask_url, image_url
    const promises = []
    if(masked.startsWith("https"))
      mask_url = masked
    else {
      promises.push(axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": masked}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }}))
    }
    if(original.startsWith("https"))
      image_url = original
    else {
      promises.push(axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": original}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }}))
    }
     
    if(promises.length>0) {
      Promise.all(promises).then(async(res)=> {
        if(res.length>1)
          main(res[1].data, res[0].data)
        else if (res.length>0)
          main(image_url || res[0].data, mask_url || res[0].data)
      })
    } else {
      main(image_url, mask_url)
    }
  } catch(err) {
    dispatch({
      type: SET_ERROR,
      payload: err
    })
  }
}

export const removeObject =(masked, original) => async(dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true
  })
  dispatch({
    type: 'SET_HISTORY',
    payload: original
  })
  // dispatch({
  //   type: UPDATE_RESULT,
  //   payload: [
  //     "https://pradeep-test-bucket.s3.us-west-1.amazonaws.com/IMG_3525.jpeg",
  //   "https://pradeep-test-bucket.s3.us-west-1.amazonaws.com/christmas-gettyimages-184652817.jpeg",
  //   "https://vista-hackathon.s3.us-west-2.amazonaws.com/output_images/fill/6A9TJ.jpg",
  //   "https://vista-hackathon.s3.us-west-2.amazonaws.com/dump_images/37ZZ7.png"
  //   ]
  // })
  try {
    const main = async(image_url, mask_url) => {
      const formData = {
        "image": [
          {
            "image_url": image_url
          }
        ],
        "mask": [
          {
            "mask_url": mask_url
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
    }

    let mask_url, image_url
    const promises = []
    if(masked.startsWith("https"))
      mask_url = masked
    else {
      promises.push(axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": masked}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }}))
    }
    if(original.startsWith("https"))
      image_url = original
    else {
      promises.push(axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": original}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }}))
    }
     
    if(promises.length>0) {
      Promise.all(promises).then(async(res)=> {
        if(res.length>1)
          main(res[1].data, res[0].data)
        else if (res.length>0)
          main(image_url || res[0].data, mask_url || res[0].data)
      })
    } else {
      main(image_url, mask_url)
    }
    
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
    let img_url, res
    if(!image_url.startsWith("https")) {
      res = await axios.post(`http://localhost:8000/v1/upload_image`, {"base64_image": image_url}, {headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }})
      img_url = res.data
    } else {
      img_url = image_url
    }
    res = await axios.post(`http://localhost:8000/v1/get_captions`, {image_url: img_url}, {headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }})

    dispatch({
      type: UPDATE_CAPTION,
      payload: res.data
    })
  } catch(err) {
    dispatch({
      type: SET_ERROR,
      payload: err
    })
  }
}

export const setHistoryStep = (step)=> (dispatch) =>{
  dispatch({
    type: 'SET_HISTORY_STEP',
    payload: step
  })
}