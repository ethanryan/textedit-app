import React, { Component } from 'react';

import Yjs from '../components/Yjs.js';


class TextEdit extends Component {

  render() {
    console.log('TextEdit - render - this.props is: ', this.props)

    return (
      <div className='TextEdit-style'>

        {/* <h3>
          TextEdit component - renders Yjs and textarea
        </h3>

        <p>
          (if Yjs renders TextArea, it creates an infinite loop)
        </p> */}

        <p>
          <span style={this.props.handleColorBorder(this.props.showRoom)}>
            TextEdit: {this.props.showRoom ? this.props.showRoom : "room name goes here..."}
          </span>
        </p>


        <Yjs
          showRoom={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
          handleColorBorder={this.props.handleColorBorder}
          connectionExists={this.props.connectionExists}
        />

        {this.props.connectionExists === true ?
          <div>
            <textarea
              className="fullWidth"
              style={this.props.handleColorBorder(this.props.showRoom)}
              id={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
              rows="4"
              cols="80"
              placeholder="textarea inside TextEditContainer..."
              >
            </textarea>
          </div>
          :
          <h4>
            Textarea here when connection exists.
          </h4>
          }

        </div>
      );
    }
  }

  export default TextEdit;
