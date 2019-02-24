//call IO is a method that is available to us because of socket.io library
//here we will make a request to the server to open a connection
var socket =io();

socket.on('connect', function(){
    console.log('Conncected to server');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newEmail', function(email){
    console.log('New email', email);
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
});