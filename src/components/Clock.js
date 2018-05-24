import React, { Component } from 'react';

class Clock extends Component {
  render() {
    // console.log('in Clock, this.props is: ', this.props)
    return (
      <div>

        <h3>
          Here's the Clock component.
        </h3>

        <p>
          Time: {this.props.timestamp ? new Date(this.props.timestamp).toLocaleString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZoneName: 'short'
          }) : "no timestamp yet"}
        </p>

      </div>
    );
  }
}

export default Clock;
