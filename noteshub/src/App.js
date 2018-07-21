import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import LayoutFooter from "./components/Layout/LayoutFooter";
// import LayoutHeader from "./components/Layout/LayoutHead"

class App extends Component {
  render() {
    return (
      <div className="App">
          <LayoutHeader/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
          <LayoutFooter/>
      </div>
    );
  }
}

export default App;
