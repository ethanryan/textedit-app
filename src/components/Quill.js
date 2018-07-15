import React, { Component } from 'react';

import Yjs from '../components/Yjs.js';

// var quill = new Quill('#editor', {
//   theme: 'snow'
// });

function hello() {
  console.log('hi hi hi hi hi')
}

function cat() {
  console.log('cat function called...')
  var cat = "hi, i'm a mofuckin CAT. MEOW!"
  return cat
}

function quillThis() {
  console.warn('quillThis called...')
  var quill = new Quill('#editor', {
    theme: 'snow'
  });
  console.warn('quillThis - quill is: ', quill)
  console.warn('typeof quillThis - quill is: ', typeof quill)
  // return quill
  return JSON.stringify(quill)
}


function returnQuillObject() {
  console.warn('returnQuillObject function called...')
  var options = {
  debug: 'info',
  modules: {
    toolbar: '#toolbar'
  },
  placeholder: 'Compose an epic...',
  readOnly: true,
  theme: 'snow'
};
var editor = new Quill('#editor', options);
console.warn('returnQuillObject - editor is: ', editor)
return editor
}

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}


function getMyCar() {
  console.log('getMyCar called...')
  var myCar = new Car('Eagle', 'Talon TSi', 1993);
  console.log('myCar is: ', myCar)
  return myCar
}


// var quill = new Quill('#editor-container', {
//   modules: {
//     toolbar: [
//       [{ header: [1, 2, false] }],
//       ['bold', 'italic', 'underline'],
//       ['image', 'code-block']
//     ]
//   },
//   placeholder: 'Compose an epic...',
//   theme: 'snow'  // or 'bubble'
// });

class Quill extends Component {

  componentDidMount() {
    console.warn('Quill - componentDidMount...')
    hello()
    // returnQuill()
    var quill = new Quill('#editor', {
      theme: 'snow'
    });
    
    // window.$('.summernote').summernote({
    //   placeholder: 'Hello stand alone ui',
    //   // tabsize: 2,
    //   // height: 100
    // });
    // var quill = new Quill('#editor-container', {
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

        <p style={{border: "3px solid pink"}}>
          cat(): {cat()}
        </p>

        <p style={{border: "3px solid blue"}}>
          getMyCar().make: {getMyCar().make}
        </p>

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


      {/* <Yjs
        showRoom={this.props.showRoom ? this.props.showRoom : "room name goes here..."}
        handleColorBorder={this.props.handleColorBorder}
        connectionExists={this.props.connectionExists}
      /> */}

      {/* below, will render YjsQuill, if condition is met... */}

      {
        this.props.connectionExists === true ?
        <div style={{border: "3px solid green"}}>
          {/* <!-- Include stylesheet --> */}
          {/* <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet"></link> */}
          {/* NOTE: moved this to index.html... */}

          {/* <!-- Create the editor container --> */}
          <div id="editor-container">
          </div>

          <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p>
              <br></br>
            </p>
          </div>

          <p>TRYING THIS AGAIN:::::</p>
          {
            quillThis()
          }

          {/* <!-- Include the Quill library --> */}
          {/* <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script> */}
          {/* NOTE: moved this to index.html... */}

          {/* <!-- Initialize Quill editor --> */}
          {/* {returnQuill()} */}
          <p>
            calling: returnQuillObject().options...
          </p>
          {returnQuillObject().options}
          <p>
            calling: returnQuillObject().props...
          </p>
          {returnQuillObject().props}
          <p>
            calling: returnQuillObject().modules...
          </p>
          {returnQuillObject().modules}
          <p>
            calling: returnQuillObject().placeholder...
          </p>
          {returnQuillObject().placeholder}

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
