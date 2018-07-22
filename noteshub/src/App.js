import React, { Component } from 'react';
import './App.css';
import './components/stave/Stave'

import LayoutFooter from "./components/Layout/LayoutFooter";
import Stave from "./components/stave/Stave";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Stave/>
          <LayoutFooter/>
      </div>
    );
  }
}

export default App;
