import React, { useEffect, useState, useCallback,useRef } from 'react';
import Tablecomponent from '../parts/Table';
import ToggleSwitch from '../parts/Toggleswitch';
import api from '../axios/axios';
import SearchInputField from '../components/Searchfiels';
import { Box,Typography } from '@mui/material';
import io from 'socket.io-client'


const About = () => {
    const socket = useRef()
    useEffect(() => {
        socket.current = io('https://htron.site', { path: '/api/socket.io/' })

      }, [])

    const [user, setUser] = useState([])
    const [change, setChange] = useState(false)
    const handleChange = useCallback(() => {
        setChange(prevChange => !prevChange);
        // socket.current.emit('block', {
            
        //     text: 'blocking on',
      
        //   })
    }, []);
    const [users, setUsersearch] = useState([])
    const Block =(userid)=>{
        socket.current.emit('block', {
            userid: userid,
            // receiverid: getReceiverid(),
            text: 'block',
      
          })
    }

    const Handlesearch = (search) => {


        const  resul = users.filter((item) => item.FullName.includes(search));
        setUser(resul);
    }
  
    useEffect(() => {
        api.get('/admin/getuser').then(({ data }) => {
            const datas = data.map(item => ({
                ...item,
                block: <ToggleSwitch data={item.block} userId={item._id} handle={handleChange} change={change} Block={Block}></ToggleSwitch>



            }));
            setUser(datas)
            setUsersearch(datas)


        })
    }, [change, handleChange])
    return (
        <Box sx={{ overflowX: 'hidden' }}>

      <Typography variant="h4" textAlign={"center"} m={2}> USERS</Typography>

            <div style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px',
                boxSizing: 'border-box',
                '@media (max-width: 768px)': {
                    marginLeft: 0,
                }
            }}>
                <SearchInputField Handlesearch={Handlesearch} />
            </div>

            <Tablecomponent Data={user} ></Tablecomponent>
        </Box>
    );
};
export default About;