/* eslint-disable no-unused-vars */
import React from 'react'

// import { MuiOtpInput } from 'mui-one-time-password-input'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { FcGoogle } from 'react-icons/fc'
import SendIcon from '@mui/icons-material/Send';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import {
    MDBContainer,
    // MDBInput,
    // MDBCheckbox,
    // MDBBtn,
    // MDBIcon
}
    from 'mdb-react-ui-kit'
import { useState, useEffect } from 'react';

import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import Signin from '../../components/signin';
import OtpInput from 'react-otp-input';
import { CheckMobNo } from '../../api/apicall';

import { useDispatch, } from 'react-redux'
import { setId, setHostapplied, setVerified } from '../../redux/redux';



export default function Basepart({ Changekey, ChangeEmail, handleClose }) {
    const dispatch = useDispatch()
    const [timeRemaining, setTimeRemaining] = useState();
    const [user, setUser] = useState({})
    const [otp, setOtp] = useState('')
    useEffect(() => {
        const interval = setInterval(() => {
            if (timeRemaining === 0) {
                clearInterval(interval);
            } else {
                setTimeRemaining(timeRemaining => timeRemaining - 1);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [timeRemaining]);


    const [phoneNumber, setPhoneNumber] = useState('');
    const [formatedMobno, setformatedMobno] = useState('')
    const [Moberror, setMoberror] = useState('')



    const handlePhoneNumberChange = (value,) => {
        setPhoneNumber(value);
    }

    const [showotp, setshowotp] = useState(true)

    // const [otp, setOtp] = useState('')
    const [confirm, setConfirm] = useState('')
    const [otperror, setOtperror] = useState('')
    const [Blockerror, setBlockerror] = useState('')

const errBlock=(value)=>{
    setBlockerror(value)
}

    // const [otp,setOtp] = useState('')
    const sentotp = async () => {
        try {
            const recaptchaVerifier = await new RecaptchaVerifier('recaptcha', {}, auth)
            const mob = '+' + phoneNumber
            setformatedMobno(mob.replace(/(\+\d{2})(\d+)(\d{4})/, "$1******$3"))
            const confirmation = await signInWithPhoneNumber(auth, mob, recaptchaVerifier)
            setshowotp(!showotp)
            setConfirm(confirmation)
            setTimeRemaining(60);


        }
        catch (err) {
            alert(err)
        }

    }

    const isMobexit = (mob) => {
        const number = mob;
        const numberString = number.toString();
        const resultString = numberString.substring(2);
        const result = parseInt(resultString, 10);

        CheckMobNo(result).then(({ data }) => {
            if (data) {
                if (!data[0].block) {
                    sentotp(mob)
                    setUser(data[0])


                }
                else {
                    setMoberror('Mobile number  is blocked by admin')

                }
            }
            else {
                setMoberror('Mobile number  not existed')
            }
        })
    }


    const resendOtp = async () => {
        try {
            setOtperror('');

            const recaptchaVerifier = await new RecaptchaVerifier('recaptchar', {
                size: 'invisible',
                callback: () => { },
            }, auth)
            const mob = '+' + phoneNumber
            const confirmation = await signInWithPhoneNumber(auth, mob, recaptchaVerifier)
            setConfirm(confirmation)
            setTimeRemaining(60);
        } catch (err) {
            alert(err)
        }
    };



    const otpconfirm = (code) => {
        confirm.confirm(code).then((result) => {
            handleClose()
            setOtperror('');

            dispatch(setId(user._id))
            dispatch(setHostapplied(user.Hostapplied))
            dispatch(setVerified(user.Verified))
            localStorage.setItem('userAccessToken', user.token.accessToken);
            localStorage.setItem('userRefreshToken', user.token.refreshToken)
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            setOtperror('incorrect otp');
            // ...
        });



    }
    const handleOtpChange = (code) => {
        setOtp(code);

        // Check if the OTP code has reached 6 digits
        if (code.length === 6) {
            // Call your desired function here
            otpconfirm(code)

        }
    };
    const first = < MDBContainer className="p-3  d-flex flex-column w-90" button={false}
        onKeyDown={e => e.stopPropagation()}>

        {/* <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='phonr' onChange={(e) => { setPhone(e.target.value) }} /> */}
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", }}>
                <Grid
                    container
                    style={{ backgroundColor: "fffff", height: "auto", textAlign: "center" }}
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item container justify="center">
                        <Grid item container alignItems="center" direction="column">
                            {/* <Grid item>
                                <Avatar style={{ margin: "8px", backgroundColor: '#2B3467' }}>
                                    <PersonIcon />
                                </Avatar>
                            </Grid> */}
                            <Grid item>
                                {/* <Typography component="h1" variant="h5">
                                    User Login
                                </Typography> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </Container>
        <div className="mb-4">
            <label htmlFor="phone-number">Phone Number:</label>
            <PhoneInput
                id="phone-number"
                country={'us'}
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                inputStyle={{ width: '100%' }}

            />
        </div>
        <Button variant="outlined" color='inherit' style={{ color: 'grey' }} onClick={() => isMobexit(phoneNumber)} >
            sent otp<SendIcon style={{ marginLeft: '5px', color: 'grey' }} />
        </Button>
        <div className="mb-4" style={{ marginLeft: '5px', color: 'red' }}>
            {Moberror}
        </div>
        <div id='recaptcha' ></div>

        <div className="text-center ">

            <Typography >we will text your mobile  number to confirm</Typography>





        </div>
        <div className="text-center ">



            <Typography component="h1" variant="h5" >Sign up with</Typography>



        </div>
        <Button variant="outlined" style={{ backgroundColor: '#2B3467', marginTop: '20px' }} >
            <FcGoogle style={{
                fontSize: 'x-large',
            }} />

            <Signin Changekey={Changekey} ChangeEmail={ChangeEmail} handleClose={handleClose} errBlock={errBlock} ></Signin>
        </Button>
        <div className="text-center ">



            <Typography style={{color:'red'}}>{Blockerror}</Typography>



        </div>
    </MDBContainer>

    const secondOtp = (<>
        {/* <h6 onClick={() => Changekey(3)} style={{ fontSize: 16 }}>Enter the otp received at {formatedMobno}</h6> */}
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Grid
                    container
                    style={{ backgroundColor: "fffff", height: "50vh", textAlign: "center" }}
                    justify="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Grid item container justify="center">
                        <Grid item container alignItems="center" direction="column">
                            <Grid item>
                                <Avatar style={{ margin: "8px", backgroundColor: '#2B3467' }}>
                                    <LockOutlinedIcon />
                                </Avatar>
                            </Grid>
                            <Grid item>
                                <Typography component="h1" variant="h5">
                                    Verification Code
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} textAlign="center">
                        <Paper elevation={0}>
                            <Typography variant="h6">
                                Please enter the verification code sent to your mobile no {formatedMobno}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        container
                        justify="center"
                        alignItems="center"
                        direction="column"
                        style={{ marginBottom: "16px" }}
                    >
                        <Grid item spacing={3} justify="center">
                            <OtpInput
                                onChange={handleOtpChange}
                                numInputs={6}
                                placeholder="------"
                                value={otp}
                                renderSeparator={<span></span>}
                                inputStyle={{
                                    width: '50px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    margin: '10px',
                                    border: '1px solid black',
                                }}
                                renderInput={(props) => <input {...props} />}
                            />
                        </Grid>
                        <Grid item xs={12} textAlign="center">
                            <Paper elevation={0}>

                                {timeRemaining > 0 ? <Typography  > {timeRemaining} seconds remaining`</Typography> : <Typography onClick={resendOtp} style={{ color: '#2B3467' }}>Resend OTP</Typography>}
                                <Typography sx={{ color: 'red' }}> {otperror}</Typography>

                            </Paper>
                        </Grid>
                        <div id='recaptchar'  ></div>

                    </Grid>
                </Grid>
            </div>
        </Container>
    </>)
    return (<>
        {/* <h1 onClick={() => Changekey(1)}>BasePart</h1> */}
        {showotp ? first : secondOtp}


    </>
    )
}
