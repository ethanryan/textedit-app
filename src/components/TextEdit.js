import React, { Component } from 'react';

import Yjs from '../components/Yjs.js';


// const Y = require('yjs')
//
// // Yjs plugins
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



class TextEdit extends Component {

  // componentWillReceiveProps(nextProps) {
  //   console.log('TextEdit - componentWillReceiveProps - nextProps is: ...', nextProps)
  //
  //   if (nextProps.showRoom !== this.props.showRoom) {
  //     console.log('0-->>>PROPS ARE DIFFERENT ~~~ WE GOTTA FIX IT!!!')
  //     console.log('0.nextProps.showRoom is: ', nextProps.showRoom)
  //     console.log('0.this.props.showRoom is: ', this.props.showRoom)
  //     // this.props.handleRoomChange(nextProps.showRoom) //passing 'newRoom' here to parent...
  //     //seeing what happens when we call this.... //this is onButtonClick...
  //   } //end if statement...
  // }
  //
  // shouldComponentUpdate(nextProps) {
  //   console.log('TextEdit - shouldComponentUpdate - nextProps is: ...', nextProps)
  //
  //   if (nextProps.showRoom !== this.props.showRoom) {
  //     console.log('1-->>>PROPS ARE DIFFERENT ~~~ WE GOTTA FIX IT!!!')
  //     console.log('1.nextProps.showRoom is: ', nextProps.showRoom)
  //     console.log('1.this.props.showRoom is: ', this.props.showRoom)
  //     console.log('returning TRUE')
  //     return true
  //     // this.props.handleRoomChange(nextProps.showRoom) //passing 'newRoom' here to parent...
  //     //seeing what happens when we call this.... //this is onButtonClick...
  //   } else {
  //     return false
  //   }
  // }

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
    console.log('TextEdit - render - this.props is: ', this.props)

    return (
      <div className='TextEdit-style'>

        <h3>
          TextEdit component - renders Yjs and textarea
        </h3>

        <p>
          <span style={this.props.handleColorBorder(this.props.showRoom)}>
            {this.props.showRoom ? this.props.showRoom : "room name goes here..."}
          </span>
        </p>

        <div>

          <Yjs
            showRoom={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
            handleColorBorder={this.props.handleColorBorder}
          />

          <textarea
            className="fullWidth"
            style={this.colorBorder(this.props.showRoom)}
            id={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
            // name={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
            // style={fullWidth}
            rows="4"
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
