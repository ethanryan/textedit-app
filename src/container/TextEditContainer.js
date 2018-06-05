import React, { Component } from 'react';

import Clock from '../components/Clock.js';
import TextEdit from '../components/TextEdit.js';
// import io from "socket.io-client"; //this and below via: https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5

// const socket = io('localhost:8080'); //initiate the request to open a socket connection with our Express server, in server.js

const Y = require('yjs')

// Yjs plugins
require('y-memory')(Y)
require('y-array')(Y)
require('y-text')(Y)
require('y-websockets-client')(Y) //i imagine i need to require this too...
//will also need a connector here... not y-ipfs-connector, but something with socket.io

var io = Y['websockets-client'].io //need to get this.....


var link = 'http://localhost:1234'
// var link = 'https://textarea-yjs-websockets-server.herokuapp.com/'

// create a connection
var connection = io(link) //need to include LINK within io()...

///for room1::::::::
///for room1::::::::
///for room1::::::::
Y({
  db: {
    name: 'memory' // use the memory db adapter
  },
  connector: {
    name: 'websockets-client', // use the websockets-client connector
    room: 'Textarea-example-dev',
    socket: connection, //passing connection above as the socket...
    url: link // the connection endpoint (see y-websockets-server)
  },
  share: {
    textarea: 'Text' // y.share.textarea is of type Y.Text
  }
}).then(function (y) {
  // bind the textarea to a shared text element
  y.share.textarea.bind(document.getElementById('room1'))
})

///for room2::::::::
///for room2::::::::
///for room2::::::::
Y({
  db: {
    name: 'memory' // use the memory db adapter
  },
  connector: {
    name: 'websockets-client', // use the websockets-client connector
    room: 'room2',
    socket: connection, //passing connection above as the socket...
    url: link // the connection endpoint (see y-websockets-server)
  },
  share: {
    textarea: 'Text' // y.share.textarea is of type Y.Text
  }
}).then(function (y) {
  // bind the textarea to a shared text element
  y.share.textarea.bind(document.getElementById('room2'))
})







class TextEditContainer extends Component {
  constructor() {
    super()
    this.state = {
      timestamp: '',
      text: '',
      room1: '',
      room2: '',
    };
  } //end constructor

  componentDidMount() {
    // socket.on('time', timeString => {
    //   // console.log('timeString is::::', timeString)
    //   this.setState({timestamp: timeString})
    // });
  } //componentDidMount

  handleTextChange = event => {
    // this.setState({text: event.target.value});
    this.setState({ [event.target.name]: event.target.value });
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

        {/* <form action="" id="myFormEdit"> */}
        <div>
        Room 1:
          <textarea
            id="room1"
            rows="10"
            cols="80"
            placeholder="textarea inside TextEditContainer..."
            value={this.state.room1}
            onChange={this.handleTextChange}
            name="room1"
            >
          </textarea>
        </div>

          Room 2:
          <textarea
            id="room2"
            rows="10"
            cols="80"
            placeholder="textarea inside TextEditContainer..."
            value={this.state.room2}
            onChange={this.handleTextChange}
            name="room2"
            >
          </textarea>

        {/* </form> */}

          <TextEdit
            textFromContainer={this.state.text}
          />

          {/* <textarea
            rows="5" cols="50"
            value={this.state.text}
            readOnly
            >
            </textarea> */}

          </div>
        );
      }
    }

    export default TextEditContainer;
