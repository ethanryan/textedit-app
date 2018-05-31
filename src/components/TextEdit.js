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
          rows="5" cols="50"
          value={this.props.textFromContainer}
          readOnly
          >
        </textarea>

      </div>
    );
  }
}

export default TextEdit;
