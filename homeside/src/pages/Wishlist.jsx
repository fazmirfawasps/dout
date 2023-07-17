import React, { useState } from 'react'
import { Container ,Typography} from '@mui/material'
import ProductCard from '../components/Productcard'
import { getWishlist } from '../api/apicall'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


import { useEffect } from 'react'


export default function WishList(){
    const[wishlist,setWishlist]=useState([])
    const naviagate = useNavigate()
    const userId = useSelector((state) => state.user.id)

useEffect(()=>{
    getWishlist(userId).then(({ data }) => {
       
          setWishlist(data)

    }).catch(() => {

    })
},[])
function navigetTosinglepage(id) {
    // // let singleProperty = Property.find((item) => item._id == id)
    // dispatch(addProperty(singleProperty))
    naviagate(`/View-SingleProduct/${id}`)
}

    return(
        <Container
        sx={{
           
            marginTop:'100px',
            height:'100vw'
        }}
    >
        <Typography pt={2} pb={2} color="primary" variant="h4">
            Wishlist
        </Typography>
        <ProductCard
            property={wishlist}
            callback={navigetTosinglepage}
            wishlist={false}
        />
    </Container>

    )
}