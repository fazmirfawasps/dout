import React, { useEffect, useState, } from 'react';
import Tablecomponent from '../parts/Table';
import api from '../axios/axios';
import BtnComponent from '../components/Btncomponent';
import { Box, Typography } from '@mui/material';
import swal from 'sweetalert';


const PropertyList = () => {
    const [Property, setProperty] = useState([])
    const [change, setChange] = useState(false)
    // const style1 = {
    //     bgcolor: 'green',
    // }

    const style2 = {
        bgcolor: 'red',
    }
    // const handleChange = useCallback(() => {
    //     setChange(prevChange => !prevChange);
    // }, []);
    const removeProperty = (id) => {
        swal({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    api.delete(`/admin/removeProperty/${id}`).then(() => {
                        setChange(!change)


                    })
                }

            }).catch((err) => {
                alert(err)
            })
    }

    useEffect(() => {
        api.get('/admin/getAllPropertyList').then(({ data }) => {
            const datas = data.map((item) => ({
                ...item,
                Activate: item.Activate ? 'activated' : 'deactivated',


                Action: (<BtnComponent
                    variant={'contained'}
                    style={style2}
                    callback={() => {
                        removeProperty(item._id)
                    }}
                    content={' Remove'}
                />)




            }));
            setProperty(datas)
        })
    }, [change])
    return (
        <Box>
            <Typography variant="h4" textAlign={"center"} m={2}>
                Vehicle Management
            </Typography>
            <Tablecomponent Data={Property} ></Tablecomponent>
        </Box>
    );
};
export default PropertyList;