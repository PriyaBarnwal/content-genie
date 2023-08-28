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
    // "https://pradeep-test-bucket.s3.us-west-1.amazonaws.com/IMG_3525.jpeg",
    // "https://pradeep-test-bucket.s3.us-west-1.amazonaws.com/christmas-gettyimages-184652817.jpeg"
    ],
    selected: {
      res: "https://pradeep-test-bucket.s3.us-west-1.amazonaws.com/IMG_3525.jpeg",
      idx: 0
    },
    selectedCaption: 2,
    captionGenerated: false,
    // captions: [
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
    //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries"
    // ],
    // hashtags: ["#well", "#igpost", "#instalike", "#hohoho", "#well", "#igpost", "#instalike", "#hohoho", "#instalike", "#hohoho"]
    captions: [
      "English: Discover our botanically-based skincare that nourishes your skin",
      "Our products use the best of nature and science.French: Découvrez nos produits de soin pour la peau à base de plantes qui nourrissent votre peau",
      "Nos produits utilisent le meilleur de la nature et de la science",
      "Chinese: 来发现我们植物本位的护肤品,让你的肌肤焕然一新。我们的产品融合了大自然与科学的精华。German: Entdecken Sie unsere pflanzlich basierte Hautpflege, die Ihre Haut nährt",
      "Unsere Produkte verwenden das Beste aus Natur und Wissenschaft.Dutch: Ontdek onze op planten gebaseerde huidverzorging die uw huid voedt",
      "Onze producten gebruiken het beste van natuur en wetenschap."
    ],
    hashtags: [
      "#arbonne",
      "#arbonneproducts",
      "#skincare",
      "#naturalskincare",
      "#cleanbeauty",
      "#crueltyfree",
      "#veganbeauty",
      "#healthyliving",
      "#selfcare",
      "#huidverzorging"
    ]
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
          }
        }
      case UPDATE_CAPTION:
        return {
          ...state,
          loading: false,
          captionGenerated: true,
          captions: payload.captions,
          hashtags: payload.hashtags
        }
      case SET_LOADING: 
        return {
          ...state,
          loading: true
        }
      case SET_ERROR: 
        return {
          ...state,
          loading: false,
          error: true
        }
      default: 
        return state
    }
  }
  
export default imagesReducer