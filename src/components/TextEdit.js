import React, { Component } from 'react';

import Yjs from '../components/Yjs.js';


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

  render() {
    console.log('TextEdit - render - this.props is: ', this.props)

    return (
      <div className='TextEdit-style'>

        <h3>
          TextEdit component - renders Yjs and textarea
        </h3>
        <p>
          (if Yjs renders TextArea, it creates an infinite loop)
        </p>

        <p>
          <span style={this.props.handleColorBorder(this.props.showRoom)}>
            {this.props.showRoom ? this.props.showRoom : "room name goes here..."}
          </span>
        </p>


          <Yjs
            showRoom={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
            handleColorBorder={this.props.handleColorBorder}
            connectionExists={this.props.connectionExists}
            setConnectionExistsToTrue={this.props.setConnectionExistsToTrue}
          />

          {/* <div style={this.props.connectionExists === true ? this.props.handleDisplayNone() : null}> */}

          {this.props.connectionExists === true ?
          <div>
            <textarea
              className="fullWidth"
              style={this.props.handleColorBorder(this.props.showRoom)}
              id={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
              // name={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
              // style={fullWidth}
              rows="4"
              cols="80"
              placeholder="textarea inside TextEditContainer..."
              >
              </textarea>
          </div>
          :
          <h4>
            No connection.
          </h4>
        }


        </div>
      );
    }
  }

  export default TextEdit;
