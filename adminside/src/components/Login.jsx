import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import api from '../axios/axios';
import useEmailValidation from '../customHooks/emailHook';
import {  setLoggedIn } from '../redux/redux';
import { useDispatch, useSelector } from 'react-redux'
// import { useEffect } from 'react';
import Card from '@mui/material/Card';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const admin = useSelector(state => state.admin)
 React.useEffect(() => {
    // Call the `navigate` function to navigate to a different page
    if (admin.loggedIn) {
      navigate('/');

    }
  }, [navigate, admin])

  const { email, isValid, handleChange } = useEmailValidation('');
  const [error, setError] = React.useState('')
  const [pass, setPass] = React.useState('')
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //     email: data.get('email'),
  //     password: data.get('password'),

  //   });
  //   // api.get('/admin', {
  //   //   params: {
  //   //   id :'heloo'
  //   //   }})
  // };
  const sendData = () => {
    setError('')
    api.get('/admin', {
      params: {
        email: email,
        pass: pass
      }
    }).then((response) => {

      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(setLoggedIn(true))

      navigate('/')

    })
      .catch(() => {
        setError('invalid password or email')
      });
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 18,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Card sx={{
            minWidth: 305,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Avatar sx={{ m: 1, bgcolor: '#404040' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}


                autoComplete="email"
                onChange={handleChange}
                autoFocus
              />
              {isValid ? <p style={{ color: 'red' }}></p> : <p style={{ color: 'red' }} >Email is invalid</p>}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPass(e.target.value)}


                autoComplete="current-password"
              />
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <p style={{ color: 'red' }} >{error}</p>
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#404040' }}
                onClick={sendData}
              >
                Sign In
              </Button>
              {/* <Grid container>
              <Grid item xs>
                <NavLink to='/' variant="body2">
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
            </Box>
          </Card>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}