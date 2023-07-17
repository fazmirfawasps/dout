import { auth, googleProvider } from '../firebase/firebase';
import { signInWithPopup } from 'firebase/auth';
import { Typography } from '@mui/material';

import api from '../axios/axios';
import { setId, setHostapplied, setVerified } from '../redux/redux';
import { useDispatch, } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import GoogleIcon from '@mui/icons-material/Google'
// import { useDispatch, useSelector } from 'react-redux'
// import { setName, setEmail, setAddress, addProduct, removeProduct, updateProduct } from '../redux/redux'



export default function Signin(props) {
  const dispatch = useDispatch()
  // const user = useSelector(state => state.user)

  // const handleUserSubmit = () => {

  //   dispatch(setName('fazmir'))
  //   dispatch(setEmail('laila'))
  //   dispatch(setAddress('hello'))
  // }
  const googlesignin = () => {
    signInWithPopup(auth, googleProvider).then((data) => {

      const email = data.user.email
      api.get('/', { params: { email: data.user.email } }).then(({ data }) => {
        if (data.data) {
          if(data.details[0].block){
            props.errBlock('users is blocked by admin')
          }
          else{
  
  
            dispatch(setId(data.details[0]._id))
            dispatch(setHostapplied(data.details[0].Hostapplied))
            dispatch(setVerified(data.details[0].Verified))
            toast.success('Login succuesfully.', { autoClose: 1000 })
  
            localStorage.setItem('userAccessToken', data.details[0].token.accessToken);
            localStorage.setItem('userRefreshToken', data.details[0].token.refreshToken);
  
            props.ChangeEmail(email)
            props.handleClose()
          }
    
        }
        else {
          props.ChangeEmail(email)
          props.Changekey(1)

        }
      })
      // props.handleModal()
    })
  }
 
  return (
    <>
      <Typography onClick={googlesignin} marginLeft=
        {1} style={{ color: 'white' }}>
        signin</Typography>
      <ToastContainer></ToastContainer>
    </>
  )
}
