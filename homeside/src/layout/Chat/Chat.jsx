/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client'
import {
  Container,
  Card,
  Grid,
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  Avatar
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useSelector } from 'react-redux'
import { getconversation, getMessages, postMessage } from '../../api/apicall';
import Message from './Message';
import ChatUser from './Chatuser';
import useMediaQuery from '@mui/material/useMediaQuery'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import swal from 'sweetalert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import socket from './Socket';

function Chat() {

  const [chatData, setChatData] = useState([])
  const [currentchat, setCurrentChat] = useState()
  const [messages, setMessages] = useState([])
  const [NewMessage, setNewMessage] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [receiver, setReceiver] = useState('')
  const chatRef = useRef()
  const userid = useSelector((state) => state.user.id)
  const matches = useMediaQuery('(min-width:600px)')
  const [show, setShow] = useState(true)
  const [onlineuser, setOnlineuser] = useState([])





  useEffect(() => {

    arrivalMessage &&
      checkcurrentChat(arrivalMessage.senderid) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, chatData])
  useEffect(() => {
    socket.current?.emit('adduser', userid)
    socket.current?.on('getuser', (users) => {
      setOnlineuser(users)

    })
  }, [userid])

  useEffect(() => {
    socket.current.on('getMessage', (data) => {
      toast(`🦄 ${data.name} sent a message`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setArrivalMessage({
        senderid: data.senderid,
        text: data.text,
        createdAt: Date.now(),
      })
    })
  }, [])
  // const groupObjectsById = (arr) => {
  //   return arr.reduce((groupedObjects, obj) => {
  //     const id = obj.senderid;
  //     if (groupedObjects[id]) {
  //       groupedObjects[id].count++;
  //     } else {
  //       groupedObjects[id] = {
  //         objects: [obj],
  //         count: 1
  //       };
  //     }
  //     return groupedObjects;
  //   }, {});
  // };

  // const groupedById = groupObjectsById(notification);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])
  useEffect(() => {
    const getchatuser = async () => {
      try {
        const { data } = await getconversation(userid)
        const online = data.map(obj1 => {
          const matchedObj = onlineuser.find(obj2 => obj2.userid === obj1.receiverid);
          if (matchedObj) {
            return { ...obj1, online: true };
          }

          return { ...obj1, online: false };
        });
        setChatData(online)
      } catch (err) {
        alert(err)
      }
    }
    getchatuser()
  }, [userid, onlineuser])
  useEffect(() => {
    const getCurrentMessage = async () => {
      try {
        const { data } = await getMessages(currentchat)
        setMessages(data)
      } catch (err) {
        alert(err)
      }
    }
    if (currentchat) {
      getCurrentMessage()
    }
  }, [currentchat])

  function checkcurrentChat(senderid) {
    if (currentchat) {
      const data = chatData.find(
        (item) => item.conversationid === currentchat
      )
      return data.receiverid === senderid
    }
    return null
  }


  function getReceiverid() {
    if (currentchat) {
      const data = chatData.find(
        (item) => item.conversationid === currentchat
      )
      return data.receiverid
    }
    return false
  }
  function getReceivername() {
    if (currentchat) {
      const data = chatData.find(
        (item) => item.conversationid === currentchat
      )
      return data.receiverName
    }
    return false
  }
  const handlesubmit = () => {
    const message = {
      conversationid: currentchat,
      senderid: userid,
      text: NewMessage,
      createdAt: Date.now(),

    }

    socket.current.emit('sendMessage', {
      senderid: userid,
      receiverid: getReceiverid(),
      name: getReceivername(),
      text: NewMessage,

    })


    postMessage(message)
      .then(({ data }) => {
        setMessages([...messages, data])
        setNewMessage('')
      })
      .catch((err) => {
        alert(err)
      })
  }

  function handlefield(e) {
    setNewMessage(e.target.value)
  }


  useEffect(() => {
    socket.current.on('blockuser', () => {
      swal({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        button: 'OK',
        dangerMode: true,
      }).then(() => {
        // User clicked the "OK" button
        // Perform your desired action here
      });
    })
  }, [])


  function stringToColor(string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff
      const brightValue = (value + 128) % 256;
      color += `00${brightValue.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split('')[0][0]}${name.split('')[1][0]}`,
    }
  }

  return (<>
    {matches ? <Container
      maxWidth="xl"
      sx={{
        width: '95%',
        overflow: 'hidden',
        overflowX: 'hidden',
        overflowY: 'hidden',

        paddingTop: '100px',
        height: '100%',


      }}
    >
      <Card
        sx={{
          bgcolor: '#EEEEEE',
          width: '100%',
          mt: 4,
          height: 'auto',
          boxShadow: 5,
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Box
              sx={{
                width: '100%',
                height: '70vh',
                overflowX: 'hidden',
                overflowY: 'auto',
                padding: 1,
                scrollbarWidth: 'thin',
                bgcolor: 'white',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'gray',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'darkgray',
                },
              }}
            >
              {chatData
                ? chatData.map((item, index) => (
                  <Box
                    component={'div'}
                    onClick={() => {
                      setCurrentChat(
                        item.conversationid
                      )
                      setReceiver(item)
                    }}
                    key={index}
                  >
                    <ChatUser
                      data={item}
                      currentchat={currentchat}
                    />
                  </Box>
                ))
                : null}
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={8}>
            {currentchat ? (
              <>
                <Box
                  sx={{
                    height: '70vh',
                    width: '100%',
                    bgcolor: '#ffff',
                    overflowX: 'hidden',
                    padding: 5,
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {
                      width: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'gray',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'darkgray',
                    },
                  }}
                >

                  {messages.map((item, index) => (
                    <div
                      ref={chatRef}
                      id="scroll"
                      key={index}
                    >
                      <Message
                        data={item}
                        userid={userid}
                        receiver={receiver}
                      // user={user}
                      />
                    </div>
                  ))}
                </Box>
                <Stack direction={'row'}>
                  <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    maxRows={4}
                    fullWidth
                    size="small"
                    value={NewMessage}
                    onChange={handlefield}
                  />
                  <Button
                    disabled={!NewMessage}
                    variant="contained"
                    sx={{ bgcolor: '#3b71ca' }}
                    endIcon={<SendIcon />}
                    onClick={handlesubmit}
                  ></Button>
                </Stack>
              </>
            ) : (
              <Box
                height={'60vh'}
                textAlign={'center'}
                pt={'30vh'}
                width={'100%'}
              >
                <Typography variant="h4" color={'#D3D3D3'}>
                  start a chat now
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Card>
    </Container> : <Box
      maxWidth="xl"
      sx={{
        width: '100%',
        overflow: 'hidden',
        overflowY: 'auto',

        paddingTop: '30px',
        height: '100%',


      }}
    >
      <Card
        sx={{
          bgcolor: '#EEEEEE',
          width: '100%',
          mt: 4,
          height: 'auto',
          boxShadow: 5,
        }}
      >
        <Grid Container>
          {show ? <Grid item xs={12} sm={12} lg={4}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                overflowX: 'hidden',
                overflowY: 'auto',
                padding: 1,
                scrollbarWidth: 'thin',
                bgcolor: 'white',
                '&::-webkit-scrollbar': {
                  width: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'gray',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'darkgray',
                },
              }}
            >
              {chatData
                ? chatData.map((item, index) => (
                  <Box
                    component={'div'}
                    onClick={() => {
                      setCurrentChat(
                        item.conversationid
                      )
                      setReceiver(item)
                      setShow(false)

                    }}
                    key={index}
                  >
                    <ChatUser
                      data={item}
                      currentchat={currentchat}
                    />
                  </Box>
                ))
                : null}
            </Box>
          </Grid> : <Grid item xs={12} sm={12} lg={12}>
            {currentchat ? (
              <><Box sx={{
                heigth: '60px',
                width: '100%',
                bgcolor: '#f5f5f5',
                display: 'flex'
              }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '56px',

                  }}
                  onClick={() => setShow(true)}>
                  <ArrowBackIcon />
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',


                }}>
                  <Avatar {...stringAvatar(receiver.receiverName)} />
                </Box>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',


                }}>
                  <Typography p={1} color={'#3b71ca'} fontWeight={600} variant="inherit">
                    {receiver.receiverName}
                  </Typography>
                </Box>
              </Box>
                <Box
                  sx={{
                    height: '70vh',
                    width: '100%',
                    bgcolor: '#ffff',
                    overflowX: 'hidden',
                    padding: 5,
                    overflowY: 'auto',
                    scrollbarWidth: 'thin',
                    scrollBehavior: 'smooth',
                    '&::-webkit-scrollbar': {
                      width: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'gray',
                      borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'darkgray',
                    },
                  }}
                >

                  {messages.map((item, index) => (
                    <div
                      ref={chatRef}
                      id="scroll"
                      key={index}
                    >
                      <Message
                        data={item}
                        userid={userid}
                        receiver={receiver}
                      // user={user}
                      />
                    </div>
                  ))}
                </Box>
                <Stack direction={'row'}>
                  <TextField
                    id="outlined-multiline-flexible"
                    multiline
                    maxRows={4}
                    fullWidth
                    size="small"
                    value={NewMessage}
                    onChange={handlefield}
                  />
                  <Button
                    disabled={!NewMessage}
                    variant="contained"
                    sx={{ bgcolor: '#3b71ca' }}
                    endIcon={<SendIcon />}
                    onClick={handlesubmit}
                  ></Button>
                </Stack>
              </>
            ) : (
              <Box
                height={'60vh'}
                textAlign={'center'}
                pt={'30vh'}
                width={'100%'}
              >
                <Typography variant="h4" color={'#D3D3D3'}>
                  start a chat now
                </Typography>
              </Box>
            )}
          </Grid>}


        </Grid>
      </Card>
    </Box>}
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />


  </>
  )
}

export default Chat;
