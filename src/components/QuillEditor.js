import React from 'react';

import Quill from 'quill/core';

import Snow from 'quill/themes/snow';
// import SnowTheme from 'quill/themes/snow';


// var cat = "i'm a cat"

class QuillEditor extends React.Component {

  componentDidMount() {
    console.log('QuillEditor - componentDidMount...')
    var options = {
      debug: 'info',
      // modules: {
      //   toolbar: '#toolbar'
      // },
      placeholder: 'Compose an epic...',
      readOnly: false,
      // theme: 'snow'
      theme: null
    };
    // var editor = new Quill('#editor', options);
    new Quill('#editor', options);
  }

  render() {
    return (
      <div>
      <p>
        QuillEditor - this.props.showRoom: {this.props.showRoom}
      </p>
      <div id="editor">
        {/* <p>Some initial <strong>bold</strong> text</p> */}
      </div>
    </div>
    )
  }
}

export default QuillEditor;
