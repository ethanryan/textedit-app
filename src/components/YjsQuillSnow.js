import React, { Component } from 'react';

// import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css'; //need to import this for snow CSS to display correctly...

import Quill from 'quill/core'; //must be from core for functions to work!!!
import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow'; //snow works, but need to import and register formats, and replace icons...

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';
import Underline from 'quill/formats/underline';
import Link from 'quill/formats/link';
import List, { ListItem } from 'quill/formats/list';

import Icons from 'quill/ui/icons'; //need to import icons, then replace them...


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

        Quill.register({
          'modules/toolbar': Toolbar,
          'themes/snow': Snow,
          'formats/bold': Bold,
          'formats/italic': Italic,
          'formats/header': Header,
          'formats/underline': Underline,
          'formats/link': Link,
          'formats/list': List,
          'formats/list/item': ListItem,
          'ui/icons': Icons
        });

        var icons = Quill.import('ui/icons');
        icons['bold'] = '<i class="fa fa-bold" aria-hidden="true"></i>';
        icons['italic'] = '<i class="fa fa-italic" aria-hidden="true"></i>';
        icons['underline'] = '<i class="fa fa-underline" aria-hidden="true"></i>';
        icons['link'] = '<i class="fa fa-link" aria-hidden="true"></i>';
        icons['clean'] = '<i class="fa fa-eraser" aria-hidden="true"></i>'; // making this an eraser for now because i can't find the font awesome equivalent of the Tx / clear / clean icon...

        window.quill = new Quill('#editor', {
          theme: 'snow' //this needs to come after the above, which registers Snow...
        });

        //replacing unrendered svg string in dropdown with an empty string, then adding sort icon in css...
        var dropdown = document.getElementsByClassName('ql-picker-label'); //changing text here, can't do it in css...
        dropdown[0].innerText = "";

        //lists both have same class, but different values, so changing them here...
        var list = document.getElementsByClassName('ql-list');
        list[0].innerHTML = '<i class="fa fa-list-ol" aria-hidden="true"></i>' //ordered list
        list[1].innerHTML = '<i class="fa fa-list-ul" aria-hidden="true"></i>' //unordered list
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
