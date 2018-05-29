import React, { Component } from 'react';

// import socketIOClient from 'socket.io-client' //need to import this??????

import * as api from '../api'

import Clock from '../components/Clock.js';
// import TextEdit from '../components/TextEdit.js';

const io = require('socket.io-client') //initiate the request to open a socket connection with our Express server
// const socket = io() //initiate the request to open a socket connection with our Express server

class TextEditContainer extends Component {
  constructor() {
    super()
    this.state = {
      timestamp: 'no timestamp yet',
      text: '',
      allMessages: ''
    };
  }

  componentDidMount() {
    api.subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));

    api.subscribeToFormEdit((err, text) => this.setState({
      text
    }));

    ////below here, who knows....

    var socket = io();

    //clock below
    var el = document.getElementById('server-time');
    socket.on('time', function(timeString) {
      el.innerHTML = 'Server time: ' + timeString;
    });

    //textarea below
    var myFormEdit = document.getElementById("myFormEdit");
    var textareaEdit = document.getElementById("textareaEdit"); //this is the textarea within the form

    myFormEdit.addEventListener("keyup", function(event) {
      event.preventDefault();
      socket.emit('textarea update', textareaEdit.value); //below 'chat message' must match what is emitted here, i.e.: 'chat message' (emits sends the message to everyone, including the sender)
      return false;
    });

    socket.on('textarea update', function(msg) {
      textareaEdit.value = msg; //whenever a 'chat message' is emitted, the entire textarea (id=message) will be updated with the entire msg received
    });

  } //componentDidMount

  // componentDidUpdate() {
  //   api.broadcastMessage((message, allMessages) => this.setState({
  //     allMessages
  //     // console.log('broadcastMessage called in TextEditContainer!!!....')
  //     // members.forEach(m => m.emit('message', message))
  //   }))
  // }

  handleTextChange = event => {
    this.setState({
      text: event.target.value,
    });

  // handleButtonClicked = event => {
  //   console.log('buttonClicked!!!')
  // }

    // api.broadcastMessage((allMessages) => this.setState({
    //   allMessages: event.target.value,
    //   // console.log('broadcastMessage called in TextEditContainer!!!....')
    //   // members.forEach(m => m.emit('message', message))
    // }))

  }

  render() {
    // console.log('in TextEditContainer, this.state is: ', this.state)
    return (
      <div>

        <h2>
          Here's the TextEditContainer.
        </h2>

        <Clock
          timestamp={this.state.timestamp}
        />

        <button
          // onClick={(e) => this.handleButtonClicked(e)}
        >
          click this shit
      </button>

        <form action="" id="myFormEdit">
          <textarea id="textareaEdit"
            rows="10" cols="50"
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

            {/* <TextEdit
              text={this.state.text}
              handleTextChange={this.handleTextChange.bind(this)}
            /> */}

          </div>
        );
      }
    }

    export default TextEditContainer;
