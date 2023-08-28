import React from 'react'
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import logo from '../assets/logo.png'
 
const Header= () => {
  return (
    <AppBar position="static" color='default'>
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
      
  <img src={logo} alt="Khoros logo" height={30} style={{margin: '0 10px'}}/>
    </IconButton>
    <div style={{display: 'flex', flexDirection: 'column'}}>
    <Typography variant="h7" style={{'flexGrow': 1, fontWeight: 600}}>
      Content GENie
    </Typography>
    </div>
  </Toolbar>
</AppBar>
  )
}

export default Header
