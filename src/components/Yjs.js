import React, { Component } from 'react';

const Y = require('yjs')

// Yjs plugins
require('y-memory')(Y)
require('y-array')(Y)
require('y-text')(Y)
require('y-websockets-client')(Y)

var io = Y['websockets-client'].io //need to get this.....


var link = 'http://localhost:1234'
// var link = 'https://textarea-yjs-websockets-server.herokuapp.com/'

// create a connection
var connection = io(link) //need to include LINK within io()...


// function getShowRoom(props) {
//   console.log('getShowRoom called with props: ', props)
//   var showRoom = props.showRoom
//   console.log('getShowRoom, showRoom is: ', showRoom)
//   return showRoom
// }



class Yjs extends Component {


  destroyUser() {
    console.log('calling destroyUser...')
    connection.destroy() //this works! server log shows 'user left', and updates to text don't sync on reconnect... (calling disconnect() instead of destroy() made updates still sync.)
    console.log('USER LEFT, connection DESTROYED.')
    console.log('after destroyUser - connection is: ', connection) // this is good info, should have looked at this before in console...
  }

  reconnectUser() {
    console.log('in reconnectUser - connection is: ', connection) // this is good info, should have looked at this before in console...
    // console.table(connection) // this is good info, should have looked at this before in console...
    // console.log('typeof connection is: ', typeof connection ) // this is good info, should have looked at this before in console...
    console.log('Object.getOwnPropertyNames(connection) is: ', Object.getOwnPropertyNames(connection) ) // this is good info, should have looked at this before in console...



    console.log('calling reconnectUser...')

    // connection._onConnect()

    // connection.io()
    // connection.reconnect() //this isn't a function...
    // connection.joinRoom() //this isn't a function...
    // connection.socket()
  }

  disconnectRoom = event => {
    const buttonValue = event.target.name
    console.log('Yjs - disconnectRoom called -->>> buttonValue: ', buttonValue)
    this.destroyUser() //calling function above...
  }

  reconnectRoom = event => {
    const buttonValue = event.target.name
    console.log('Yjs - reconnectRoom called -->> buttonValue: ', buttonValue)
    this.reconnectUser() //calling fuction above...
  }




  componentDidMount() {
    console.log('Yjs - componentDidMount - this.props is: ', this.props)
    console.log('yjs - componentDidMount - connection.id is: ', connection.id) // this is good info, should have looked at this before in console...

    // console.log('Yjs - componentDidMount - Y is: ', Y)
  } //componentDidMount

  render() {
    // var currentRoom = getShowRoom(this.props)
    console.log('yjs - render - connection is: ', connection) // this is good info, should have looked at this before in console...
    console.log('yjs - render - connection.id is: ', connection.id) // this is good info, should have looked at this before in console...
    console.log('yjs - render - connection.ids is: ', connection.ids) // this is good info, should have looked at this before in console...
    console.log('yjs - render - connection._yjs_connection_counter is: ', connection._yjs_connection_counter) // this is good info, should have looked at this before in console...
    console.log('yjs - render - connection.connected is: ', connection.connected) // this is good info, should have looked at this before in console...
    console.log('yjs - render - connection.json.connected is: ', connection.json.connected) // this is good info, should have looked at this before in console...
    console.log('Object.getOwnPropertyNames(connection) is: ', Object.getOwnPropertyNames(connection) ) // this is good info, should have looked at this before in console...
    ///note: above logs work after i update state.... try doing this somewhere besides render???

    console.log('Yjs - render - this.props is: ', this.props)

    var that = this; //setting 'this' to 'that' so scope of 'this' doesn't get lost in promise below

    Y({
      db: {
        name: 'memory' // use the memory db adapter
      },
      connector: {
        name: 'websockets-client', // use the websockets-client connector
        room: this.props.showRoom, // passing in room from props...
        socket: connection, // passing connection above as the socket...
        url: link // the connection endpoint (see y-websockets-server)
      },
      share: {
        textarea: 'Text' // y.share.textarea is of type Y.Text
      }
    }).then(function (y) {
      // bind the textarea to a shared text element
      // y.share.textarea.bind(document.getElementById(that.currentRoom))
      y.share.textarea.bind(document.getElementById(that.props.showRoom))
      console.log('HELLO from y ~?~?~?~?~??~?~??~?~?~~~?~??~?~?~?~?~?~?~?~?~?~?~??~~!!!')
      console.log('y is: ', y)
      console.log('typeof y is: ', typeof y)
      console.log('Object.getOwnPropertyNames(y) is: ', Object.getOwnPropertyNames(y) ) // this is good info, should have looked at this before in console...

      console.log('yjs - in promise - connection.id is: ', connection.id) // this is good info, should have looked at this before in console...
      // y.share.textarea.bind(document.querySelector('textarea')) //this will show only first room...
    })


    return (
      <div className="Yjs-style">

        <h3>
          Yjs component
        </h3>

        <p>
          <span style={this.props.handleColorBorder(this.props.showRoom)}>
            Yjs: {this.props.showRoom}
          </span>
        </p>

        <button onClick={this.disconnectRoom} name={this.props.showRoom}>
          Disconnect {this.props.showRoom}
        </button>

        <button onClick={this.reconnectRoom} name={this.props.showRoom}>
          Reconnect {this.props.showRoom}
        </button>

      </div>
    );
  }
}

export default Yjs;
