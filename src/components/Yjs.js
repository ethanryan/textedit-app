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




function getShowRoom(props) {
  console.log('getShowRoom called with props: ', props)
  var showRoom = props.showRoom
  console.log('getShowRoom, showRoom is: ', showRoom)
  return showRoom
}

class Yjs extends Component {

  // var currentRoomX = this.props.showRoom ? this.props.showRoom : "currentRoomX"
  // console.log('currentRoomX is: ', this.currentRoomX)

  // var xyz = this.props ? this.props.showRoom : "xyz here";
  // currentRoom = getShowRoom(this.props)
  // console.log('Yjs - xyz is: ', this.currentRoom)
  // console.log('Yjs - xyz is: ', xyz)

  componentDidMount() {
    console.log('Yjs - componentDidMount - this.props is: ', this.props)
    // var currentRoomX = this.props.showRoom
    // console.log('Yjs - componentDidMount - currentRoomX is: ', this.currentRoomX)
  } //componentDidMount



  render() {
    // var currentRoom = getShowRoom(this.props)
    var currentRoom = this.props.showRoom

    console.log('Yjs - render - this.props is: ', this.props)
    console.log('Yjs - render - this.currentRoom is: ', this.currentRoom)
    // console.log('Yjs - render - currentRoom is: ', this.currentRoom)
    // console.log('in Yjs, this.props is: ', this.props)


    var that = this; //setting 'this' to 'that' so scope of 'this' doesn't get lost in promise below

    // var currentRoom = this.props.showRoom;
    // console.log('Yjs - currentRoom is: ', this.currentRoom)

    let yThing = Y({
      db: {
        name: 'memory' // use the memory db adapter
      },
      connector: {
        name: 'websockets-client', // use the websockets-client connector
        // room: 'room3',
        // room: this.currentRoom, //this will get updated when handleRoomChange is called...
        room: this.props.showRoom, //this will get updated when handleRoomChange is called...
        socket: connection, //passing connection above as the socket...
        url: link // the connection endpoint (see y-websockets-server)
      },
      share: {
        textarea: 'Text' // y.share.textarea is of type Y.Text
      }
    }).then(function (y) {
      // bind the textarea to a shared text element
      // y.share.textarea.bind(document.getElementById(that.currentRoom))
      y.share.textarea.bind(document.getElementById(that.props.showRoom))
      // y.share.textarea.bind(document.querySelector('textarea')) //this will show only first room...
    })

    return (
      <div>

        <h3>
          Yjs component
        </h3>
        <p>
          Yjs: showRoom is --> {this.props.showRoom}
        </p>

        {this.yThing}

      </div>
    );
  }
}

export default Yjs;
