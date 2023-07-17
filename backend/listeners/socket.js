const socketIO = require('socket.io');
const { adduser, user, getReceiver, RemoveUser,Getuser } = require("./EmitterChat");

module.exports = function(server) {
  const io = socketIO(server,{
    path: "/api/socket.io/",
    cors: {
      origin: ["https://htron.site",'http://localhost:7000','https://www.htron.site',`https://admin.htron.site`],
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (message) => {
      io.emit('chat message', message); // Broadcast the message to all connected clients
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
      RemoveUser(socket.id)

    });
    socket.on("adduser", (userid) => {
      adduser(userid, socket.id)
      const users = Getuser()
        io.emit('getuser',users)
      });
    
    socket.on('sendMessage', ({ senderid, receiverid,name, text }) => {

      const receiver = getReceiver(receiverid)
      if (receiver) {
        io.to(receiver?.socketid).emit('getMessage', {
          senderid,
          text,
          name
        })
      }
    })
    socket.on("block", ({userid,text}) => {
      const receiver = getReceiver(userid)
       if (receiver) {
         io.to(receiver?.socketid).emit('blockuser',user)
       }
       });
  });
};
