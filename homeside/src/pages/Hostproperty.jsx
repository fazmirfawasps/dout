import React from 'react'
import LinearStepper from '../host/Linearstepper'
import { CssBaseline, Container, Paper, Box } from '@mui/material'

function Hostproperty() {
    const defaultData = {
        PropertyName: '',
        Description: '',
        vehicleType: '',
        Price: '',
       
        Address: '',
        
        images: [],
        Available:''
    }
    const isEdit = false
    return (
        <>
            <CssBaseline />
            <Container maxWidth="lg" sx={{ paddingTop: 10 , }}>
                <Paper
                    component={Box}
                    sx={{ boxShadow: 20, borderRadius: 5 }}
                    p={5}
                >
                    <LinearStepper defaultData={defaultData} isEdit={isEdit} />
                </Paper>
            </Container>
        </>
    )
}

export default Hostproperty
