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


//////below is for Yjs:::::

var Y = require('yjs')
require('y-memory')(Y) // extend Y with the memory module
require('y-websockets-client')(Y)
require('y-array')(Y)
require('y-map')(Y)
// ..
// do the same for all modules you want to use

Y({
  db: {
    name: 'memory' // store the shared data in memory
  },
  connector: {
    name: 'websockets-client', // use the websockets connector
    room: 'my room',            // Instances connected to the same room share data
    // url: 'localhost:1234' // specify your own server destination
    // url: 'localhost:3000' //localhost:3000 or localhost:8080, my node server??
    //if I don't specify options.connector.url, it connects to one of the servers Yjs provides...
  },
  share: { // specify the shared content
    map: 'Map',    // y.share.map is of type Y.Map
    array: 'Array' // y.share.array is of type Y.Array
  },
  sourceDir: '/bower_components' // where the modules are (browser only)
}).then(function (y) { //this returns a promise...
  /*
  At this point Yjs is successfully initialized.
  Try it out in your browser console!
  */
  window.y = y
  console.log('Yjs instance ready!!!!!!!!!!')
  y.share.map // is an Y.Map instance
  y.share.array // is an Y.Array instance
})
