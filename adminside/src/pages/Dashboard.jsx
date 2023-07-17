import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, Card, Typography } from "@mui/material";
import GraphChart from '../components/GraphChart';
import BarChart from '../components/BarChart';
import api from '../axios/axios';
import { useMediaQuery } from '@mui/material';
import { ColorRing } from  'react-loader-spinner'

const Dashboard = () => {
  const [dashBoard, setDashBoard] = useState([]);
  const [Loading, setLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width: 600px)');
  useEffect(() => {
    api.get('/admin/dashboard').then(({ data }) => {
      setDashBoard(data)
      setLoading(true)

    })
  }, [])
  const {
    TodayAmount,
    moneyGeneratedPerWeek,
    totalAmount,
    totalBookingPerDay,
    totalNumberOfProperty,
    totalperMonth
  } = dashBoard

  const totalBooking = {
    labels: totalBookingPerDay && Array.isArray(totalBookingPerDay) ? totalBookingPerDay.map((item) => item._id) : [0, 0, 0],
    datasets: [
      {
        label: "BookingsPerDay",
        data: totalBookingPerDay && Array.isArray(totalBookingPerDay) ? totalBookingPerDay.map((item) => item.total) : [0, 0,],
        backgroundColor: ["#404040"],
      },
    ],
  };
  const totalBookingperMonth = {
    labels: totalBookingPerDay && Array.isArray(totalperMonth) ? totalperMonth.map((item) => item.month) : [0, 0, 0],
    datasets: [
      {
        label: "BookingsPerMonth",
        data: totalBookingPerDay && Array.isArray(totalperMonth) ? totalperMonth.map((item) => item.totalBookings) : [0, 0, 0],
        backgroundColor: ["#404040"],
      },
    ],
  };
  const loader = <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item sm={12} xs={12} lg={3}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: "#000000",
              color: "white",
            }}
          >
            <Typography variant="h5">Total Revenue</Typography>
            <Typography mt={1} variant="h5">
              {Loading ? totalAmount:loader}

            </Typography>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} lg={3}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: '#404040',
              color: "white",
            }}
          >
            <Typography variant="h5">Number of vehicle </Typography>
            <Typography mt={1} variant="h5">
              {Loading ? totalNumberOfProperty:loader}

            </Typography>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} lg={3}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: "#7f7f7f",
              color: "white",
            }}
          >
            <Typography variant="h5">Total Revenue Week</Typography>
            <Typography mt={1} variant="h5">
              
              {Loading ? `₹${moneyGeneratedPerWeek}`:loader}

            </Typography>
          </Card>
        </Grid>
        <Grid item sm={12} xs={12} lg={3}>
          <Card
            sx={{
              width: "auto",
              height: 150,
              padding: 4,
              textAlign: "center",
              boxShadow: 4,
              bgcolor: "#bfbfbf",
              color: "white",
            }}
          >
            <Typography variant="h5">Total Revenue Today</Typography>
            <Typography mt={1} variant="h5">
              
              {Loading ? `₹${TodayAmount}`:loader}

            </Typography>
          </Card>
        </Grid>
        <Box width='auto' height={250} />
        <Grid item xs={12} lg={6}>
          <Box width={isMobile ? 400 : 500} p={1}>
            
            <BarChart
              chartData={totalBookingperMonth}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box width={isMobile ? 400 : 500} p={1}>
            <GraphChart
              chartData={totalBooking}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;