import React from 'react'
import { Grid, Paper, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import placeHolder from '../assets/sideplaceholder.png'
import { selectImage, selectCaption, generateCaption, reset } from '../actions/imagesActions'

const SidePanel= ({results, selectImage, selectCaption, selectedResult, selectedCaption, captionGenerated, generateCaption, captions, hashtags, reset}) => {
	const imgObjects = results.map((res, index) => {
		return <img 
						src={res} 
						alt="" 
						height="207" 
						width="220" 
						style={{marginBottom: '10px', borderRadius: '5px', cursor: 'pointer', border: (selectedResult.idx === index? '1px solid white': 0)}} 
						key={index} 
						onClick={()=> selectImage(res, index)}
					/>
	})

	const handleDownload = () => {
    if (selectedResult) {
      // Create a link element
      const link = document.createElement('a')
      link.href = selectedResult.res
      link.download = 'downloaded.jpg' // Specify the default filename for download
      link.click()
    }
  }

	const sideObj = () => {
		if (results.length>0 && !captionGenerated) {
			return (
				<>
				<Grid item style={{textAlign: 'center', marginTop: '10px', overflowY: 'scroll', maxHeight: '650px',}}>
				{imgObjects}

				</Grid>
				<Button variant="contained" color="info" fullWidth style={{background: '#95a3e4', textTransform: 'capitalize', marginTop: '20px'}} onClick={handleDownload}>
				Download image
			</Button> 
			<Button variant="contained" color="info" style={{ background: 'rgba(255, 255, 255, 0.55)', textTransform: 'capitalize', marginTop: '10px'}} fullWidth onClick={()=> generateCaption(selectedResult.res)}>
				Generate captions
			</Button> 
			</>
			)
		} else if (captionGenerated && captions.length>0) {
			return (
				<>
				<Grid item style={{overflowY: 'scroll', maxHeight: '500px', textAlign: 'center', marginTop: '10px'}}>
					{captions.map((caption, index) => {
						return <Paper 
							key={index}
							variant="outlined" 
							className='capitalize-first-letter'
							elevation={3} 
							onClick={()=> selectCaption(index)}
							style={{background: 'rgba(0,0,0,0.5)', textAlign: 'left', color: 'white', marginBottom: '10px', padding: '5px', fontSize: '13px', borderColor: selectedCaption === index? 'white': 'black'}}
						>{caption}</Paper>
					})}
					</Grid>
					<Grid item style={{fontSize: '22px', textAlign: 'center', borderBottom: '1px solid grey', borderTop: '1px solid grey', padding: '10px', marginTop: '10px', height: '50px', width: '100%'}} >
						Generated Hashtags
					</Grid>
					<Paper
						variant="outlined" 
						elevation={3} 
						style={{background:'rgba(0,0,0,0.5)', minHeight: '50px', textAlign: 'left', color:'white', marginBottom: '10px', marginTop: '10px', padding: '20px 10px', fontSize: '15px', borderColor: 'white'}}
					>{hashtags.join(', ')}</Paper>
						<Button variant="contained" color="info" fullWidth style={{background: '#95a3e4', textTransform: 'capitalize'}} onClick={()=> console.log('')}>
							Open in editor
						</Button>
						<Button variant="contained" color="info" style={{ background: 'rgba(255, 255, 255, 0.55)', textTransform: 'capitalize', marginTop: '10px'}} fullWidth onClick={reset}>
							Reset
						</Button> 
				</>
			)
		} else {
			return (
				<Grid item style={{textAlign: 'center', marginTop: '50px', fontSize: '18px', color:'grey'}} >
					<img src={placeHolder} alt="placeholder"/>
					<div>Upload image and get started</div>
				</Grid>
			)
		}
	}

  return (
    <Grid item xs={3} direction="row" spacing={3} className="side-panel">
      <Grid item style={{fontSize: '20px', textAlign: 'center', borderBottom: '1px solid grey', paddingTop: '0', height: '35px', width: '100%'}} >
        {captionGenerated && captions.length>0 ? 'Generated Captions': 'Results'}
      </Grid>
      <Grid item >
       {sideObj()}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = state => ({
  images: state.images.images,
  results: state.images.results,
	selectedResult: state.images.selected,
	selectedCaption: state.images.selectedCaption,
	captionGenerated: state.images.captionGenerated,
	captions: state.images.captions,
	hashtags: state.images.hashtags
})
  
export default connect(mapStateToProps, {selectImage, selectCaption, generateCaption, reset })(SidePanel)
