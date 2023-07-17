import React from 'react'
import { Box, Typography, Button, Card, Stack } from '@mui/material'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import ChatIcon from '@mui/icons-material/Chat'
import dayjs from 'dayjs'
import { format } from 'date-fns'
// import { ExternalContext } from '../context/CustomContext'
// import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
// import MenuItem from '@mui/material/MenuItem'
// import FormControl from '@mui/material/FormControl'
// import Select from '@mui/material/Select'
// import { useEffect } from 'react'
import { checkout, addconverstaion } from '../api/apicall'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'





export default function BookingCard({ SingleProperty }) {
    const userid = useSelector((state) => state.user.id)
    const navigate = useNavigate()

    const [startDate, setStartDate] = React.useState(dayjs())
    const [endDate, setEndDate] = React.useState(dayjs().add(1, 'day'))
    // const { setAlert } = React.useContext(ExternalContext)
    const [counter, setCounter] = React.useState(false);

    const [days, setDays] = React.useState(1)
    const [totalAmount, setTotalAmount] = React.useState()
    // const isLoggedin = useSelector('')
    // const { setOpenlogin } = React.useContext(ExternalContext)
    const isLoggedin = true


    function handledate(date) {
        const formattedDate = format(date.$d, 'yyyy-MM-dd')
        return formattedDate
    }

    function handlecheckin(value) {
        setStartDate(dayjs(value))
        setEndDate(dayjs(value).add(1, 'day'))
    }
    function handleChatWithHost() {


        const data = {
            senderid: userid,
            receiverid: SingleProperty.hostid,
        }
        addconverstaion(data)
            .then(() => {
                navigate('/chat')
            })
            .catch((err) => {
                alert(err)
            })
    }

    function handlecheckout(value) {
        const startDateStartOfDay = startDate.startOf('day')
        const valueStartOfDay = dayjs(value).startOf('day')
        if (startDateStartOfDay.isSame(valueStartOfDay)) {
            setEndDate(dayjs(value).add(1, 'day'))
        } else {
            setEndDate(dayjs(value))
        }

        const tdiff = dayjs(value).diff(startDate, 'day') + 1
        const days = diff > 0 ? diff : 1
        setCounter(true)
        const TotalAmt = SingleProperty.Price * days
        setTotalAmount(TotalAmt)
        setDays(diff)
    }
    function handleReserve() {
        const checkin = handledate(startDate)
        const checkOut = handledate(endDate)
        const formattedStartDateToCheck = checkin.slice(2);
        const formattedEndDateToCheck = checkOut.slice(2);
        let totalAmunt
        if (!totalAmount) {
            totalAmunt = SingleProperty.Price
        }
        else {
            totalAmunt = totalAmount
        }
        if (!SingleProperty.NotAvailable) {
            checkout(
                SingleProperty,
                checkin,
                checkOut,
                SingleProperty.hostid,
                totalAmunt,
                userid
            )
                .then((response) => {
                    window.location.href = response.data.url
                    // window.history.pushState(null, null, response.data.url)
                })
                .catch((err) => {
                    alert(err)
                })

        }
        else {
            if (SingleProperty.NotAvailable.includes(formattedStartDateToCheck) || SingleProperty.NotAvailable.includes(formattedEndDateToCheck)) {
                swal({
                    title: 'Dates not availablr',
                    text: ` The following dates are not available: ${SingleProperty.NotAvailable.join(', ')}`,
                    icon: 'warning',
                    buttons: 'OK',
                    dangerMode: true,
                })
            } else {
                checkout(
                    SingleProperty,
                    checkin,
                    checkOut,
                    userid,
                    totalAmunt,

                )
                    .then((response) => {
                        window.location.href = response.data.url
                    })
                    .catch((err) => {
                        alert(err)
                    })
            }
        }


    }
    
    
      
      const disabledDates = SingleProperty.NotAvailable && SingleProperty.NotAvailable.map(dateString => {
        const [year, month, day] = dateString.split('-');
        return new Date(20 + year, month - 1, day);
      }) || [];


      function shouldDisableDate(date) {
        const currentDate = new Date(date);
        return disabledDates.some(disabledDate =>
          currentDate.getFullYear() === disabledDate.getFullYear() &&
          currentDate.getMonth() === disabledDate.getMonth() &&
          currentDate.getDate() === disabledDate.getDate()
        );
      }
    return (
        <Card
            sx={{
                width: 350,
                height: 'auto',
                p: 2,
                borderStyle: 'solid',
                borderWidth: '.2px',
                borderColor: '#dddddd',
                boxShadow: 2,
            }}
        >
            <Stack direction={'column'} spacing={2}>
                <Typography variant="h5">
                    ₹  {SingleProperty.Price} /day
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DemoItem label="check-in">
                            <DatePicker
                                onChange={handlecheckin}
                                value={startDate}
                                disablePast
                                shouldDisableDate={shouldDisableDate}
                                defaultValue={startDate}
                            />
                        </DemoItem>
                        <DemoItem label="check-out">
                            <DatePicker
                                onChange={handlecheckout}
                                value={endDate}
                                disablePast
                                shouldDisableDate={shouldDisableDate}

                                minDate={startDate}
                            />
                        </DemoItem>
                    </DemoContainer>
                </LocalizationProvider>



                <Stack direction={'column'} spacing={2}>
                    {isLoggedin ? (
                        <>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    handleReserve()
                                }}
                            >
                                Book Now
                            </Button>
                            <Button
                                startIcon={<ChatIcon />}
                                variant="contained"
                                onClick={handleChatWithHost}
                            >
                                Chat with host
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained"
                        // onClick={handleLogin}
                        >
                            Login
                        </Button>
                    )}
                </Stack>
                <Box display={'flex'} flexDirection={'row'}>
                    <Typography flexGrow={1}>
                        ₹ {SingleProperty.Price}x{days} days
                    </Typography>
                    <Typography>
                        ₹{counter ? totalAmount : SingleProperty.Price}
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'row'}>
                    <Typography flexGrow={1} variant="h6" fontWeight={600}>
                        Total
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                        ₹{counter ? totalAmount : SingleProperty.Price}
                    </Typography>
                </Box>
            </Stack>
        </Card>
    )






}