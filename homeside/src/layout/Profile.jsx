import React, {  useState } from 'react';
import { Container, Grid, Card, CardContent, CardMedia, Typography, Button, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles'
import { editProfile } from '../api/apicall';
import { useForm, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useMediaQuery from '@mui/material/useMediaQuery'


export default function Basic({ name, phoneNumber, email,wallet,callBack }) {
    const ProfileField = styled(TextField)(({ theme }) => ({
        margin: theme.spacing(1),
    }))
    const matches = useMediaQuery('(min-width:600px)')

    const userId = useSelector((state) => state.user.id)


    const [edit, setEdit] = useState(false)
    // const [Name, setName] = useState(name)
    // const [Email, setEmail] = useState(email)
    // const [mob, setmob] = useState(phoneNumber)
    const {
        handleSubmit,
        control,
        formState: { errors },
        // setError,
    } = useForm()
    function change() {
        setEdit(!edit)
    }
    const validatePhoneNumber = (value) => {
        const isValidPhoneNumber = /^\d{10}$/.test(value);
        return isValidPhoneNumber || 'Phone Number must be 10 digits.';
      };
    function Submit(Data) {

        swal({
            title: 'Are you sure u want edit?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            buttons: ['Cancel', 'Edit'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    editProfile(Data.name, Data.phoneNumber, userId).then(() => {
                        toast.success('Edit  succuesfully.', { autoClose: 500 })
                        callBack()

                    })
                }
            }).catch((err)=>{
              alert(err)
            })

    }
    return (
        <Box minHeight="100vh" bgcolor="#9de2ff" display="flex" justifyContent="center" alignItems="center">
            <Container>
                <Grid container justifyContent="center" alignItems="center">
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Grid item md={12} lg={12} xl={12} className="mt-5">
                            <Card style={{ borderRadius: '15px' }}>
                                <CardContent>

                                    <Box display="flex" color="black">
                                        <Box flexShrink={0}>
                                            <CardMedia
                                                component="img"
                                                style={{ width: matches? '180px':'100px', borderRadius: '10px' }}
                                                src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp'
                                                alt='Generic placeholder image'
                                            />
                                            <Box pt={1} display="flex" justifyContent="center">
                                                {/* {edit ? <Button variant="outlined" style={{ marginRight: '1rem' }}>Upload</Button> : null} */}

                                            </Box>
                                        </Box>

                                        <form onSubmit={handleSubmit(Submit)}>

                                            <Box flexGrow={1} marginLeft={3}>
                                                <Typography variant="h5">{name}</Typography>
                                                <Typography variant="body2" color="textSecondary">{phoneNumber}</Typography>

                                                <Typography variant="body2" color="textSecondary">{email}</Typography>

                                                <Box display="flex" justifyContent="center" bgcolor="#efefef" p={2} mb={2} mt={2} borderRadius={3}>
                                                    <Box px={3}>
                                                        <Typography variant="body2" color="textSecondary" gutterBottom>
                                                            Wallet
                                                        </Typography>
                                                        <Typography variant="body1">
                                                            Balance: ₹{wallet}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                {edit ? (
                                                    <Box display='flex' flexDirection='column' >
                                                        <Box display="flex" flexDirection='column'>
                                                            <Controller
                                                                name="name"
                                                                control={control}
                                                                defaultValue={name}
                                                                rules={{ required: true }}
                                                                render={({ field }) => (
                                                                    <ProfileField
                                                                        label="Email"
                                                                        sx={{ width: 'auto' }}
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.email && <Typography variant="caption" color="error">Email is required.</Typography>}
                                                        </Box>
                                                        <Box display="flex" flexDirection='column'>
                                                            <Controller
                                                                name="phoneNumber"
                                                                control={control}
                                                                defaultValue={phoneNumber}
                                                                rules={{ required: true, validate: validatePhoneNumber  }}
                                                                render={({ field }) => (
                                                                    <ProfileField
                                                                        label="Phone Number"
                                                                        sx={{ width: 'auto' }}
                                                                        {...field}
                                                                    />
                                                                )}
                                                            />
                                                            {errors.phoneNumber && <Typography variant="caption" color="error">Phone Number is required.</Typography>}
                                                        </Box>
                                                    </Box>
                                                ) : null}

                                                <Box pt={1} display="flex">
                                                    {edit ? <Button variant="outlined" style={{ marginRight: '1rem' }} onClick={(e) => {
                                                        e.preventDefault()
                                                        change()
                                                    }}>back</Button> : <Button variant="contained" type='text' onClick={(e) => {
                                                        e.preventDefault()
                                                        change()
                                                    }}>Edit</Button>}
                                                    {edit ? <Button variant="contained" style={{ marginRight: '1rem' }} type='submit'>SUBMIT</Button> : null}

                                                </Box>


                                            </Box>
                                        </form>

                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Box>
                </Grid >
            </Container >
            <ToastContainer position="bottom-center"></ToastContainer>

        </Box >

    );
}
