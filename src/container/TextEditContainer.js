import React, { Component } from 'react';

import io from "socket.io-client"; //this and below via: https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5

import Clock from '../components/Clock.js';
// import TextEdit from '../components/TextEdit.js';

const socket = io('localhost:8080'); //initiate the request to open a socket connection with our Express server, in server.js

class TextEditContainer extends Component {
  constructor() {
    super()
    this.state = {
      timestamp: 'no timestamp yet',
      text: '',
    };
    // this.socket = io('localhost:8080'); //better here, or above as a const?
  } //end constructor

  componentDidMount() {
    socket.on('time', timeString => {
      console.log('timeString is::::', timeString)
      this.setState({timestamp: timeString})
    });
  } //componentDidMount

  componentDidUpdate() { //does it help to have below in componentDidUpdate???
    this.handleTextChange = event => {
      event.preventDefault(); //need preventDefault???
      socket.emit('TEXTAREA_UPDATE', event.target.value); //below 'TEXTAREA_UPDATE' must match what is emitted here, i.e.: 'TEXTAREA_UPDATE' (emit sends the TEXTAREA_UPDATE to everyone, including the sender)
      // this.setState({text: event.target.value});
      socket.on('TEXTAREA_UPDATE', textAreaEdit => {
        this.setState({text: textAreaEdit}) //whenever a 'TEXTAREA_UPDATE' is emitted, the entire textarea (this.state.text) will be updated with the entire textAreaEdit received
      });
    }
  } //componentDidUpdate

  render() {
    console.log('in TextEditContainer, this.state is: ', this.state)
    return (
      <div>

        <h2>
          Here's the TextEditContainer.
        </h2>

        <Clock
          timestamp={this.state.timestamp}
        />

        <form action="" id="myFormEdit">
          <textarea id="textareaEdit"
            rows="20" cols="80"
            placeholder="textarea inside TextEditContainer..."
            value={this.state.text}
            onChange={this.handleTextChange}
            >
          </textarea>

        </form>

          <textarea
            rows="5" cols="50"
            value={this.state.text}
            readOnly
            >
          </textarea>

      </div>
    );
  }
}

export default TextEditContainer;
