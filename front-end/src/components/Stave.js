import React, { Component } from 'react';
import Notes from './Notes';
import SheetDrawer from "../services/SheetDrawer";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from 'axios'
import {Rate} from "antd";

class Stave extends Component {

  constructor(props) {
      super(props);
      this.state = {sheet: null};
      // var sheet = this.props.sheet
  }

  componentWillMount() {
    axios.get("http://127.0.0.1:8080/sheet/1")
        .then(response => {
          this.setState({sheet: response.data});
        })
  }

    componentDidMount() {
      window.addEventListener("resize", this.updateDimensions);
    }

    componentDidUpdate() {
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
        console.log(this.state.sheet)

        return <div style={{"text-align":"center", "margin":"10px"}}>
          <div style={{"font-size": "x-large", "font-family": "serif"}}>普通DISCO</div>
          <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>词：随便</p>
          <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>曲：周杰伦</p>
          <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>制谱：鲁继文</p>
          <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>音调：C调</p>
          <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>
            难度：
            <Rate allowHalf defaultValue={2.5} />
          </p>
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