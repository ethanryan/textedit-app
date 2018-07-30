import React from 'react';

import YjsQuill from './YjsQuill';

class QuillEditor extends React.Component {

  componentDidMount() {
    console.warn('1. QuillEditor - componentDidMount...')

  } //componentDidMount

  render() {
    console.warn('0. QuillEditor - render...')
    return (
      <div className='TextEdit-style'>

        <p>
          <span style={this.props.handleColorBorder(this.props.showRoom)}>
            QuillEditor: {this.props.showRoom}
          </span>
        </p>

        <YjsQuill
          showRoom={this.props.showRoom} //this is only prop that TextEdit needs!!!
          connectionExists={this.props.connectionExists}
          handleColorBorder={this.props.handleColorBorder}
        />

        {
          (this.props.connectionExists === true) ?
          /* <!-- Create the editor container --> */
          <div id="editor">
            {/* <div className="progress"> */}
              {/* <div className="indeterminate"></div> */}
            {/* </div> */}
          </div>
          :
          "Loading..."
        }

        {/* <div className="standalone-container">
          <div id="QuillEditor-container">
            <div id="editor">
              <p>Hello World!</p>
              <p>Some initial <strong>bold</strong> text</p>
              <p></p>
            </div>
          </div>
        </div> */}

      </div>
    )
  }
}

export default QuillEditor;
