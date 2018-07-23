import React from 'react';
import Notes from './Vex';

class Stave extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { chord} = this.props
        return <div>
            <p>{this.props.name}</p>
            <Notes chord={chord[0]} />
            <Notes chord={chord[1]} />
        </div>
    }
}

export default Stave