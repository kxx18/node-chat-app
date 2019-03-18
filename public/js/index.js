//call IO is a method that is available to us because of socket.io library
//here we will make a request to the server to open a connection
var socket =io();

socket.on('connect', function(){
    console.log('Conncected to server');
});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function(data){
//     console.log('Got it', data);
// });

//function ^ fires when acknowledgment arrives at the client

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
       from: 'User',
       text: $('[name=message]').val() 
    }, function(){

    });
});