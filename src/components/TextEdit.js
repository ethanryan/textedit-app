import React, { Component } from 'react';

class TextEdit extends Component {
  render() {
    // console.log('in TextEdit, this.props is: ', this.props)
    return (
      <div>

        <h3>
          Here's the TextEdit component.
        </h3>

        <textarea
          rows="10" cols="50"
          placeholder="Write something here..."
          value={this.props.text}
          onChange={this.handleTextChange}
          >
        </textarea>

      </div>
    );
  }
}

export default TextEdit;
