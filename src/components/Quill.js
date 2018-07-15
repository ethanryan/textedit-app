import React, { Component } from 'react';

import Yjs from '../components/Yjs.js';

// var quill = new Quill('#editor', {
//   theme: 'snow'
// });

function hello() {
  console.log('hi hi hi hi hi')
}


function returnQuill() {
  console.log('returnQuill function called...')
  var quill = new Quill('#editor', {
    theme: 'snow'
  });
  return quill
}

class Quill extends Component {

  componentDidMount() {
    console.warn('Quill - componentDidMount...')
    hello()
    returnQuill()
  }

  // comment out the below to re-render Quill on every click -- using this life cycle method to prevent Quill and Yjs from needlessly re-rendering, note: React docs say NOT to use this method for this purpose
  shouldComponentUpdate(nextProps) {
    if (this.props.connectionExists === nextProps.connectionExists) { //these two should always be equal...
      console.warn('Quill - (this.props.connectionExists === nextProps.connectionExists), so returning FALSE in shouldComponentUpdate... AKA no re-render...')
      return false; // don't re-render this component (or its children) if the only state change is "a", "b", or "c" getting clicked...
    } else {
      return true; //default return value for shouldComponentUpdate is true
    }
  }

  render() {
    console.log('Quill - render - this.props is: ', this.props)

    return (
      <div className='Quill-style'>

        {/* <h3>
          Quill component - renders Yjs and textarea
        </h3>

        <p>
        (if Yjs renders TextArea, it creates an infinite loop)
      </p> */}

      <p>
        <span style={this.props.handleColorBorder(this.props.showRoom)}>
          Quill: {this.props.showRoom ? this.props.showRoom : "room name goes here..."}
        </span>
      </p>


      <Yjs
        showRoom={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
        handleColorBorder={this.props.handleColorBorder}
        connectionExists={this.props.connectionExists}
      />

      {
        this.props.connectionExists === true ?
        <div>
          {/* <!-- Include stylesheet --> */}
          {/* <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link> */}
          {/* NOTE: moved this to index.html... */}

          {/* <!-- Create the editor container --> */}
          <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p>
              <br></br>
            </p>
          </div>

          {/* <!-- Include the Quill library --> */}
          {/* <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script> */}
          {/* NOTE: moved this to index.html... */}

          {/* <!-- Initialize Quill editor --> */}
          {/* {returnQuill} */}

          {/* {
            new Quill('#editor', {
              theme: 'snow'
            })
          } */}
        </div>
        :
        <h4>
          Textarea here when connection exists.
        </h4>
      }
    </div>
  )}
}

export default Quill;
