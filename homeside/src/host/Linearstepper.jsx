import Propertyimage from './Addimage';
import AddpropertyType from './Addproperty';
import React, { useState, } from 'react'
import { Stepper, Step, StepLabel, Stack, Typography, Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import BtnComponent from '../components/btncomponent';
import Propertydetail from './Propertydescription';
import PropertyAvailable from './Propertyavaliabilty';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { Addproperty, EditHostedProperty } from '../api/apicall';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';


import swal from 'sweetalert';





function Findform({ activeStep, setValue,
    // imgErr
}) {

    switch (activeStep) {
        case 0:
            return <AddpropertyType setValue={setValue} />
        case 1:
            return <Propertydetail setValue={setValue} />
        case 2:
            return <PropertyAvailable setValue={setValue} />

        case 3:
            return < Propertyimage setValue={setValue} />

        case 4:
            return (
                <Typography variant="h3" m={10} textAlign={'center'}>
                    Form Filled successfully
                </Typography>
            )
        default:
            return ''
    }

}


export default function LinearStepper({ defaultData, isEdit }) {
    const userId = useSelector((state) => state.user.id)
    const { trigger, ...methods } = useForm({
        defaultValues: defaultData,
    })


    const [activeStep, setActiveStep] = useState(0)
    // const [loading, setLoading] = useState(false)
    const matches = useMediaQuery('(min-width:600px)')
    const navigate = useNavigate()
    const steps = [
        'Vehicle Information',
        'Vehicle Type',
        'Vehicle Availablity',
        'Add Photos',
        'Success',
    ]
    function handleHome() {
        navigate('/')
    }
    function handleNext() {
        if (activeStep <= 4) {
            setActiveStep(activeStep + 1)
        }
    }
    function handleBack() {
        setActiveStep(activeStep - 1)
    }
    const [imgErr, setimgErr] = useState(false)
    async function onSubmit(data) {
        if (activeStep < 3) {
            handleNext()
        } else {
            const isValid = await trigger()
            if (data.images.length !== 6) {
                setimgErr(true)
            }
            if (isValid && data.images.length === 6) {
                // setLoading(true)
                if (isEdit) {
                    swal({
                        title: 'Are you sure u want edit?',
                        text: 'This action cannot be undone!',
                        icon: 'warning',
                        buttons: ['Cancel', 'Edit'],
                        dangerMode: true,
                    })
                        .then((willDelete) => {

                            if (willDelete) {
                                setActiveStep(activeStep + 1)

                                EditHostedProperty(data, defaultData).then(() => {

                                    toast(`edit success`, {
                                        position: "top-center",
                                        autoClose: 1000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    })
                                }
                                )
                            }
                        })


                        .catch((err) => {
                            alert(err)
                        })


                } else {
                    Addproperty(data, userId).then(() => {
                        // setLoading(false)
                        setActiveStep(activeStep + 1)

                    })
                }
            }
        }
    }



    return (
        <Box component={'div'} sx={{ maxWidth: '100%', minHeight: '50vh', marginTop: '10px' }}>
            <>
                {matches ? (
                    <Stepper activeStep={activeStep} orientation="horizontal">
                        {steps.map((heading, index) => (
                            <Step key={index}>
                                <StepLabel>{heading}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                ) : (
                    ''
                )}
            </>
            <> <FormProvider {...methods}>

                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <Findform
                        activeStep={activeStep}

                        setValue={methods.setValue}
                        imgErr={imgErr}

                    />
                    <Box
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        {activeStep > 3 && (
                            <BtnComponent
                                content={'Back To Home'}
                                callback={handleHome}
                            />
                        )}
                    </Box>
                    {activeStep < 4 && (
                        <Stack direction={'row'} justifyContent="space-between">
                            <BtnComponent
                                variant={'contained'}
                                callback={handleBack}
                                disable={activeStep === 0}
                                content={'Back'}
                            />
                            <BtnComponent
                                variant={'contained'}
                                content={
                                    activeStep == 3 ? 'Finish' : 'Next'
                                }
                                type={'submit'}
                            />
                        </Stack>
                    )}
                </form>
            </FormProvider>
            </>
            <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />



        </Box>
    )
}
