import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

export function subscribeToTimer(callback) {
  socket.on('timer', timestamp => callback(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

/////trying this below:::
/////trying this below:::
/////trying this below:::
export function subscribeToFormEdit(callback) {
  console.log('subscribeToFormEdit called, callback is: ', callback)
  socket.on('textarea update', function(msg) {
    console.log('textarea update... msg is: ', msg)
    // textareaEdit.value = msg; //whenever a 'chat message' is emitted, the entire textarea (id=message) will be updated with the entire msg received
  });
  // socket.emit('textarea update', textareaEdit.value); //below 'chat message' must match what is emitted here, i.e.: 'chat message' (emits sends the message to everyone, including the sender)
}

//textarea below
// var myFormEdit = document.getElementById("myFormEdit");
// var textareaEdit = document.getElementById("textareaEdit"); //this is the textarea within the form
