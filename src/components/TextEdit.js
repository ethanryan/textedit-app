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

///for room3::::::::
///for room3::::::::
///for room3::::::::
// Y({
//   db: {
//     name: 'memory' // use the memory db adapter
//   },
//   connector: {
//     name: 'websockets-client', // use the websockets-client connector
//     // room: 'room3',
//     room: this.props.showRoom,
//     socket: connection, //passing connection above as the socket...
//     url: link // the connection endpoint (see y-websockets-server)
//   },
//   share: {
//     textarea: 'Text' // y.share.textarea is of type Y.Text
//   }
// }).then(function (y) {
//   // bind the textarea to a shared text element
//   // y.share.textarea.bind(document.getElementById('room3'))
//   y.share.textarea.bind(document.getElementById(this.props.showRoom))
//   // y.share.textarea.bind(document.querySelector('textarea'))
// })





class TextEdit extends Component {

  componentDidMount() {
    console.log('TextEdit - componentDidMount - this.props is: ...', this.props)
    var that = this; //setting 'this' to 'that' so scope of 'this' doesn't get lost in promise below

    Y({
      db: {
        name: 'memory' // use the memory db adapter
      },
      connector: {
        name: 'websockets-client', // use the websockets-client connector
        // room: 'room3',
        room: this.props.showRoom,
        socket: connection, //passing connection above as the socket...
        url: link // the connection endpoint (see y-websockets-server)
      },
      share: {
        textarea: 'Text' // y.share.textarea is of type Y.Text
      }
    }).then(function (y) {
      // bind the textarea to a shared text element
      y.share.textarea.bind(document.getElementById(that.props.showRoom))
      // y.share.textarea.bind(document.querySelector('textarea'))
    })

  } //componentDidMount

  componentWillReceiveProps(nextProps) {
    console.log('TextEdit - componentWillReceiveProps - nextProps is: ...', nextProps)
    if (nextProps !== this.props) {
      console.log('PROPS ARE DIFFERENT ~~~ FUCK WE GOTTA DO SOMETHING!!!!')
    }
    //   var that = this; //setting 'this' to 'that' so scope of 'this' doesn't get lost in promise below
    //
    //   Y({
    //     db: {
    //       name: 'memory' // use the memory db adapter
    //     },
    //     connector: {
    //       name: 'websockets-client', // use the websockets-client connector
    //       // room: 'room3',
    //       room: nextProps.showRoom, //not sure about this.... <<<<<------------------------
    //       socket: connection, //passing connection above as the socket...
    //       url: link // the connection endpoint (see y-websockets-server)
    //     },
    //     share: {
    //       textarea: 'Text' // y.share.textarea is of type Y.Text
    //     }
    //   }).then(function (y) {
    //     // bind the textarea to a shared text element
    //     y.share.textarea.bind(document.getElementById(that.props.showRoom)) //not sure about this....  <<<<<------------------------
    //     // y.share.textarea.bind(document.querySelector('textarea'))
    //   })
    // }
  }

  render() {
    console.log('in TextEdit, this.props is: ', this.props)

    return (
      <div>

        <h3>
          Here's the TextEdit component.
        </h3>

        <div>
        <span>
          # {this.props.showRoom ? this.props.showRoom : "room number goes here..."}:
        </span>

          <textarea
            id={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
            // name={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
            rows="2"
            cols="80"
            placeholder="textarea inside TextEditContainer..."
            >
          </textarea>

        </div>

        {/* <div>
        Room 1: //this.props.room or whatever...
          <textarea
            id="room1"
            rows="2"
            cols="80"
            placeholder="textarea inside TextEditContainer..."
            // value={this.state.text}
            value={this.state.room1}
            onChange={this.handleTextChange}
            name="room1"
            >
          </textarea>
        </div> */}

      </div>
    );
  }
}

export default TextEdit;
