const io = require('socket.io')();

io.on('connection', (client) => {
  //here can start emitting events to the client
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit( 'timer', new Date() );
    }, interval);
  });
})

const port = 8000;
io.listen(port);
console.log('server.js - listening on port: ', port);
