const express = require('express')
const app = express()
const path = require('path')


//settings
app.set('port', process.env.PORT || 3000);

//Static File
app.use(express.static(path.join(__dirname, 'public')))

// Strat the server
const server = app.listen(app.get('port'), (port = app.get('port')) => {
    console.log(`The server is running on http://localhost:${port}`);
})

const socketIO = require('socket.io')
const io = socketIO(server);

// Web Sockets
io.on('connection',(socket)=>{
    console.log("Someone has been connect to "+ socket.id);
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data)
    });
    socket.on('chat:typing',(username)=>{
        
      socket.broadcast.emit('chat:typing', username)
    })
})