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
var connection  //just setting variable for now...
// var connection = io(link) //need to include LINK within io()...


// function getShowRoom(props) {
//   console.log('getShowRoom called with props: ', props)
//   var showRoom = props.showRoom
//   console.log('getShowRoom, showRoom is: ', showRoom)
//   return showRoom
// }



class Yjs extends Component {

  componentDidMount() {
    console.log('Yjs - componentDidMount - this.props is: ', this.props)
    console.log('Yjs - componentDidMount - this.props.showRoom is: ', this.props.showRoom)
  }

  createConnection() {
    //if this.props.showRoom isn't empty string, return connection...
    if (this.props.connectionExists === true) {
      connection = io(link) //need to include LINK within io()...
    } else {
      connection = null
    }
    console.log('in createConnection, connection is: ', connection)
    return connection
  }

  destroyUser() {
    console.log('calling destroyUser...')
    connection.destroy() //this works! server log shows 'user left', and updates to text don't sync on reconnect... (calling disconnect() instead of destroy() made updates still sync.)
    console.log('USER LEFT, connection DESTROYED.')
    // this.props.setConnectionExistsToTrue() //calling destroyUser disconnectes user AND hides the textarea
    console.log('after destroyUser - connection is: ', connection) // this is good info, should have looked at this before in console...
  }

  disconnectUser() {
    console.log('calling disconnectuser...')
    connection.disconnect()
    console.log('CONNECTION DESTROYED') //works, but updating state in anyway makes user rejoin... (including hiding textarea...)
    // this.props.setConnectionExistsToTrue() //calling disconnectUser disconnects user AND hides the textarea
  }

  reconnectUser() {
    console.log('in reconnectUser - connection is: ', connection) // this is good info, should have looked at this before in console...
    console.log('in reconnectUser - io is:::::::::::: ', io) // this is good info, should have looked at this before in console...
    // console.table(connection) // this is good info, should have looked at this before in console...
    // console.log('typeof connection is: ', typeof connection ) // this is good info, should have looked at this before in console...
    // console.log('Object.getOwnPropertyNames(connection) is: ', Object.getOwnPropertyNames(connection) ) // this is good info, should have looked at this before in console...
    // console.log('Object.getOwnPropertyNames(connection._callbacks) is: ', Object.getOwnPropertyNames(connection._callbacks) ) // this is good info, should have looked at this before in console...
    // console.log('Object.getOwnPropertyNames(connection._callbacks.connect) is: ', Object.getOwnPropertyNames(connection._callbacks.connect) ) // this is good info, should have looked at this before in console...
    // console.log('Object.getOwnPropertyNames(connection._callbacks.connect[1]) is: ', Object.getOwnPropertyNames(connection._callbacks.connect[1]) ) // this is good info, should have looked at this before in console...
    // console.log('Object.getOwnPropertyNames(connection._callbacks.connect[1].name) is: ', Object.getOwnPropertyNames(connection._callbacks.connect[1].name) ) // this is good info, should have looked at this before in console...
    // console.log('Object.getOwnPropertyNames(connection._callbacks.connect[1].prototype) is: ', Object.getOwnPropertyNames(connection._callbacks.connect[1].prototype) ) // this is good info, should have looked at this before in console...

    console.log('calling reconnectUser...')
    // connection.connect() //doesn't say not a function, but nothing happens with this....

    this.createConnection()
  }

  destroyUserClicked = event => {
    const buttonValue = event.target.name
    console.log('Yjs - destroyUserClicked called -->>> buttonValue: ', buttonValue)
    this.destroyUser() //calling function above...
  }

  disconnectRoomClicked = event => {
    const buttonValue = event.target.name
    console.log('Yjs - disconnectRoomClicked called -->>> buttonValue: ', buttonValue)
    this.disconnectUser() //calling function above...
  }

  reconnectRoomClicked = event => {
    const buttonValue = event.target.name
    console.log('Yjs - reconnectRoomClicked called -->> buttonValue: ', buttonValue)
    this.reconnectUser() //calling fuction above...
  }


  // componentDidMount() {
  //   console.log('Yjs - componentDidMount - this.props is: ', this.props)
  // } //componentDidMount

  render() {


        // connection = this.createConnection()
        console.log('>>>>>>>> connection in here is: ', connection)

    // var currentRoom = getShowRoom(this.props)

    //console.logging connection details here won't show until state is updated...
    //note: above logs work after i update state.... -- moved to within promise!

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
      // y.share.textarea.bind(document.querySelector('textarea')) //this will show only first room...

      console.log('HELLO from y promise!!!')
      console.log('y is: ', y)
      console.log('y.connector.userId is: ', y.connector.userId)
      console.log('y.db.userId is: ', y.db.userId) //same as above...
      // console.log('yjs - in promise - Object.getOwnPropertyNames(y) is: ', Object.getOwnPropertyNames(y) ) // this is good info, should have looked at this before in console...
      // console.log('y.connected is: ', y.connected)

      console.log('y - if connectionExists is false, destroy connection...')
      if (that.props.connectionExists === false) {
        y.destroy()
        console.log('called y.DESTROY')
      }


      // setTimeout(function(){
      //   console.log('***** 0. helllllooooo after two seconds...')
      //   console.log('calling y.destroy...')
      //   y.destroy()
      //   console.log('CALLED y.destroy....')
      // }, 2000);



      // console.log('calling y.destroy...')
      // y.destroy()
      // console.log('CALLED y.destroy....')

      // console.log('calling y.connector.userJoined...')
      // y.connector.userJoined() //Unhandled Rejection (Error): You must specify the role of the joined user!
      // y.connector.userJoined(y.connector.userId, 'slave') //Unhandled Rejection (Error): You must specify the role of the joined user!

      console.log('calling y.reconnect...')
      console.log('YO----->>>>> y.options.connector.room: ', y.options.connector.room)

      // setTimeout(function(){console.log('***** 1. helllllooooo after two seconds...')}, 2000);

      // y.connector.connect()
      // y.connector._onConnect()

      // setTimeout(function(){
      //   console.log('***** 2. helllllooooo after three seconds...')
      //   y.connector._onConnect('joinRoom', y.options.connector.room)
      //   console.log('called y.connector._onConnect() ...')
      // }, 3000);

      // y.connector._onConnect('joinRoom', y.options.connector.room)
      // console.log('called y.connector._onConnect() ...')



      // y.joinRoom() //Unhandled Rejection (Error): You must specify the role of the joined user!

      // console.log('yjs - in promise - connection is: ', connection) // this is good info, should have looked at this before in console...

      // console.log('calling y.destroy...')
      // y.destroy()
      // console.log('CALLED y.destroy....')

      //maybe add an if conditional here, for disabling IF ... something or other...
      //so user is in only one room at a time...
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

        <button onClick={this.destroyUserClicked} name={this.props.showRoom}>
          Destroy User in {this.props.showRoom}
        </button>

        <button onClick={this.disconnectRoomClicked} name={this.props.showRoom}>
          Disconnect {this.props.showRoom}
        </button>

        <button onClick={this.reconnectRoomClicked} name={this.props.showRoom}>
          Reconnect {this.props.showRoom}
        </button>

      </div>
    );
  }
}

export default Yjs;
