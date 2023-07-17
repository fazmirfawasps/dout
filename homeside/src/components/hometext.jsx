import React from 'react';
import '../style/hometext.css'
import { Typography} from '@mui/material'


const HomeText = () => {
  // const { isTrue } = props;
  return (
    <div >
      {/* {isTrue ? <p>Latest on the <br /> Property listing.</p> : <p>Top rated <br /> Properties.</p>}
      <div className="my-div" style={{
        border: '.3vw solid #4d4d4d', width: '9rem', backgroundColor: '#4d4d4d',
        marginBottom: '4rem',
        borderRadius: '10px', display: 'block'
      }}></div> */}
       <Typography pt={2} pb={2} color="primary" variant="h4">
                            Looking for the perfect stay?
                        </Typography>

    </div>

  );
};

export default HomeText;