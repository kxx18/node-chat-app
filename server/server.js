const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
//middleware to serve publicPath
app.use(express.static(publicPath));

//lets you register an event listener,, listen for a new connection
///you can listen for a new conncetion and do somthing when that connection comes in
//provide a callback function to hande the connectio
io.on('connection', function(socket){
    console.log('New user connected');
    //socket.emit from Admin text Welcome to thte caht app
    socket.emit('newMessage', generateMessage('Admint', 'Welcome to the chat app'));

    //socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));
    
    socket.on('createMessage', (message, callback)=>{
        console.log('createMessage', message);
        //emits an event to every single connection
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
     
    });
    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    });

    socket.on('disconnect', ()=>{
        console.log('User was disconnected');
    });
});

server.listen(3000, ()=>{
    console.log(`Server is up on port ${port}`);
}); //112


