// import React, { useState } from 'react';
// import OtpInput from 'react-otp-input';
// import PropTypes from 'prop-types';

// export default function MobNum({Changekey}){
 
//     const [otp, setOtp] = useState('');

//     return (
//     <Container component="main" maxWidth="sm">
//     <CssBaseline />
//     <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
//       <Grid
//         container
//         style={{ backgroundColor: "fffff", height: "50vh", textAlign: "center" }}
//         justify="center"
//         alignItems="center"
//         spacing={3}
//       >
//         <Grid item container justify="center">
//           <Grid item container alignItems="center" direction="column">
//             <Grid item>
//               <Avatar style={{ margin: "8px", backgroundColor: "blue" }}>
//                 <LockOutlinedIcon />
//               </Avatar>
//             </Grid>
//             <Grid item>
//               <Typography component="h1" variant="h5">
//                 Verification Code
//               </Typography>
//             </Grid>
//           </Grid>
//         </Grid>
//        </Grid>
       
//     </div>
//   </Container>
//     )
// }
// MobNum.propTypes = {
//   Changekey: PropTypes.func.isRequired,
// };