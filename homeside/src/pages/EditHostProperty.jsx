import React, { useContext,  } from 'react'
// import LinearStepper from '../layouts/host/LinearStepper'
import { CssBaseline, Container, Paper, Box } from '@mui/material'
// import { ExternalContext } from '../context/CustomContext'
import LinearStepper from '../host/Linearstepper'
// import {  useParams } from 'react-router-dom';
// import { EditHostedProperty } from '../api/apicall';
import { ExternalContext } from '../context/CustomContext'




function Editproperty() {
    const { propertyEdit } = useContext(ExternalContext)
    const defaultData = propertyEdit



    const isEdit = true
    
    
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ paddingTop: 10 ,height:'700px'}}>
                <Paper
                    component={Box}
                    sx={{ boxShadow: 20, borderRadius: 5 ,}}
                    p={5}
                >
                    <LinearStepper defaultData={defaultData} isEdit={isEdit} />
                </Paper>
            </Container>
        </>
    )
}

export default Editproperty
