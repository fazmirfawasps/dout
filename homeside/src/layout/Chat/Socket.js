import io from 'socket.io-client';
const socket ={}
socket.current = io('https://htron.site', { path: '/api/socket.io/' })

export default socket;
