//trying this, via this blog post: https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5

var express = require('express');
var socket = require('socket.io');

var app = express();

server = app.listen(8080, function() {
  console.log('server is running on port 8080')
});

io = socket(server);

setInterval(() => io.emit('time', new Date().toTimeString()), 1000); //pushing out the current time on the server once a second, without waiting for a client's request

// io.on('connection', (socket) => {
//   console.log(socket.id);
//
//   socket.on('SEND_MESSAGE', function(data){
//     io.emit('RECEIVE_MESSAGE', data);
//   })
// });

io.on('connection', function(socket) {
  console.log('socket.id is: ', socket.id);
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

//below is for textarea update in myFormEdit
io.on('connection', function(socket) {
  socket.on('TEXTAREA_UPDATE', function(msg) {
    console.log('TEXTAREA_UPDATE is: ', msg);
  });
});

io.on('connection', function(socket) {
  socket.on('TEXTAREA_UPDATE', function(msg) {
    io.emit('TEXTAREA_UPDATE', msg);
  });
});
