import React, { Component } from 'react';
import './App.css';

import TextEditContainer from './container/TextEditContainer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to TextEdit-App</h1>
        </header>

        <TextEditContainer />

      </div>
    );
  }
}

export default App;
