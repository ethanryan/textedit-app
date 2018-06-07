import React, { Component } from 'react';

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



class TextEdit extends Component {

  componentDidMount() {
    console.log('TextEdit - componentDidMount - this.props is: ', this.props)
    // var that = this; //setting 'this' to 'that' so scope of 'this' doesn't get lost in promise below
    var currentRoom = this.props.showRoom;

    Y({
      db: {
        name: 'memory' // use the memory db adapter
      },
      connector: {
        name: 'websockets-client', // use the websockets-client connector
        // room: 'room3',
        room: currentRoom, //this will get updated when handleRoomChange is called...
        socket: connection, //passing connection above as the socket...
        url: link // the connection endpoint (see y-websockets-server)
      },
      share: {
        textarea: 'Text' // y.share.textarea is of type Y.Text
      }
    }).then(function (y) {
      // bind the textarea to a shared text element
      y.share.textarea.bind(document.getElementById(currentRoom))
      // y.share.textarea.bind(document.querySelector('textarea')) //this will show only first room...
    })

  } //componentDidMount

  componentWillReceiveProps(nextProps) {
    console.log('TextEdit - componentWillReceiveProps - nextProps is: ...', nextProps)

    if (nextProps.showRoom !== this.props.showRoom) {
      console.log('0-->>>PROPS ARE DIFFERENT ~~~ WE GOTTA FIX IT!!!')
      console.log('0.nextProps.showRoom is: ', nextProps.showRoom)
      console.log('0.this.props.showRoom is: ', this.props.showRoom)
      // this.props.handleRoomChange(nextProps.showRoom) //passing 'newRoom' here to parent...
      //seeing what happens when we call this.... //this is onButtonClick...
    } //end if statement...
  }

  shouldComponentUpdate(nextProps) {
    console.log('TextEdit - shouldComponentUpdate - nextProps is: ...', nextProps)

    if (nextProps.showRoom !== this.props.showRoom) {
      console.log('1-->>>PROPS ARE DIFFERENT ~~~ WE GOTTA FIX IT!!!')
      console.log('1.nextProps.showRoom is: ', nextProps.showRoom)
      console.log('1.this.props.showRoom is: ', this.props.showRoom)
      console.log('returning TRUE')
      return true
      // this.props.handleRoomChange(nextProps.showRoom) //passing 'newRoom' here to parent...
      //seeing what happens when we call this.... //this is onButtonClick...
    } else {
      return false
    }
  }

  render() {
    // console.log('in TextEdit, this.props is: ', this.props)

    const fullWidth = {
      width:'100%',
    }

    return (
      <div>

        <h3>
          TextEdit component
        </h3>

        <p>
          {this.props.showRoom ? this.props.showRoom : "room number goes here..."}
        </p>

        <div>

          <textarea
            id={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
            // name={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
            style={fullWidth}
            rows="2"
            cols="80"
            placeholder="textarea inside TextEditContainer..."
            >
            </textarea>

          </div>

        </div>
      );
    }
  }

  export default TextEdit;
