import React from 'react'
import QuillEditor from './QuillEditor'

const EditorView = ({connectionExists}) => {
    const handleColorBorder = (string) => {
        var colorBorder
        if (string === 'room0' || string === 'xxx') {
          colorBorder = {border:'2px solid orange',}
        }
        if (string === 'room1' || string === 'a') {
          colorBorder = {border:'2px solid blue',}
        }
        if (string === 'room2' || string === 'b') {
          colorBorder = {border:'2px solid red',}
        }
        if (string === 'room3' || string === 'c') {
          colorBorder = {border:'2px solid yellow',}
        }
        return colorBorder
      }
  return (
    <div className='TextEditContainer-style'>

        <h2>
          TextEditContainer
        </h2>


        <div>
          <QuillEditor
            showRoom={'room0'} //this is only prop that TextEdit needs!!!
            connectionExists={connectionExists}
            handleColorBorder={handleColorBorder}
          />
        </div>
        </div>
  )
}

export default EditorView
