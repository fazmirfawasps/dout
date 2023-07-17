import React, {  useEffect, useState } from 'react'
import { Box, Container, Typography, Grid, useMediaQuery } from '@mui/material'
// import { useDispatch, useSelector } from 'react-redux'
// import { getPropertyType, postwishlist, searchProperty } from '../api/api'
// import ProductCard1 from '../component/ProductCard1'
// import { addfavourite } from '../Redux/properties/propertiesAction'
import { useNavigate } from 'react-router-dom'
// import { addSingleProperty } from '../Redux/singleProperty/singlePropAction'

// import { ExternalContext } from '../context/CustomContext'
// import { useContext } from 'react'
import FilterBar from './Filter'
import { GetAllProperty, VehicleType } from '../api/apicall'
import { ProCard } from '../components/ProCard'
import SearchInputField from '../components/Searchbat'
import { useSelector } from 'react-redux'
import { postwishlist, deleteWishlist,getWishlist} from '../api/apicall'

export function SearchProperty() {
    const naviagate = useNavigate()
    const [Property, setProperty] = React.useState([])
    const [propertType, setPropertyType] = useState([])
    const [categoryFiter, setCategoryFilter] = useState('All')
    const [filterPropery, setFilteredProperty] = useState([])
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(0)
    const [MAXIMUM, setMAXIMUM] = useState(0)
    const [MINIMUM, setMINIMUM] = useState(0)
    const matches = useMediaQuery('(min-width:800px)')
    const userId = useSelector((state) => state.user.id)
    const[change,setChange]=useState(false)

    useEffect(() => {
        async function getSearchProperty() {
            try {
                GetAllProperty().then(({ data }) => {
                    var property =data
                    const maxValue = data.reduce((acc, item) => {
                        return Math.max(acc, item.Price)
                    }, 0)
                    const minValue = data.reduce((acc, item) => {
                        return Math.min(acc, item.Price)
                    }, Number.MAX_SAFE_INTEGER)
                    setMin(minValue)
                    setMax(maxValue)
                    setMAXIMUM(maxValue)
                    setMINIMUM(minValue)
                    getWishlist(userId).then(({ data }) => {
                        const newArray = property.map(item => {
                            const matchingItem = data.find(obj => obj._id === item._id);
                            if (matchingItem) {
                              return { ...item, wishlist:true };
                            }
                            return item;
                          });
                          setProperty(newArray)
                          setFilteredProperty(newArray)

        
                    }).catch(() => {
            
                    })
                })

                VehicleType().then(({ data }) => {
                    setPropertyType(data.map((item) => item.Category))

                })
                

            } catch (err) {
                alert(err)
            }
        }
        getSearchProperty()
    }, [change])
    useEffect(() => {
        if (categoryFiter !== 'All') {
            const newFilteredProperty = Property.filter(
                (item) => item.VehicleType === categoryFiter
            )
            setFilteredProperty(newFilteredProperty)
        } else {
            setFilteredProperty(Property)
        }
    }, [categoryFiter])
    function handlePrice(e) {
        const value = e.target.value
        setMin(value[0])
        setMax(value[1])
        const newFilteredProperty = Property.filter(
            (item) => item.Price >= value[0] && item.Price <= value[1]
        )
        setFilteredProperty(newFilteredProperty)
    }
    function navigetTosinglepage(id) {

        naviagate(`/View-SingleProduct/${id}`)
    }
    const Handlesearch = (search) => {

 
        const newFilteredProperty = Property.filter((item) => item.PropertyName.includes(search));
        
        setFilteredProperty(newFilteredProperty)

    }

    async function addtofavourite(property) {
        if (userId) {
            try {
                await postwishlist(userId, property._id)
                setChange(!change)
                
            } catch (err) {
                alert(err)
            }
        } else {
            // setOpenlogin(true)
            alert(err)
        }
    }

    async function removeFromWishlist(id) {
        if (userId) {
            try {
                await deleteWishlist(userId, id)
                setChange(!change)

                
            } catch (err) {
                alert(err)
            }
        }
    }
    function ProductCard() {
        const result = filterPropery.map((item, index,) => {
            return (
                <ProCard
                    key={index}
                    property={item}
                    callback={navigetTosinglepage}
                    addtowishlist={addtofavourite}
                    removeFromWishlist={removeFromWishlist}
                    size={4}
                    wishlist={true}
                />
            )
        })
        return result
    }
    return (
        <Box mt={14}>
            <Container maxWidth="xl" sx={{ width: '94%' }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px', // Optional: Add margin top for spacing
                }}><SearchInputField Handlesearch={Handlesearch}></SearchInputField></Box>

                {Property.length == 0 ? (
                    <Typography textAlign={'center'}>
                        Result Not Found
                    </Typography>
                ) : (
                    <Box
                        mt={3}
                        display={'flex'}
                        
                        flexDirection={matches ? 'row' : 'column'}
                    >
                        <FilterBar
                            propertType={propertType}
                            setCategoryFilter={setCategoryFilter}
                            handlePrice={handlePrice}
                            MIN={min}
                            MAX={max}
                            MAXIMUM={MAXIMUM}
                            MINIMUM={MINIMUM}
                        />
                        <Grid container >
                            <ProductCard />
                        </Grid>
                    </Box>
                )}
            </Container>
        </Box>
    )
}