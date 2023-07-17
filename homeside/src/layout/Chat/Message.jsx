import React from 'react'
import { Box, Avatar, Typography, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(frenchStrings)
// register('en-US', en);

const useStyles = makeStyles({
    chatroot1: {
        width: '100%',
        alignItems: 'end',
        justifyContent: 'end',
        m: 1,
        height: 80,
    },
    chatroot2: {
        width: '100%',
        alignItems: 'start',
        justifyContent: 'start',
        m: 1,
        height: 80,
    },
    chat1: {
        wordBreak: 'break-all',
        color: 'white',
        backgroundColor: '#3b71ca',
        maxWidth: 400,
    },
    chat2: {
        wordBreak: 'break-all',
        color: 'black',
        backgroundColor: 'white',
        maxWidth: 400,
    },
})

function Message({ data, userid, receiver,  }) {
    const { chat1, chat2, chatroot1, chatroot2 } = useStyles()
    const own = data.senderid === userid
    function stringAvatar(name) {
        return `${name.split('')[0][0]}${name.split('')[1][0]}`
    }
    return (
        <>
            <Stack
                direction={own ? 'row' : 'row-reverse'}
                component={'div'}
                spacing={1}
                className={own ? chatroot1 : chatroot2}
            >
                <Box>
                    <Typography
                        className={own ? chat1 : chat2}
                        p={1}
                        borderRadius={2}
                        variant="body2"
                    >
                        {data.text}
                    </Typography>
                    <Typography
                        sx={{ float: own ? 'right' : 'left' }}
                        variant="caption"
                    >
                        <TimeAgo date={data.createdAt} formatter={formatter} />
                    </Typography>
                </Box>
                <Avatar sx={{ bgcolor: own ? 'blue' : 'green' }}>
                    {own
                        ? ('u')
                        : stringAvatar(receiver.receiverName)}{' '}
                </Avatar>
            </Stack>
        </>
    )
}

export default Message
