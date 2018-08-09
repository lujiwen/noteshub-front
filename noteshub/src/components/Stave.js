import React, { Component } from 'react';
import Notes from './Vex/Vex';
import SheetDrawer from "../services/SheetDrawer";
import {generateId} from "../helpers";
import PropTypes from "prop-types";
import {connect} from "react-redux";

class Stave extends Component {

  state = {windowWidth: window.innerWidth};

  drawSheet = () => {
    new SheetDrawer(
        this.sheetContainer,
        [...this.props.sections].filter(x => x !== null),
        {width: this.state.windowWidth, signature:this.props.signature,scale: this.props.scale}
    ).draw();
  }


  constructor(props) {
        super(props);
  }



    componentDidMount() {
      // console.log('sheet did mount');

      this.drawSheet();
      window.addEventListener("resize", this.updateDimensions);
    }

    componentDidUpdate() {
      // console.log('sheet did update');
      this.drawSheet();
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
    }

    updateDimensions = () => {
      this.setState({windowWidth:window.innerWidth});
    }


    shouldComponentUpdate(nextProps) {
      return !nextProps.shouldUpdate
    }

    render() {
        const { chord} = this.props
        return <div>
            {/*<p>{this.props.name}</p>*/}
            {/*<Notes chord={chord[0]} />*/}
            <Notes chord={chord[1]} />
        </div>
    }



}

Stave.propTypes = {
  parts: PropTypes.array,
  signature: PropTypes.string,
  scale: PropTypes.number,
  width: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    signature: state.settings.key,
    scale: state.settings.scale,
    parts: state.parts,
  }
}

//
// render() {
//   // console.log('sheet render');
//   // всегда передаем разный key, чтобы реакт каждый раз полностью пересоздавал
//   // https://stackoverflow.com/questions/21749798/how-can-i-reset-a-react-component-including-all-transitively-reachable-state
//   return (
//       <div className='sheet' ref={(x) => this.sheetContainer = x} key = {generateId()} />
//   );
// }
// }



export default connect(mapStateToProps)(Stave);
// export default Stave