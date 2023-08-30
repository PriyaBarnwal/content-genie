import React, { Fragment, useState } from 'react'
import { Grid, Backdrop, CircularProgress, Typography, Button, Chip } from '@material-ui/core'
import BlockIcon from '@material-ui/icons/Block'
import AddIcon from '@material-ui/icons/Add'
import { connect } from 'react-redux'
import {removeImage, removeObject, replaceObject, fillObject } from '../actions/imagesActions'
import {removePrompt, addPrompt} from '../actions/promptActions'
import ImageUploader from './ImageUploader'

const MainPanel= ({addPrompt, removePrompt, loading, includes, avoid, image, removeObject, replaceObject, fillObject}) => {
  const [prompt, setPrompt] = useState('')
	const createTemp = (canvasElement) => {
		const context = canvasElement.getContext('2d')
			
		const imageData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
		const data = imageData.data;
			
		for (let i = 0; i < data.length; i += 4) {
			  const r = data[i]
				const g = data[i + 1]
			  const b = data[i + 2]
			  if((r+g+b) === 0 && data[i+3] === 255){
				  data[i] = 255
				  data[i + 1] = 255
				  data[i + 2] = 255
				} else {
				  data[i] = 0
					data[i + 1] = 0
			  	data[i + 2] = 0
				}
			}
			
		const tempCanvas = document.createElement('canvas');
		tempCanvas.width = context.canvas.width;
		tempCanvas.height = context.canvas.height;
		tempCanvas.getContext('2d').putImageData(imageData, 0, 0)
		return tempCanvas.toDataURL("image/png")
	}
	const fillBackground =() => {
		const canvasElement = document.getElementById("my-canvas")
		
		if(canvasElement) {
			fillObject(createTemp(canvasElement), image.data_url, includes.join(','), avoid.join(','))
		}
	}

	const replaceObj =() => {
		const canvasElement = document.getElementById("my-canvas")
		if(canvasElement) {
			replaceObject(createTemp(canvasElement), image.data_url, includes.join(','), avoid.join(','))
		}
	}

	const removeObj =() => {
		const canvasElement = document.getElementById("my-canvas")
		if(canvasElement) {
			removeObject(createTemp(canvasElement), image.data_url)
		}
	}

	const addInclude =() => {
		addPrompt({type: 'includes', value: prompt})
		setPrompt('')
	}

	const addAvoid =() => {
		addPrompt({type: 'avoid', value: prompt})
		setPrompt('')
	}

	const handleDelete =(val, type) => {
		removePrompt({val, type})

	}

  return  (
    <Fragment>
      <Backdrop style={{zIndex: 101, color: '#fff'}} open={loading}><CircularProgress thickness={4} size={50} /></Backdrop>
      <Grid item container xs={9} direction="column" className="main-panel">
        <div elevation={3} style={{height: '600px'}} className="upload-panel">
					<ImageUploader/>
        </div>
        <div elevation={3} style={{height: '220px'}} className="form-panel">
					<form id="my-form" style={{position: 'absolute'}} onSubmit={(e) =>e.preventDefault()}>
						<input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your prompt here..."/>
						<div>
							<Button startIcon={<AddIcon />} variant="text" className="include-btn" onClick={addInclude}>include</Button>
							<Button startIcon={<BlockIcon />} variant="text" className="avoid-btn" onClick={addAvoid}>avoid</Button>
						</div>
					</form>
					<Grid container style={{padding: '50px 25px 50px 50px'}}>
            <Grid item xs={9} className="prompts">
							<Typography style={{color: "#aceeea"}} variant="overline">INCLUDE</Typography>

							<div style={{marginBottom: '30px', fontSize: '14px'}}>
							 { includes.length>0 ? includes.map((inc) => <Chip label={inc} size="small" style={{color: 'white', borderColor: 'grey'}} variant="outlined" onDelete={() =>handleDelete(inc, 'includes')} />) : 'No prompt added' }
							</div>
							<Typography style={{color: "#d0b49c"}} variant="overline">AVOID</Typography>
							<div style={{marginBottom: '30px', fontSize: '14px'}}>
							 { avoid.length>0 ? avoid.map((avo) => <Chip label={avo} size="small" style={{color: 'white', borderColor: 'grey'}} variant="outlined" onDelete={() => handleDelete(avo, 'avoid')} />) : 'No prompt added' }
							</div>
							{/* <div><Typography variant="body2">{avoid.length>0 ? avoid.join(', '): 'No prompt added'}</Typography></div> */}
						</Grid>
						<Grid item xs={3} className="button-container">
							<Button variant="contained" className="side-button" style={{marginBottom: '10px'}} fullWidth={true} onClick={fillBackground}>
								Fill Background
							</Button>
							<Button variant="contained" className="side-button" style={{marginBottom: '10px'}} fullWidth={true} onClick={replaceObj}>
								Replace Object 
							</Button>
							<Button variant="contained" className="side-button" fullWidth={true} onClick={removeObj}>
								Remove Object 
							</Button>
							</Grid>
							</Grid>
        </div>
    </Grid>
  </Fragment>
  )
}

const mapStateToProps = state => ({
  loading: state.images.loading,
	includes: state.prompt.includes,
	avoid: state.prompt.avoid,
	image: state.images.image
})
    
  export default connect(mapStateToProps, { removeImage, addPrompt, removePrompt, removeObject, replaceObject, fillObject})(MainPanel)
