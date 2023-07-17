import React from 'react';
import { Box } from '@mui/material';

function Example() {
  return (
    <Box
      sx={{
        height: '40vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        backgroundImage: 'url("/digger-1867268.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <img
        src="/digger-1867268.jpg"
        alt="Background"
        loading="lazy"
        style={{ display: 'none' }}
      />
    </Box>
  );
}

export default Example;
