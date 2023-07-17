import { Box, Typography, Container } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux'
// import HostPropetyCard from '../component/HostPropertyCard'
import HostPropertyCard from '../components/HostPropertyCard';
import { ExternalContext } from '../context/CustomContext'
import { useNavigate } from 'react-router-dom'
import { deleteProperty } from '../api/apicall';
import { setIshosted } from "../redux/redux";



// import { RemoveProperties } from '../Redux/properties/propertiesAction'
import { GetHostedProperty ,GetAllProperty} from '../api/apicall';
import { useSelector, useDispatch, } from 'react-redux'



export default function Viewhosted() {
    // const { id } = useParams();
    const id = useSelector((state) => state.user.id)
    const [change, setChange] = useState(true)

    const dispatch = useDispatch()
    const [hostedProperty, setHostedproperty] = useState([])
    const { setPropertyEdit } = useContext(ExternalContext)

    useEffect(() => {
        GetHostedProperty(id).then(({ data }) => {
            setHostedproperty(data)
        })
    }, [change])
    useEffect(() => {
        GetAllProperty().then(({ data }) => {


            const isHosted = data.find((item) => item.hostid === id)
            if (isHosted) {
                dispatch(setIshosted(true))

            }
            else {
                dispatch(setIshosted(false))

            }
        })
    }, [change])

    // constuserID = useSelector((state) => state.user.userDetails._id)
    // consthostedProperty = useSelector((state) =>
    //     state.properties.propertyArray.filter((item) => item.hostid == userID)
    // )
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { setPropertyEdit } = useContext(ExternalContext)
    function editProperty(id) {
        constPropertyToedit = hostedProperty?.find((item) => item._id == id)
        // for (var i = 0; i < PropertyToedit.length; i++) {
        //     PropertyToedit[i].vehicleType = PropertyToedit[i].VehicleType;
        //     delete PropertyToedit[i].PropertyToedit .images = PropertyToedit.imageFilenames;;
        //   }
        PropertyToedit.images = PropertyToedit.imageFilenames;
        PropertyToedit.vehicleType = PropertyToedit.VehicleType;
        delete PropertyToedit.imageFilenames;
        delete PropertyToedit.VehicleType;


        setPropertyEdit(PropertyToedit)
        navigate(`/Edit-listed-property/${id}`)
    }

    function removeProperty(id) {
        deleteProperty(id)
            .then(() => {
                setChange(!change)
            })
            .catch((err) => alert(err))
    }

    return (
        <Box mt={10}>
            <Container maxWidth="xl" sx={{ width: '94%' }}>
                <Typography variant="h6" color={ '#2B3467'} fontWeight={600}>
                    Listed Vehicle
                </Typography>
                <HostPropertyCard
                    editProperty={editProperty}
                    removeProperty={removeProperty}
                    property={hostedProperty}
                />
            </Container>
        </Box>
    )
}
