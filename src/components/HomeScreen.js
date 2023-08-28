import React from 'react'
import { Container, Grid } from '@material-ui/core'
import SidePanel from './SidePanel'
import MainPanel from './MainPanel'
 
const HomeScreen =()=> {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} style={{marginTop: '35px'}}>
        <MainPanel />
        <SidePanel />
      </Grid>
    </Container>
  )
}

export default HomeScreen