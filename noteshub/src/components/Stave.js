import React, { Component } from 'react';
import Notes from './Notes';
import SheetDrawer from "../services/SheetDrawer";
import {generateId} from "../helpers";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from 'axios'

class Stave extends Component {

  // state = {windowWidth: window.innerWidth};


  drawSheet = () => {

  }


  constructor(props) {
      super(props);
      this.state = {sheet: null};
      // var sheet = this.props.sheet
  }

  componentWillMount() {
    axios.get("http://127.0.0.1:8080/v1/sheet/1")
        .then(response => {
          this.setState({sheet: response.data});
        })
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
      if(this.state.sheet != null) {
        return <div>
          <Notes sheet={this.state.sheet} />
        </div>
      } else {
        return <div></div>
      }
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

// export default connect(mapStateToProps)(Stave);
export default Stave