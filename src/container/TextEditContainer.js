import React, { Component } from 'react';

import * as api from '../api'

import TextEdit from '../components/TextEdit.js';


class TextEditContainer extends Component {
  constructor() {
    super()
    this.state = {
      timestamp: 'no timestamp yet',
      text: ''
    };
  }

  componentDidMount() {
    api.subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }

  render() {
    return (
      <div>

        <h2>
          Here's the TextEditContainer.
        </h2>

        <p>
          Time: {this.state.timestamp ? new Date(this.state.timestamp).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZoneName: 'short'
          }) : "no date yet"}
        </p>

        <TextEdit
          text={this.state.text}
        />

      </div>
    );
  }
}

export default TextEditContainer;
