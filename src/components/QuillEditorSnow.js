import React from 'react';


import YjsQuillSnow from './YjsQuillSnow';

// // import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.snow.css'; //need to import this for snow CSS to display correctly...
//
// import Quill from 'quill/core'; //must be from core for functions to work!!!
// import Toolbar from 'quill/modules/toolbar';
// import Snow from 'quill/themes/snow'; //snow works, but need to import and register formats, and replace icons...
//
// import Bold from 'quill/formats/bold';
// import Italic from 'quill/formats/italic';
// import Header from 'quill/formats/header';
// import Underline from 'quill/formats/underline';
// import Link from 'quill/formats/link';
// import List, { ListItem } from 'quill/formats/list';
//
// import Icons from 'quill/ui/icons'; //need to import icons, then replace them...

class QuillEditorSnow extends React.Component {

  componentDidMount() {
    console.warn('1. QuillEditorSnow - componentDidMount...')

  } //componentDidMount

  render() {
    console.warn('0. QuillEditorSnow - render...')
    return (

      <div>
        <YjsQuillSnow
          showRoom={this.props.showRoom} //this is only prop that TextEdit needs!!!
          connectionExists={this.props.connectionExists}
          handleColorBorder={this.props.handleColorBorder}
        />

      <div className="standalone-container">
        <div id="QuillEditorSnow-container">
          {/* <!-- Create the editor container --> */}
          <div id="editor">
            <p>Hello World!</p>
            <p>Some initial <strong>bold</strong> text</p>
            <p></p>
          </div>
        </div>
      </div>

    </div>
    )
  }
}

export default QuillEditorSnow;
