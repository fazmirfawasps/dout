// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import OtpInput from "react-otp-input";

// export default function App() {
//     return (
//         <Container component="main" maxWidth="sm">
//             <CssBaseline />
//             <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 <Grid
//                     container
//                     style={{ backgroundColor: "fffff", height: "50vh", textAlign: "center" }}
//                     justify="center"
//                     alignItems="center"
//                     spacing={3}
//                 >
//                     <Grid item container justify="center">
//                         <Grid item container alignItems="center" direction="column">
//                             <Grid item>
//                                 <Avatar style={{ margin: "8px", backgroundColor: "blue" }}>
//                                     <LockOutlinedIcon />
//                                 </Avatar>
//                             </Grid>
//                             <Grid item>
//                                 <Typography component="h1" variant="h5">
//                                     Verification Code
//                                 </Typography>
//                             </Grid>
//                         </Grid>
//                     </Grid>
//                     <Grid item xs={12} textAlign="center">
//                         <Paper elevation={0}>
//                             <Typography variant="h6">
//                                 Please enter the verification code sent to your mobile no {formatedMobno}
//                             </Typography>
//                         </Paper>
//                     </Grid>
//                     <Grid
//                         item
//                         xs={12}
//                         container
//                         justify="center"
//                         alignItems="center"
//                         direction="column"
//                     >
//                         <Grid item spacing={3} justify="center">
//                             <OtpInput
//                                 value={otp}
//                                 onChange={handleOtpChange}
//                                 numInputs={6}
//                                 placeholder="------"
//                                 renderSeparator={<span></span>}
//                                 inputStyle={{
//                                     width: '50px',
//                                     height: 'auto',
//                                     borderRadius: '8px',
//                                     margin: '10px',
//                                     border: '1px solid lightgray',
//                                 }}
//                                 renderInput={(props) => <input {...props} />}
//                             />
//                         </Grid>
//                         <Grid item xs={12} textAlign="center">
//                             <Paper elevation={0}>
//                                 <Typography variant="h6">
//                                 Resend OTP ? {timeRemaining} seconds remaining

//                                 </Typography>
//                             </Paper>
//                         </Grid>
//                         <Grid item>
//                             <Button
//                                 type="submit"
//                                 fullWidth
//                                 variant="contained"
//                                 color="primary"
//                                 style={{ margin: "24px 0 16px" }}
//                             >
//                                 Verify
//                             </Button>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </div>
//         </Container>
//     );
// }
