import React ,{useEffect, useState}from 'react'
import { useForm, Controller } from 'react-hook-form'
// import  from '../../component/ReusebleTextField'
import InputText from '../components/Textfield'
import { Box, Paper, Typography } from '@mui/material'
import BtnComponent from '../components/btncomponent'
import { useSelector, useDispatch } from 'react-redux'
import { setHostapplied } from '../redux/redux'
import { SendHostDetails } from '../api/apicall'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import api from '../axios/axios'


// import { hostRequest } from '../../Redux/user/userAction'
export default function HostApplyPage() {
    const dispatch = useDispatch();
    const userId = useSelector((state) => state.user.id)
    const applied = useSelector((state) => state.user.Hostapplied)
      useEffect(()=>{
       api.get(`/getauserdetail/${userId}`)
      },[])
    const {
        handleSubmit,
        control,
        formState: { errors },
        setError,
    } = useForm()



    const ProfileAvatar = styled(Avatar)(({ theme }) => ({
        width: theme.spacing(15),
        height: theme.spacing(15),
        marginLeft: theme.spacing(15),

    }))
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.includes('image')) {
            setSelectedImage(URL.createObjectURL(file));
          } else {
            setSelectedImage(null);
            // Display error message to the user
            alert('Please select a valid image file.');
          }
      };
    function stringAvatar() {
        return {
            sx: {
                bgcolor: '#fffff',
            },
            children: <img src={selectedImage} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center' }}/>,
        }
    }
   



    const navigate = useNavigate()
    const name = 'fazmie'
    function Submit(data) {
        SendHostDetails(data,userId)
            .then(() => {
                    dispatch(setHostapplied(true))
            })
            .catch((err) => {
                alert(err)
            })
    }
    function handlehome() {
        navigate('/')
    }
    return (
        <Box
            // component={'body'}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '120vh',
                marginTop: '60px'
            }}
        >
            {applied ? (
                <Box alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="h4">successfully submited</Typography>
                    <Typography variant="h6">
                        The request to become host will be approved after
                        verification
                    </Typography>
                    <BtnComponent
                        variant={'contained'}
                        callback={handlehome}
                        content={'back to home'}
                    />
                </Box>
            ) : (
            <Paper sx={{ width: 400, p: 1 }}>
                <Box sx={{ maxWidth: 500 }}>
                    <ProfileAvatar {...stringAvatar(name)} />

                    <form onSubmit={handleSubmit(Submit)}>
                        <label>FullName</label>
                        <Controller
                            name="FullName"
                            control={control}
                            rules={{ required: true, pattern: /[^\s\\]/ }}
                            render={({ field }) => (
                                <InputText
                                    placeholder={'fullName'}
                                    {...field}
                                />
                            )}
                        />
                        {errors.FullName && (
                            <span style={{ color: 'red' }}>FullName is required</span>
                        )}
                        <Box sx={{ marginTop: '10px' }} />
                        <label>DateOfBirth</label>
                        <Controller
                            name="DateOfBirth"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <InputText
                                    placeholder={'DateOfBirth'}
                                    type={'date'}
                                    {...field}
                                />
                            )}
                        />
                        {errors.DateOfBirth && (
                            <span style={{ color: 'red' }}>DateOfBirth is required</span>
                        )}
                        <Box sx={{ marginTop: '10px' }} />
                        <label>AadharNumber</label>
                        <Controller
                            name="AadharNumber"
                            control={control}
                            rules={{ required: true, pattern: /[^\s\\]/ }}
                            render={({ field }) => (
                                <InputText
                                    placeholder={'AadharNumber'}
                                    {...field}
                                />
                            )}
                        />
                        {errors.AadharNumber && (
                            <span style={{ color: 'red' }}>AadharNumber is required</span>
                        )}
                        <Box sx={{ marginTop: '10px' }} />
                        <label>PanCard</label>
                        <Controller
                            name="PanCard"
                            control={control}
                            rules={{ required: true, pattern: /[^\s\\]/ }}
                            render={({ field }) => (
                                <InputText
                                    placeholder={'PanCard'}
                                    {...field}
                                />
                            )}
                        />
                        {errors.PanCard && <span style={{ color: 'red' }}>PanCard is required</span>}
                        <Box sx={{ marginTop: '10px' }} />
                        <label>Address</label>
                        <Controller
                            name="Address"
                            control={control}
                            rules={{ required: true, pattern: /[^\s\\]/ }}
                            render={({ field }) => (
                                <InputText
                                    placeholder={'Address'}
                                    {...field}
                                />
                            )}
                        />
                        {errors.Address && <span style={{ color: 'red' }}>Address is required</span>}
                        <Box sx={{ marginTop: '10px' }} />
                        <label>RentalLicensePermit</label>
                        <Controller
                            name="RentalLicensePermit"
                            control={control}
                            rules={{ required: true, pattern: /[^\s\\]/ }}
                            render={({ field }) => (
                                <InputText
                                    placeholder={'Rental License Number'}
                                    {...field}
                                />
                            )}
                        />
                        {errors.RentalLicensePermit && (
                            <span style={{ color: 'red' }}> Rental License Number is required</span>
                        )}
                        <Box sx={{ marginTop: '10px' }} />
                        <label>Upload your Photo</label>

                        <Controller
                            name="Image"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        onChange={(e) => {
                                            const file = e.target.files[0];

                                            // Perform file validation
                                            if (file && file.type.includes('image')) {
                                              handleImageUpload(e);
                                              field.onChange(file);
                                            } else {
                                              field.onChange(null);
                                              setError('Image', {
                                                type: 'manual',
                                                message: 'Please select an image file instead of a PDF.'
                                              });
                                              // Display error message to the user
                                              alert('Please select a valid image file.');
                                            }

                                        }}
                                        style={{
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            padding: '14px',
                                            width: '100%',
                                            color:'grey',
                                            height:'57px'
                                          }}
                                    />
                                    {/* {field.value && (
                                        <Typography>{field.value.name}</Typography>
                                    )} */}
                                </>
                            )}
                        />
                        {errors.Image && (
                            <span style={{ color: 'red' }}>Image is required</span>
                        )}
                        <Box sx={{ marginTop: '10px' }} />

                        <BtnComponent
                            type={'submit'}
                            content={'submit'}
                            variant={'contained'}
                        />
                    </form>
                </Box>
            </Paper>
            )}
        </Box>
    )
}
