import React, { useState } from 'react';
// import Tablecomponent from '../parts/table';
// import Modaldiv from '../parts/modal';
import AddCategory from '../subpages/Addcategory';
import Categories from '../subpages/Catogories';
import { Box,Typography } from '@mui/material';



import  '../../node_modules/bootstrap/dist/css/bootstrap.min.css'



const Category = () => {
    const[change,setChange] = useState(false)
    const handleChange =()=>{
        setChange(!change)
    }
    return (
        <Box >
            
      <Typography variant="h4" textAlign={"center"} m={2}>
        CATEGORY
      </Typography>
            
            <AddCategory handleChange={handleChange} change={change}></AddCategory>
            <Categories  change={change} handleChange={handleChange}></Categories>
            
               
        </Box>
    );
};
export default Category;