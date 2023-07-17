/* eslint-disable no-unused-vars */
import React from 'react'
import { Container } from '@mui/material'

import TableComponent from '../components/TableComponent'
import BtnComponent from '../components/btncomponent'
import { useEffect } from 'react'
import { getUserOrders, Cancelorder } from '../api/apicall'
import { useSelector } from 'react-redux'
import swal from 'sweetalert';

function BookingPage() {


    const userid = useSelector((state) => state.user.id)
    const today = new Date()
    const [order, setOrder] = React.useState([])
    const [change, setChange] = React.useState(false)
    function Cancel(id) {
        swal({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        })
            .then((willDelete) => {

                if (willDelete) {
                    Cancelorder(id).then(() => {
                        setChange(!change)
                    })

                }
            }).catch((err) => {
                alert(err)
            })


    }
    const style = {
        backgroundColor: '#d4213f'
    }
    useEffect(() => {
        getUserOrders(userid).then(({ data }) => {
            const datas = data.map((item) =>  { 

                const checkoutDateParts = item.Checkout.split('-');
                // const checkinDate = new Date(
                //   checkinDateParts[2],
                //   checkinDateParts[1] - 1,
                //   checkinDateParts[0]
                // );
                const checkoutDate = new Date(
                    checkoutDateParts[2],
                    checkoutDateParts[1] - 1,
                    checkoutDateParts[0]
                  );

                return({
                ...item,
                Image: <img src={`http://htron.site/api/images/${item.Image}`} style={{ width: '50px' }}></img>,
                Action: item.OrderStatus == "Booking Cancelled" || item.OrderStatus === "Refunded"||checkoutDate<today ? "" : <BtnComponent
                    variant={'contained'}
                    callback={() => {
                        Cancel(item._id)
                    }}
                    content={'Canel'}
                    style={style}
                />,
                OrderStatus:checkoutDate<today && item.OrderStatus == "Booking pending"  ?'Booked':item.OrderStatus
                

            })})
           
           

            setOrder(datas)
        })
    }, [change])

    return (
        <Container maxWidth="xl" sx={{ width: '94%', paddingTop: '100px' }}>
            <TableComponent Data={order}></TableComponent>
        </Container>
    )
}


export default BookingPage
