import { useState, useEffect } from "react"
// import { useNavigate } from 'react-router-dom'
import { Box, Card, CardContent, Typography, CardMedia, Button, Grid } from '@mui/material';
import api from '../axios/axios';
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Verified } from '@mui/icons-material';



const StyledIcon = styled(Verified)`
  color: green;
  font-size: 30px;
`;

export default function SingleHostDetailpage() {
    const [HostDetail, setHostdetail] = useState([{
        AadharNumber
            :
            "674894898855",
        Address
            :
            "pansonnonsonnsios",
        DateOfBirth
            :
            "2018-01-12",
        FullName
            :
            "undefined",
        PanCard
            :
            "9484894894",
        RentalLicensePermit
            :
            "jninininininin",
        Verified
            :
            false,
        hostid
            :
            "64729bba856580548c9d23be",
        image
            :
            "http://localhost:7000/images/1686591333318-Screenshot (5).png",
        _id
            :
            "64875765e0045ba3658ea5fc",

    }])
    const id = useParams()
    const [change, setChange] = useState(false)

    const Verify = (id,hostid) => {

        api.post(`/admin/verifyHostdetail`,
             {
              id: id,
              hostid:hostid
            })
            .then(() => {
                setChange(!change)
                // Perform additional actions here
            })
            .catch((error) => {
                console.error('Error in POST request:', error);
            });



    }

    useEffect(() => {
        api.post('/admin/getAHostdetail', id)
            .then(({ data }) => {


                setHostdetail(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [change]);

    return (
        <Box sx={{

            margin: 'auto',
            width: '100%',
            height: '100%',
        }}>
            <Grid container sx={{}}>
                <Grid item lg={4} md={6} sx={{ margin: 'auto' }}>
                    <Card sx={{ mb: 4, }} >
                        <CardMedia
                            component="img"
                            src={HostDetail[0].image}
                            alt="avatar"
                            className="rounded-circle"
                            style={{ width: '250px', margin: '0 auto' }}
                        />
                        <CardContent className="text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                        >
                            {/* <Typography variant="body1" color="textSecondary" gutterBottom>
                                Full Stack Developer
                            </Typography>
                            <Typography variant="body2" color="textSecondary" paragraph>
                                Bay Area, San Francisco, CA
                            </Typography> */}
                            <div className="d-flex justify-content-center mb-2"
                            >
                                {HostDetail[0].Verified ? <><StyledIcon /> <h6>Verified</h6></> : <Button variant="contained" onClick={() => {
                                    Verify(HostDetail[0]._id,HostDetail[0].hostid)
                                }}>verify</Button>}
                                {/* <Button variant="outlined" className="ms-1">Message</Button> */}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item lg={6} md={6}>
                    <Card sx={{ mb: 4 }}>
                        <CardContent>
                            <Grid container mt={5}  >
                                <Grid item xs={6}>
                                    <Typography variant="body1" >Full Name</Typography>
                                </Grid>

                                <Grid item xs={6} >
                                    <Typography variant="body1" color="textSecondary" >{HostDetail[0].FullName}</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            <Grid container>
                                <Grid item xs={6} mt={5}>
                                    <Typography variant="body1">Address</Typography>
                                </Grid>
                                <Grid item xs={6} mt={5}>
                                    <Typography variant="body2" color="textSecondary">{HostDetail[0].Address}</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            <Grid container mt={5}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Pancard</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">{HostDetail[0].PanCard}</Typography>
                                </Grid>
                            </Grid>
                            <hr />

                            <Grid container mt={5}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">AadharCard No</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">{HostDetail[0].AadharNumber}</Typography>
                                </Grid>
                            </Grid>
                            <hr />

                            <Grid container mt={5}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">Date of Birth</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">{HostDetail[0].DateOfBirth}</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            <Grid container mt={5}>
                                <Grid item xs={6}>
                                    <Typography variant="body1">RentalLicensePermit</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="textSecondary">{HostDetail[0].RentalLicensePermit}</Typography>
                                </Grid>
                            </Grid>
                            <hr />
                            {/* <Grid container mt={5}>
                                <Grid item xs={3}>
                                    <Typography variant="body1">Address</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography variant="body2" color="textSecondary">Bay Area, San Francisco, CA</Typography>
                                </Grid>
                            </Grid> */}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

