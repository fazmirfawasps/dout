import React , { useEffect, useRef }from 'react';
// import Carousel from 'react-material-ui-carousel'
import { Button, } from '@mui/material';
import '../style/home.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import anime from 'animejs';



const TextWrapper = styled(Typography)`
  display: inline-block;

  .letter {
    display: inline-block;
  }
`;


function HostComponent() {
  const textWrapperRef = useRef(null);

  useEffect(() => {
    const textWrapper = textWrapperRef.current;

    textWrapper.innerHTML = textWrapper.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );

    anime.timeline({ loop: true })
      .add({
        targets: '.ml2 .letter',
        scale: [4, 1],
        opacity: [0, 1],
        translateZ: 0,
        easing: 'easeOutExpo',
        duration: 950,
        delay: (el, i) => 70 * i,
      })
      .add({
        targets: '.ml2',
        opacity: 0,
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 1000,
      });
  }, []);
  const navigate = useNavigate()
  const Toadd=()=>{
    navigate ('/add')
  }
  const ToViewHosted=()=>{
    navigate ("/viewhosted")
  }
const isHosted = useSelector((state) => state.user.isHosted)
  return (
<div style={{ position: 'relative', width: '100%', backgroundColor: '#f1faee', height: '90vh' }}>
<div style={{ position: 'absolute', bottom: '20vh', left: '10vw' , right: '10vw' }}>
  {isHosted?<TextWrapper ref={textWrapperRef} variant="h3" className="ml2" >
    YOU HAVE HOSTED YOUR VEHICLE
  </TextWrapper>:<TextWrapper ref={textWrapperRef} variant="h3" className="ml2">
    TRY HOSTING WITH US
  </TextWrapper>}
  <style >{`
        @media (max-width: 768px) {
          .ml2 {
            font-size: 3rem;
          }
        }

        @media (max-width: 576px) {
          .ml2 {
            font-size: 2rem;
          }
        }
      `}</style>
  

  {/* Add the button below the TextWrapper */}
  
  <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
    {isHosted ? (
      <Box>
      <Button
        style={{ backgroundColor: '#1d3557', color: 'white', marginLeft: '1rem' }}
        onClick={ToViewHosted}
      >
        View Hosted Vehicle
      </Button>
      <Button
      style={{ backgroundColor: '#e63946', color: 'white', marginLeft: '1rem' }}
      onClick={Toadd}
    >
      Host another vehicle
    </Button>
    </Box>
    ) : (
      <Button
        style={{ backgroundColor: 'grey', color: 'white', marginLeft: '1rem' }}
        onClick={Toadd}
      >
        Lets Get Started
      </Button>
    )}
  </div>
</div>

</div>

       

  )
}
export default HostComponent