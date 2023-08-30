import React, { useState, useRef, useEffect } from 'react'
import { IconButton } from '@material-ui/core'
import UndoIcon from '@material-ui/icons/Undo'
import RedoIcon from '@material-ui/icons/Redo'

function CanvasApp({image, parentWidth, addImage, history, step}) {
  const canvasRef = useRef(null)
  const [context, setContext] = useState(null)
  const [brushSize, setBrushSize] = useState(15)
  const [drawing, setDrawing] = useState(false)
  const [undoStack, setUndoStack] = useState([])
  const [redoStack, setRedoStack] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    setContext(ctx)
    
  }, [canvasRef])

  useEffect(()=> {
    if (image.data_url && context) {
      const image1 = document.createElement("img")
      image1.setAttribute('crossorigin', 'anonymous')
      image1.src = image.data_url
      image1.width = 600
      image1.height = 600
      image1.addEventListener("load", () => {
        context?.drawImage(image1, 0, 0, 600, 600)
        setUndoStack([canvasRef.current.toDataURL()])
      })
      image1.addEventListener("error", (err)=> console.log("error", err))
    }
  }, [context, image, parentWidth])

  // Handle mouse down event to start drawing
  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.lineWidth = brushSize
    context.strokeStyle = 'black'

    context.beginPath()
    context.moveTo(offsetX, offsetY)

    setDrawing(true)
  
  }

  // Handle mouse move event to draw
  const handleMouseMove = (e) => {
    if (!drawing) return
    const { offsetX, offsetY } = e.nativeEvent
    context.lineTo(offsetX, offsetY)
    context.stroke()
  }

  // Handle mouse up event to stop drawing
  const handleMouseUp = () => {
    if (drawing) {
      context.closePath()
      setDrawing(false)

      // Save the current canvas state for undo
      setUndoStack((prev) => [...prev, canvasRef.current.toDataURL()])
    }
  }

  // Handle brush size change
  const handleBrushSizeChange = (e) => {
    setBrushSize(parseInt(e.target.value))
  }

  // Handle undo
  const handleUndo = () => {
    if (undoStack.length > 1) {
      const lastState = undoStack.pop()
      setRedoStack((prev) => [...prev, lastState])
      const img = new Image()
      img.src = undoStack[undoStack.length - 1]
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        context.drawImage(img, 0, 0)
      }
    } else {
      const lastState = undoStack.pop()
      setRedoStack((prev) => [...prev, lastState])
      if(history.length === 0)
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      else {
          addImage({data_url: history[step]}, step-1)
        }
    } 
  }

  // Handle redo
  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop()
      setUndoStack((prev) => [...prev, nextState])
      const img = new Image()
      img.src = nextState
      img.setAttribute('crossorigin', 'anonymous')
      img.onload = () => {
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        context.drawImage(img, 0, 0)
      }
    }
  }

  return (
    <>
    <div style={{position: 'absolute', bottom: '5%', right: '2%'}}>
      <input
        type="range"
        min="10"
        max="50"
        value={brushSize}
        onChange={handleBrushSizeChange}
      />

</div>
      <div style={{top: '2%', position: 'absolute', right: '2%'}}>
       <IconButton aria-label="undo" onClick={handleUndo} color="primary" style={{color: '#949494', background: 'rgba(00,0,0, 0.6)', borderTopLeftRadius: '10px', borderTopRightRadius: 0, borderBottomLeftRadius: '10px', borderBottomRightRadius: 0}}>
        <UndoIcon fontSize="small"/>
      </IconButton>
      <IconButton aria-label="redo" onClick={handleRedo} color="primary" style={{color: '#949494', marginLeft: '1px',background: 'rgba(00,0,0, 0.6)', borderTopLeftRadius: 0, borderTopRightRadius: '10px', borderBottomLeftRadius: 0, borderBottomRightRadius: '10px'}}>
        <RedoIcon fontSize="small"/>
      </IconButton>
      </div>
      <canvas
        id="my-canvas"
        style={{borderRadius: '1px'}}
        ref={canvasRef}
        width={600}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </>
  )
}

export default CanvasApp