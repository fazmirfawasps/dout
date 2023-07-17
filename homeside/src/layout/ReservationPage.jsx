import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TableComponent from '../components/TableComponent'
import BtnComponent from '../components/btncomponent'
import { useEffect } from 'react'
import { getUserOrders, Cancelorder } from '../api/apicall'
import { useSelector } from 'react-redux'
import swal from 'sweetalert';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const userid = useSelector((state) => state.user.id)
    const today = new Date()
    const [order, setOrder] = React.useState([])
    const [todayOrders, setTodayorder] = React.useState([])
    const [upcomeOrders, setUpcomeorder] = React.useState([])
    const [pastOrders, setPastOrder] = React.useState([])

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
                console.log(err);
            })


    }
    const style = {
        backgroundColor: '#d4213f'
    }
    useEffect(() => {
        getUserOrders(userid).then(({ data }) => {
            const datas = data.map((item) => ({
                ...item,
                Image: <img src={`http://htron.site/api/images/${item.Image}`} style={{ width: '50px' }}></img>,
                Action: item.OrderStatus === "Booking Cancelled" ||item.OrderStatus === "Refunded"? "" : <BtnComponent
                    variant={'contained'}
                    callback={() => {
                        Cancel(item._id)
                    }}
                    content={'Canel'}
                    style={style}
                />

            }))
            
            const tod =datas.filter((order) => {
                const checkinDateParts = order.Checkin.split('-');
                const checkoutDateParts = order.Checkout.split('-');
                const checkinDate = new Date(
                  checkinDateParts[2],
                  checkinDateParts[1] - 1,
                  checkinDateParts[0]
                );
                const checkoutDate = new Date(
                  checkoutDateParts[2],
                  checkoutDateParts[1] - 1,
                  checkoutDateParts[0]
                );
                return today >= checkinDate && today <= checkoutDate;
              });
              const Upcoming =datas.filter((order) => {
                const checkinDateParts = order.Checkin.split('-');
                // const checkoutDateParts = order.Checkout.split('-');
                const checkinDate = new Date(
                  checkinDateParts[2],
                  checkinDateParts[1] - 1,
                  checkinDateParts[0]
                );
               
                return today < checkinDate 
              });
              const Pastorder =datas.filter((order) => {
                // const checkinDateParts = order.Checkin.split('-');
                const checkoutDateParts = order.Checkout.split('-');
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
               
                return   today > checkoutDate
              }).map((order) =>
              ({
                ...order,
                Action: order.OrderStatus === "Booking Cancelled" ? "":'',
                OrderStatus: order.OrderStatus === "Booking Cancelled" ? "Booking Cancelled":' Booked',

            }
              ))
              const allorder = datas.map((item) =>  { 

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
            
            setTodayorder(tod)
            setUpcomeorder(Upcoming)
            setOrder(allorder)
            setPastOrder(Pastorder)
        })
    }, [change])

    return (
        <Box sx={{ margin: '0 10vw' }}>
             
            <Box sx={{ width: '100%', marginTop: '100px' }}>
            <Typography variant="h6"  style={{marginBottom:'20px',color:'#2B3467'}} fontWeight={600}>
                    View Bookings
                </Typography>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Past" {...a11yProps(0)} />
                        <Tab label="Today" {...a11yProps(1)} />
                        <Tab label="Upcoming" {...a11yProps(2)} />
                        <Tab label="All" {...a11yProps(3)} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <TableComponent Data={pastOrders}></TableComponent>

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableComponent Data={todayOrders}></TableComponent>

                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TableComponent Data={upcomeOrders}></TableComponent>

                </TabPanel>
                <TabPanel value={value} index={3}>
                    <TableComponent Data={order}></TableComponent>
                </TabPanel>
            </Box>
        </Box>
    );
}