import React, { Component } from 'react';
import './App.css';
import './components/Vex/Stave'

import LayoutFooter from "./components/Layout/LayoutFooter";
import Stave from "./components/Vex/Stave";

import Vex from 'vexflow';
import {Button} from "antd";
const {Accidental, StaveNote} = Vex.Flow;

class App extends Component {
  render() {
      let chord1 = [new StaveNote({
          keys: ["c/0", "e/4", "g#/8"],
          duration: "w",
      }).addAccidental(0, new Accidental("bb")).addAccidental(2, new Accidental("#"))];

      let chord2 = [new StaveNote({
          keys: ["d/4", "f#/4", "a#/4"],
          duration: "w",
      }).addAccidental(1, new Accidental("#")).addAccidental(2, new Accidental("#"))];

      return (
      <div className="App">
          <Stave chord={[chord1,chord2]}/>
          <LayoutFooter/>
          <Button type="primary">Button</Button>

      </div>
    );
  }
}

export default App;
