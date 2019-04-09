import React from 'react'
import YjsQuill from '../logic/YjsQuill'

const QuillEditor = ({handleColorBorder, connectionExists, showRoom}) => {
    return (
        <div className='TextEdit-style'>
  
          <p>
            <span style={handleColorBorder(showRoom)}>
              QuillEditor: {showRoom}
            </span>
          </p>
  
          <YjsQuill
            showRoom={showRoom} //this is only prop that TextEdit needs!!!
            connectionExists={connectionExists}
            handleColorBorder={handleColorBorder}
          />
  
          {
            (connectionExists === true) ?
            /* <!-- Create the editor container --> */
            <div id="QuillEditor-container">
              <div id="editor">
                <p>Hello World!</p>
                <p>Some initial <strong>bold</strong> text</p>
                <p></p>
              </div>
            </div>
            :
            <div>
              LOADING...
            </div>
          }
  
        </div>
      )
}

export default QuillEditor
