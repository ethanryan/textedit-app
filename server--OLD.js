//original way I got this working, via blog post: https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34

const io = require('socket.io')();

io.on('connection', (client) => {
  console.log('a user connected'); //adding
  client.on('disconnect', function() { //adding
    console.log('user disconnected'); //adding
  }); //adding

  //here can start emitting events to the client
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit( 'timer', new Date() );
    }, interval);
  });
})

//below is for textarea update in myFormEdit
io.on('connection', function(socket) {
  socket.on('textarea update', function(msg) {
    console.log('textarea update: ' + msg);
  });
});

io.on('connection', function(socket) {
  socket.on('textarea update', function(msg) {
    io.emit('textarea update', msg);
  });
});

const port = 8000;
io.listen(port);
console.log('server.js - listening on port: ', port);

////////old way i was doing it above.....
////////old way i was doing it above.....
////////old way i was doing it above.....
