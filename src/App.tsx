import * as React from 'react';
import './App.css';
import { EmoteBuilder } from './EmoteBuilder';

const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <EmoteBuilder />
      </div>
    );
  }
}

export default App;
