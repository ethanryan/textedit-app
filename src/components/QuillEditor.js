import React from 'react';

import YjsQuill from './YjsQuill';


import Quill from 'quill/core';
import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow';

import Bold from 'quill/formats/bold';
import Italic from 'quill/formats/italic';
import Header from 'quill/formats/header';




class QuillEditor extends React.Component {

  componentDidMount() {
    console.warn('1. QuillEditor - componentDidMount...')
    // create quill element
    // var options = {
    //   debug: 'info',
    //   modules: {
    //     toolbar: {
    //       container: '#toolbar',  // Selector for toolbar container
    //     }
    //     // Equivalent to { toolbar: { container: '#toolbar' }}
    //     // toolbar: '#toolbar'
    //   },
    //   placeholder: 'Compose an epic...',
    //   readOnly: false,
    //   theme: 'snow'
    //   // theme: null
    // };
    // // var editor = new Quill('#editor', options);
    // var quill = new Quill('#editor', options);



  } //componentDidMount

  render() {
    console.warn('0. QuillEditor - render...')
    return (
      <div>

        <YjsQuill
          showRoom={this.props.showRoom} //this is only prop that TextEdit needs!!!
          connectionExists={this.props.connectionExists}
          handleColorBorder={this.props.handleColorBorder}
        />

        <p>
          QuillEditor - this.props.showRoom: {this.props.showRoom}
        </p>
        {/* new example, from codepen: */}
        <div id="editor-container"></div>

        {/* Create toolbar container, outside of editor... */}
        <div id="toolbar"></div>

        {/* Create the editor container... */}
        <div id="editor">
          {/* <p>Some initial <strong>bold</strong> text</p> */}
        </div>

      </div>
    )
  }
}

export default QuillEditor;
