import * as React from 'react'
import { Box, CardMedia, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Stack } from '@mui/system'
// import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
// import { useSelector } from 'react-redux'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import api from '../axios/axios'
import BookingCard from './Bookingcard'
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShareIcon from '@mui/icons-material/Share';
import { useParams } from 'react-router-dom';


export default function SingleProperty() {
    const { id } = useParams();
    const [SingleProperty, setSingleProperty] = React.useState({})
    React.useEffect(() => {
        api.get('/getAllproperty').then(({ data }) => {
            const singleProperty = data.find((item) => item._id == id)
            setSingleProperty(singleProperty)

        })
    }, [])

    return (
        <Container maxWidth="xl" sx={{ width: '94%', height: '1400px' }}>
            <Box sx={{ flexGrow: 1, pt: 2 }}>
                <Typography
                    variant="h5"
                    color="primary"
                    fontWeight={'600'}
                    marginTop={5}
                    p={2}
                    pl={0}
                >
                    {SingleProperty.PropertyName}
                </Typography>
                <Typography variant="h6" fontWeight={'500'} p={2} pl={0}>
                    <LocationOnIcon fontSize="small" />
                    {SingleProperty.Address}
                </Typography>
                <Grid container spacing={1}>
                    {SingleProperty.imageFilenames?.map((img, index) => (
                        <Grid
                            {...{ xs: 12, sm: 6, md: 4, lg: 4 }}
                            key={index}
                            minHeight={160}
                        >
                            <CardMedia sx={{ height: 200 }} image={img} />

                        </Grid>
                    ))}
                </Grid>
                <Grid container mt={2}>
                    <Grid item lg={7} sx={{
                        width: 300,
                        height: 'auto',
                        p: 2,
                        mt: 6,
                        borderStyle: 'solid',
                        borderWidth: '.2px',
                        borderColor: '#dddddd',
                        boxShadow: 2,
                    }}>
                        <Stack direction={'column'} spacing={2} pt={2}>
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'center'} >
                                <Typography
                                    flexGrow={1}
                                    variant="h4"
                                    color="primary"
                                    justifyContent={'center'}
                                >                    {SingleProperty.PropertyName}

                                </Typography>


                                {/* <Stack direction={'row'} spacing={4} >
                                    <FavoriteBorderIcon sx={{ fontSize: 44, }}></FavoriteBorderIcon>
                                    <ShareIcon sx={{ fontSize: 44, }}></ShareIcon>

                                </Stack> */}
                            </Box>
                            <Divider sx={{ mt: 1 }} />
                            <Typography
                                fontWeight={600}
                                variant="body1"
                            >
                                {/* {`${SingleProperty.Maxguest} guest/room. ${SingleProperty.Facility.Bedrooms} bedroom. ${SingleProperty.Facility.Bathrooms} toilet. ${SingleProperty.Facility.Balcony} balcony. ${SingleProperty.Facility.Kitchen} kitchen.`} */}
                                2500 per day

                            </Typography>
                            <Divider sx={{ mt: 1 }} />
                            <Typography variant="h5">vehicle description</Typography>
                            <Typography variant="body1" maxWidth={800}>
                                {SingleProperty.Description}
                            </Typography>
                        </Stack>
                        <Divider sx={{ mt: 1 }} />
                    </Grid>

                    <Grid
                        item
                        lg={5}
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',

                        }}
                    >

                        <BookingCard SingleProperty={SingleProperty} />

                    </Grid>

                    {/* <Grid lg={3} pt={2}
                    sx={{
                        width: 300,
                        height: '200px',
                        p: 2,
                        mt:6,
                        borderStyle: 'solid',
                        borderWidth: '.2px',
                        borderColor: '#dddddd',
                        boxShadow: 2,
                    }}
                    >
                        <Typography variant="h5">
                            Available Amenities
                        </Typography>
                        <Box width={300} pt={2}>

                            <h1>bdhjbsdfdhf</h1>
                    {/* {amenity.map((item, index) => (
                                <>
                                    <Amenities key={index} KEY={item} />
                                    <Box m={1} />
                                </>
                            ))}  */}
                    {/* </Box>
                    </Grid> */}
                </Grid>
            </Box>
        </Container>
    )

}