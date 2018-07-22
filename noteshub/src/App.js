import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/stave/Stave'

import LayoutFooter from "./components/Layout/LayoutFooter";
// import LayoutHeader from "./components/Layout/LayoutHead"

class App extends Component {
  render() {
    return (
      <div className="App">

          <LayoutFooter/>
      </div>
    );
  }
}

export default App;
