import * as React from 'react'
import { styled } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import { CardContent, Typography, Grid, Paper, Card } from '@mui/material'
import WalletIcon from '@mui/icons-material/Wallet'
import PropTypes from 'prop-types';
// import BtnComponent from '../components/btncomponent'

const ProfileContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(15),
}))

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(15),
    height: theme.spacing(15),
}))

const ProfileName = styled(Typography)(({ theme }) => ({
    marginTop: theme.spacing(1),
}))

const ProfileFieldContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
}))

const ProfileField = styled(TextField)(({ theme }) => ({
    margin: theme.spacing(1),
}))

Profile.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    wallet: PropTypes.number.isRequired,
  };
  
export default function Profile({ name, email, phoneNumber, wallet }) {
    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: '#840D1F',
            },
            children: `${name.split('')[0][0]}${name.split('')[1][0]}`,
        }
    }
    return (
        <ProfileContainer>
            <Grid container>
                <Grid item xs={12} lg={12}>
                    <ProfileFieldContainer>
                        <Card
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width:'400px'
                            }}
                        >
                            <ProfileAvatar {...stringAvatar(name)} />
                            <ProfileName variant="h4">{name}</ProfileName>
                            <ProfileField
                                label="Email"
                                sx={{
                                  
                                    width:'350px'
                                }}
                                defaultValue={email}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                            <ProfileField
                                label="phoneNumber"
                                defaultValue={phoneNumber}
                                InputProps={{
                                    readOnly: true,
                                }}
                                sx={{
                                  
                                    width:'350px'
                                }}
                            />
                        </Card>
                    </ProfileFieldContainer>
                </Grid>
                <Grid item xs={12} lg={12}>
                    <ProfileFieldContainer>
                        <Box width={400}>
                            <Paper sx={{ bgcolor: '#255C99', color: 'white' }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <WalletIcon fontSize="large" />
                                    <Typography variant="h5" component="h2">
                                        My Wallet
                                    </Typography>
                                    <Typography gutterBottom>
                                        Balance: ₹{wallet}
                                    </Typography>
                                </CardContent>
                            </Paper>
                        </Box>
                    </ProfileFieldContainer>
                </Grid>
                
            </Grid>
        </ProfileContainer>
    )
}
