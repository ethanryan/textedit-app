import React, { Component } from 'react';

// import ReactQuill from 'react-quill'; // ES6
import Quill from 'quill/core';

import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow';

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';

// import * from 'https://cdn.quilljs.com/1.3.6/quill.snow.css';

Quill.register({
  'modules/toolbar': Toolbar,
  'themes/snow': Snow,
  'formats/bold': Bold,
  'formats/italic': Italic,
  'formats/header': Header
});


const Y = require('yjs')

// YjsQuill plugins
require('y-memory')(Y)
require('y-array')(Y)
require('y-richtext')(Y)
require('y-websockets-client')(Y)

var io = Y['websockets-client'].io //need to get this.....


// var link = 'http://localhost:1234' //when running textedit-app-yjs-websockets-server locally
// var link = 'http://localhost:5000' //when running `heroku local web`
var link = process.env.REACT_APP_YJS_HEROKU_URL //this link is set in my .env file, which is hidden from github

// create a connection
var connection = io(link) //need to include LINK within io()...



class YjsQuill extends Component {

  componentDidMount() {
    console.log('YjsQuill - componentDidMount - this.props is: ', this.props)
    console.log('YjsQuill - componentDidMount - this.props.showRoom is: ', this.props.showRoom)
  }


  render() {

    //console.logging connection details here won't show until state is updated...
    //note: above logs work after i update state.... -- moved to within promise!

    console.log('YjsQuill - render - this.props is: ', this.props)

    // var that = this; //setting 'this' to 'that' so scope of 'this' doesn't get lost in promise below

    console.log('YjsQuill -->>> connection in render is: ', connection)
    console.log('YjsQuill -->>> connection.connected in render is: ', connection.connected)
    console.log('YjsQuill -->>> connection.id in render is: ', connection.id)

    var connectionId = connection.id
    console.log('connectionId is: ', connectionId)

    if (this.props.connectionExists === false) {
      console.log('YjsQuill --->> this.props.connectionExists === false')
        // connection.destroy() //this works! server log shows 'user left', and updates to text don't sync on reconnect... (calling disconnect() instead of destroy() made updates still sync.)
        connection.disconnect()
        console.log('connection disconnected...')
        console.log('USER LEFT, connection DESTROYED.')
    } //end if statement

    //putting Y within a ternary operator, so it only gets rendered if connectionExists...
    if (this.props.connectionExists === true) {

      Y({
        db: {
          name: 'memory'
        },
        connector: {
          name: 'websockets-client', // use the websockets-client connector
          room: this.props.showRoom, // passing in room from props...
          socket: connection, // passing connection above as the socket...
          url: link // the connection endpoint (see y-websockets-server)
        },
        share: {
          richtext: 'Richtext' // y.share.richtext is of type Y.Richtext
        }
      }).then(function (y) {
        window.yquill = y

        window.quill = new Quill('#editor-container', {
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['image', 'code-block']
            ]
          },
          placeholder: 'Compose an epic...',
          theme: 'snow'  // or 'bubble'
        });
        // bind quill to richtext type
        //NOTE: NEED TO INCLUDE BELOW LINE:::::::
        y.share.richtext.bindQuill(window.quill)
      })
    } //end if statement


    return (
      <div className="YjsQuill-style">

        {/* <h3>
          YjsQuill component - connectionExists: {this.props.connectionExists ? "true" : "false"}
        </h3> */}

        <p>
          <span style={this.props.handleColorBorder(this.props.showRoom)}>
            YjsQuill: {this.props.showRoom}
          </span>
        </p>

      </div>
    );
  }
}

export default YjsQuill;
