import ReactDOM from 'react-dom';
import React from 'react';
import Notes from '../Notes';

import Vex from 'vexflow';
const {Accidental, StaveNote} = Vex.Flow;

const chord1 = [new StaveNote({
    keys: ["c/0", "e/4", "g#/8"],
    duration: "w",
}).addAccidental(0, new Accidental("bb")).addAccidental(2, new Accidental("#"))];
const chord2 = [new StaveNote({
    keys: ["d/4", "f#/4", "a#/4"],
    duration: "w",
}).addAccidental(1, new Accidental("#")).addAccidental(2, new Accidental("#"))];

ReactDOM.render(
    <div>
        <Notes chord={chord1} />
        <Notes chord={chord2} />
    </div>, document.getElementById("stave"));