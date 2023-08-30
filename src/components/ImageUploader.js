import React, { useRef } from 'react'
import { Button } from '@material-ui/core'
import ImageUploading from 'react-images-uploading'
import { connect } from 'react-redux'
import {addImage} from '../actions/imagesActions' 
import imagePicker from '../assets/imagepicker.png'
import ImageEditor from './ImageEditor'

const ImageUploader = ({addImage, image, resultsGenerated}) => {
 
  const onChange = (imageList) => {
    addImage(imageList[0])
  }

	const uploaderContainerRef = useRef(null)
 
	const btnStyle = !image.data_url ? {fontSize: '0.7rem', textTransform: 'capitalize', color: 'white', marginTop: '5px'}: {fontSize: '0.7rem', color: 'white', textTransform: 'capitalize', position: 'absolute', left: '5px', top: '40px'}
  return (
    <div>
      <ImageUploading
        multiple={false}
        value={[image]}
        acceptType={['jpg', 'png', 'jpeg']}
        onChange={onChange}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          isDragging,
          dragProps,
        }) => (
          <div ref={uploaderContainerRef} className='image-uploader' {...dragProps} style={isDragging? {backgroundColor: 'grey'}: {}} >
						{image.data_url && 
						<>
						<ImageEditor image={image} parentWidth={uploaderContainerRef.current?.clientWidth || 900} resultsGenerated={resultsGenerated} />
						</>}
            {!image.data_url ? <img src={imagePicker} onClick={onImageUpload} alt="" style={{cursor: 'pointer'}}/>: <img src={imagePicker} onClick={onImageUpload} height="30" alt="" style={{cursor: 'pointer', position: 'absolute', top: '2%', left: '2%'}}/>}
            {<Button onClick={onImageUpload} color="transparent" variant="text" style={btnStyle}>{!image.data_url ? 'Upload image' : 'Change'}</Button>}
          </div>
        )}
      </ImageUploading>
    </div>
  )
}
const mapStateToProps = state => ({
  image: state.images.image,
  resultsGenerated: state.images.resultsGenerated
})

export default connect(mapStateToProps, { addImage })(ImageUploader)
