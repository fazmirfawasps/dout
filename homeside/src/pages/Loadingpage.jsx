import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import { Box } from '@mui/material'
function Loading() {

    return (
        <Box mt={15}>
            <Player
               
                autoplay={true}
                controls={true}
                src={
                    'https://assets7.lottiefiles.com/packages/lf20_p8bfn5to.json'
                }
                style={{ height: '300px', width: '300px' }}
            />
        </Box>
    )
}

export default Loading
