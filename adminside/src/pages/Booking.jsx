import React, { useEffect, useState, } from 'react';
import Tablecomponent from '../parts/Table';
import api from '../axios/axios';
import BtnComponent from '../components/Btncomponent';
import swal from 'sweetalert';
import { Box ,Typography} from '@mui/material';


const Booking = () => {
    const [Order, setOrder] = useState([])
    const [change, setChange] = useState(false)
    // const style1 = {
    //     bgcolor: 'green',
    // }

    const style = {
        bgcolor: 'red',
    }
    function Cancel(hostid,price,orderid) {
        swal({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            buttons: ['Cancel', 'Refund'],
            dangerMode: true,
        })
            .then((willDelete) => {

                if (willDelete) {
                    api.patch(`/admin/Cancelbooking/${hostid}/${price}/${orderid}`).then(() => {
                        setChange(!change)
                    })

                }
            }).catch((err) => {
               alert(err)
            })


    }
    useEffect(() => {
        api.get('/admin/getallorder').then(({ data }) => {
            const datas = data.map((item) => ({
                ...item,
                Image: <img src={`http://htron.site/api/images/${item.Image}`} style={{ width: '50px' }}></img>,
                Action: item.OrderStatus === "Booking Cancelled" ?  <BtnComponent
                    variant={'contained'}
                    callback={() => {
                        Cancel(item.hostid,item.TotalAmount,item._id)
                    }}
                    content={'Refund'}
                    style={style}
                />:''

            }))

            setOrder(datas)
        })
    }, [change])

    return (
        <Box>
            <Typography variant="h4" textAlign={"center"} m={2}>
                BOOKINGS
            </Typography>
            <Tablecomponent Data={Order} ></Tablecomponent>
        </Box>
    );
};
export default Booking;