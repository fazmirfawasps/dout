import * as React from 'react';
import {
  styled,
  //  useTheme 
} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
// import MuiAppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import BookingIcon from '@mui/icons-material/Booking';
import MenuIcon from '@mui/icons-material/Menu'
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import { setAdmin } from '../redux/redux';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../redux/redux';
import HomeIcon from '@mui/icons-material/Home';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import NotificationsIcon from '@mui/icons-material/Notifications';

import {
  // FaBars,
  FaUserAlt,
  // FaRegChartBar,
  // FaCar
  FaBell ,

  FaShoppingBag,
  FaTruck,
  FaThList
} from "react-icons/fa";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(['width', 'margin'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,

//   }),
//   backgroundColor: '#136c78', 
//   height: '60px',
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(['width', 'margin'], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      ...openedMixin(theme),
      backgroundColor: '#fffff',
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      ...closedMixin(theme),
      backgroundColor: '#404040',
    },
  }),
}));


export default function MiniDrawer() {
  // const dispatch = useDispatch()
  const admin = useSelector(state => state.admin)

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch()

  React.useEffect(() => {
    // Call the `navigate` function to navigate to a different page
    if (!admin.loggedIn) {
      navigate('/login');

    }
  }, [navigate, admin]);

  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <HomeIcon />
    },
    {
      path: "/about",
      name: "user",
      icon: <FaUserAlt />

    },

    // {
    //     path:"/analytics",
    //     name:"Booking",
    //     icon:<FaRegChartBar/>
    // },
    {
      path: "/PropertyList",
      name: "Vehicle Management",
      icon: <FaThList />
    },
    {
      path: "/Hostrequest",
      name: "Host Request",
      icon: <FaBell />

    },
    {
      path: "/Booking",
      name: "Booking",
      icon: <FaShoppingBag />
    },
    {
      path: "/category",
      name: "Vehicle category",
      icon: <FaTruck />
    },

  ]
  // const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  const handleLogout = () => {
    // Remove access and refresh tokens from local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch(setLogout())


    // Redirect or perform any other logout actions
    // For example, you can use React Router's history.push() to redirect to a login page
    // history.push('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar> */}
      {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton> */}
      {/* <Typography variant="h6" noWrap component="div">
           heavy vehicle
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer variant="permanent" open={open} >
        <DrawerHeader sx={{ display: 'flex', justifyContent: 'center' }} onClick={handleDrawerOpen}>
          {/* <IconButton >
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
          {open ?
            // <Typography variant="h6" noWrap component="div" sx={{color:'#ffffff'}} onClick={handleDrawerOpen}>
            // HeavyVantage

            // </Typography>
            <img src="htron-high-resolution-logo-black-on-white-background.png" alt="" style={{ width: '150px', height: '70px' }} />

            : <MenuIcon />}

        </DrawerHeader>
        <Divider />
        <List>
          {menuItem.map((text,) => (
            <ListItem key={text.name} disablePadding sx={{ display: 'block' }}>
              <NavLink to={text.path} activeClassName="active" style={{ textDecoration: 'none', color: 'black' }} >

                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    borderRadius: location.pathname === text.path ? '8px' : '0px',
                    px: 2.5,
                    backgroundColor: location.pathname === text.path ? '#7f7f7f' : 'transparent', '&:hover': {
                      backgroundColor: '#bfbfbf',
                      borderRadius: '8px'

                    }, // set background color if path matches
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {text.icon}
                  </ListItemIcon>
                  <ListItemText primary={text.name} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
          <ListItem key='6' disablePadding sx={{ display: 'block' }}>
            <NavLink to='/' activeClassName="active" style={{ textDecoration: 'none', color: 'black' }} onClick={handleLogout}>

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  borderRadius: '0px',
                  px: 2.5,
                  backgroundColor: 'transparent', '&:hover': {
                    backgroundColor: '#bfbfbf',
                    borderRadius: '8px'

                  }, // set background color if path matches
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ExitToAppIcon></ExitToAppIcon>
                </ListItemIcon>
                <ListItemText primary='Logout' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        </List>
        <Divider />
        {/* <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'hidden' }}>
        <DrawerHeader />
        <Outlet></Outlet>
      </Box>
    </Box>
  );
}