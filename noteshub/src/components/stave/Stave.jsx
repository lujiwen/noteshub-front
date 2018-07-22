import ReactDOM from 'react-dom';
import React from 'react';
import Notes from './Vex';
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


class Stave extends React.Component {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        // this.state = { counter: 0 };
        // this.handleClick = this.handleClick.bind(this);

        // this.props.chord1 = [new StaveNote({
        //     keys: ["c/0", "e/4", "g#/8"],
        //     duration: "w",
        // }).addAccidental(0, new Accidental("bb")).addAccidental(2, new Accidental("#"))];
        // this.props.chord2 = [new StaveNote({
        //     keys: ["d/4", "f#/4", "a#/4"],
        //     duration: "w",
        // }).addAccidental(1, new Accidental("#")).addAccidental(2, new Accidental("#"))];
    }

    render() {
        return <div>
            <Notes chord={chord1} />
            <Notes chord={chord2} />
        </div>
    }
}

export default Stave