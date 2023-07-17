import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// import api from '../axios/axios';
import { useEffect } from 'react';
// import ModalDialog from './modal';
import { NavLink, } from 'react-router-dom';
import Login from '../layout/Login/Login';
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../redux/redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { Verified } from '@mui/icons-material';
import socket from '../layout/Chat/Socket';
import swal from 'sweetalert';

const StyledIcon = styled(Verified)`
  color: primary;
  font-size: 30px;
`;


// const pages = [
//   {
//     path: "/searchpage",
//     name: "find a property",

//   },
//   {
//     path: '',
//     name: "share storeiis",

//   },
//   {
//     path: "/host",
//     name: "become a host",
//   },

// ];
const settings = [
  {
    path: "/Profilepage",
    name: "Profile",
  },
  {
    path: "/wishlist",
    name: "Whishlist",


  },
  {
    path: "/Bookings",
    name: "Booking",
  },
  {
    path: "/chat",
    name: "Messages",
  },


]
// import { signInWithPopup } from 'firebase/auth';




function ResponsiveAppBar() {
  useEffect(() => {
    document.body.style.overflow = 'inherit';
    document.body.style.paddingRight = '0';

  })
  const dispatch = useDispatch()

  const Verified = useSelector((state) => state.user.Verified)

  const isHosted = useSelector((state) => state.user.isHosted)

  const logout = () => {
    dispatch(setLogout())
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('userRefreshToken');
    toast.success('Logout succuesfully.', { autoClose: 2000 })
  }

  // const googlesignin = () => {
  //   signInWithPopup(auth, googleProvider).then((data) => {
  //   })
  // }
  const userId = useSelector((state) => state.user.id)
  useEffect(() => {
    socket.current?.emit('adduser', userId)



  }, [userId])
  useEffect(() => {
    socket.current.on('blockuser', () => {
      swal({
        title: '  Warning?',
        text: 'you are blocked by admin!',
        icon: 'warning',
        button: 'OK',
        dangerMode: true,
      }).then(() => {
        logout()
      });
    })
  }, [])


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <AppBar position="fixed" color="nav">
        <Container maxWidth="xl" style={{ backgroundColor: '#ffffff' }}>
          <Toolbar disableGutters>
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h3"
              noWrap
              component="a"
              to="/"
              sx={{
                mr: 2,

                display: { xs: 'none', md: 'flex' },
                fontFamily: 'system-ui',
                fontWeight: 'xx-large',
                fontSize: '40px',
                color: '#2B3467',
                textDecoration: 'none',
              }}
            >
              <NavLink to='/' style={{ color: '#2B3467', fontSize: '50px', fontWeight: 'xx-large', textDecoration: 'none' }}>


                <h1>  H-tron</h1>


              </NavLink>


            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >

                <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink to='/searchpage' style={{ color: 'black', textDecoration: 'none' }}>
                    <Typography textAlign="center">FIND A propery</Typography>

                  </NavLink>

                </MenuItem>
                {Verified ? <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink to='/host' style={{ color: 'black', textDecoration: 'none' }}>
                    <Typography textAlign="center">Host verified</Typography>
                    <StyledIcon />


                  </NavLink>

                </MenuItem> : <MenuItem onClick={handleCloseNavMenu}>
                  <NavLink to='/hostapply' style={{ color: 'black', textDecoration: 'none' }}>
                    <Typography textAlign="center">Become a hosted</Typography>

                  </NavLink>

                </MenuItem>}



              </Menu>
            </Box>
            {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}


            <Typography
              variant="h5"
              noWrap
              component="a"
              to="/"
              sx={{
                ml: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'serif',
                fontWeight: 'xx-large',
                fontSize: '140PX',
                color: '#2B3467',
                textDecoration: 'none',
              }}
            >
              <NavLink to='/' style={{ color: '#2B3467', textDecoration: 'none' }}>

                <h1>
                  H-tron
                </h1>
              </NavLink>
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', ml: 40, paddingLeft: '30vw' } }}>


              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block', ml: 2 }}
              >
                <NavLink to='/searchpage' style={{ color: 'black', textDecoration: 'none' }}>

                  Find a Vehicle
                </NavLink>

              </Button>
              {Verified ?
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block', ml: 2 }}
                >
                  <NavLink to='/host' style={{ color: 'black', textDecoration: 'none' }}>

                    Start Hosting
                    <StyledIcon />
                  </NavLink>

                </Button> : <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'black', display: 'block', ml: 2 }}
                >
                  <NavLink to='hostapply' style={{ color: 'black', textDecoration: 'none' }}>

                    Become a Host
                  </NavLink>

                </Button>}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: '#2B3467', }} alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}


              >

                {userId ? '' : <MenuItem >
                  {/* <ModalDialog /> */}
                  <Login></Login>
                </MenuItem>}

                {userId ?
                  settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <NavLink to={setting.path} style={{ color: 'black', textDecoration: 'none' }}>
                        <Typography textAlign="center">{setting.name}</Typography>
                      </NavLink>
                    </MenuItem>

                  )) : ''
                }
                {isHosted ?
                  <>
                    <MenuItem >
                      <NavLink to='/reservation' style={{ color: 'black', textDecoration: 'none' }}>

                        <Typography textAlign="center">Reservation</Typography>
                      </NavLink>
                    </MenuItem>
                    <MenuItem >
                      <NavLink to='/viewhosted' style={{ color: 'black', textDecoration: 'none' }}>

                        <Typography textAlign="center">view vehicle</Typography>
                      </NavLink>
                    </MenuItem>

                  </> : ''}

                {userId ?
                  <MenuItem >
                    <Typography textAlign="center" onClick={logout}>Logout</Typography>

                  </MenuItem> : ''}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ToastContainer position="bottom-center" />
    </Box >
  );
}
export default ResponsiveAppBar;