import React, { Component } from 'react';
import './App.css';

import TextEdit from './components/TextEdit.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Welcome to TextEdit-App</h1>
        </header>

        <TextEdit />

      </div>
    );
  }
}

export default App;
