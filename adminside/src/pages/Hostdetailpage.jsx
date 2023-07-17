import React, { useEffect, useState, } from 'react';
import Tablecomponent from '../parts/Table';
import api from '../axios/axios';
import { Box ,Typography} from '@mui/material';
import BtnComponent from '../components/Btncomponent';
// import styled from 'styled-components';
// import { Verified } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// const StyledIcon = styled(Verified)`
//   color: green;
//   font-size: 30px;
// `;
export default function Hostdetail() {
  const [HostDetail, setHostdetail] = useState([])
  const Navigate = useNavigate()
  function NavigatetoView(id) {
    Navigate(`/singlehostdetail/${id} `)
  }


  useEffect(() => {
    api.get('/admin/getAllHostdetail')
      .then(({ data }) => {
        const updatedData = data.map(item => ({
          ...item,
          View: <BtnComponent variant="primary" callback={() => {
            NavigatetoView(item._id)
          }}
            content="View" />
          // Update BtnComponent props accordingly
        }));
        setHostdetail(updatedData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <Box>
      <Typography variant="h4" textAlign={"center"} m={2}>
        HOST REQUEST
      </Typography>

      <Tablecomponent Data={HostDetail} ></Tablecomponent>

    </Box>
  )
    


}