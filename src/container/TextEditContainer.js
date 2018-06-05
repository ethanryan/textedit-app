import React, { Component } from 'react';

// import Clock from '../components/Clock.js';
import TextEdit from '../components/TextEdit.js';

// import io from "socket.io-client"; //this and below via: https://blog.cloudboost.io/creating-a-chat-web-app-using-express-js-react-js-socket-io-1b01100a8ea5

// const socket = io('localhost:8080'); //initiate the request to open a socket connection with our Express server, in server.js

// const Y = require('yjs')

// Yjs plugins
// require('y-memory')(Y)
// require('y-array')(Y)
// require('y-text')(Y)
// require('y-websockets-client')(Y) //i imagine i need to require this too...
// //will also need a connector here... not y-ipfs-connector, but something with socket.io
//
// var io = Y['websockets-client'].io //need to get this.....
//
//
// var link = 'http://localhost:1234'
// // var link = 'https://textarea-yjs-websockets-server.herokuapp.com/'
//
// // create a connection
// var connection = io(link) //need to include LINK within io()...


// //for room1::::::::
// //for room1::::::::
// //for room1::::::::
// Y({
//   db: {
//     name: 'memory' // use the memory db adapter
//   },
//   connector: {
//     name: 'websockets-client', // use the websockets-client connector
//     // room: 'Textarea-example-dev',
//     room: 'room1',
//     socket: connection, //passing connection above as the socket...
//     url: link // the connection endpoint (see y-websockets-server)
//   },
//   share: {
//     textarea: 'Text' // y.share.textarea is of type Y.Text
//   }
// }).then(function (y) {
//   // bind the textarea to a shared text element
//   y.share.textarea.bind(document.getElementById('room1'))
//   // y.share.textarea.bind(document.querySelector('textarea'))
// })
//
// ///for room2::::::::
// ///for room2::::::::
// ///for room2::::::::
// Y({
//   db: {
//     name: 'memory' // use the memory db adapter
//   },
//   connector: {
//     name: 'websockets-client', // use the websockets-client connector
//     room: 'room2',
//     socket: connection, //passing connection above as the socket...
//     url: link // the connection endpoint (see y-websockets-server)
//   },
//   share: {
//     textarea: 'Text' // y.share.textarea is of type Y.Text
//   }
// }).then(function (y) {
//   // bind the textarea to a shared text element
//   y.share.textarea.bind(document.getElementById('room2'))
//   // y.share.textarea.bind(document.querySelector('textarea'))
// })







class TextEditContainer extends Component {
  constructor() {
    super()
    this.state = {
      timestamp: '',
      text: '',
      choice: '',
      // room1: '', //this or text, above??
      // room2: '', //this or text, above??
      // showRoom: '', //default
      showRoom: 'room1', //default
    };
    // this.handleTextChange = this.handleTextChange.bind(this)
    this.onChoiceClick = this.onChoiceClick.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
  } //end constructor

  // componentDidMount() {
  //   // console.log('after componentDidMount - in TextEditContainer, this.state is: ', this.state)
  // } //componentDidMount

  // handleTextChange = event => {
  //   console.log('text event.target.name: ', event.target.name); // the name of the element (ex: 'room1')
  //   // console.log('Text event.target.value', event.target.value); // the value of the element
  //   // this.setState({text: event.target.value});
  //   const textValue = event.target.value
  //   this.setState({ [event.target.name]: textValue });
  // }

  onChoiceClick = event => {
    // console.log('button event.target.name: ', event.target.name)
    const buttonValue = event.target.name
    console.log('buttonValue: ', buttonValue)
    this.setState({ choice: buttonValue });
    console.log('setState to choice: ', buttonValue)
  }

  onButtonClick = event => {
    // console.log('button event.target.name: ', event.target.name)
    const buttonValue = event.target.name
    console.log('buttonValue: ', buttonValue)
    this.setState({ showRoom: buttonValue });
    console.log('setState to showRoom: ', buttonValue)
  }

  colorBorder(string) {
    var colorBorder
    if (string === 'room1') {
      colorBorder = {border:'2px solid blue',}
    }
    if (string === 'room2') {
      colorBorder = {border:'2px solid red',}
    }
    if (string === 'room3') {
      colorBorder = {border:'2px solid yellow',}
    }
    return colorBorder
  }


  render() {

    const blueButton = {
      border:'2px solid blue',
    }
    const redButton = {
      border:'2px solid red',
    }
    const yellowButton = {
      border:'2px solid yellow',
    }

    console.log('in TextEditContainer, this.state is: ', this.state)
    return (
      <div>

        <h2>
          Here's the TextEditContainer.
        </h2>

        {/* <Clock
          timestamp={this.state.timestamp}
        /> */}


        <button id="a" name="a" onClick={this.onChoiceClick}   style={blueButton}>Choice A</button>
        <button id="b" name="b" onClick={this.onChoiceClick}    style={redButton}>Choice B</button>
        <button id="c" name="c" onClick={this.onChoiceClick} style={yellowButton}>Choice C</button>

        <p>
          Choice: {this.state.choice ? this.state.choice : 'chosen one here'}
        </p>

        <button id="showRoom1" name="room1" onClick={this.onButtonClick}   style={blueButton}>Show Room 1</button>
        <button id="showRoom2" name="room2" onClick={this.onButtonClick}    style={redButton}>Show Room 2</button>
        <button id="showRoom3" name="room3" onClick={this.onButtonClick} style={yellowButton}>Show Room 3</button>

        <p>
          Active Room: <span style={this.colorBorder(this.state.showRoom)}>
            {this.state.showRoom}
          </span>
        </p>

        <div style={this.colorBorder(this.state.showRoom)}>
          <TextEdit
            // textFromContainer={this.state.text}
            // valueFromContainer={this.state.text}
            // handleTextChange={this.handleTextChange}

            showRoom={this.state.showRoom} //this is only prop that TextEdit needs!!!
            // idFromContainer={'room3'} //this is only prop that TextEdit needs!!!
          />
        </div>

          <TextEdit
            showRoom={'room2'} //this is only prop that TextEdit needs!!!
          />

          <TextEdit
            showRoom={'room3'} //this is only prop that TextEdit needs!!!
          />

      </div>
    );
  }
}

export default TextEditContainer;
