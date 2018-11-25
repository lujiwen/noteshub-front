import React, { Component } from 'react';
import Notes from './Notes';
import SheetDrawer from "../services/SheetDrawer";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from 'axios'
import {Rate} from "antd";
import PlayButton from "./PlayButton";

const Stave = ({sheet}) => {
    if(sheet != null) {
      return (
          <div style={{"text-align":"center", "margin":"10px"}}>
            <div style={{"font-size": "x-large", "font-family": "serif"}}>彩虹🌈</div>
            <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>词：随便</p>
            <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>曲：周杰伦</p>
            <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>制谱：鲁继文</p>
            <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>音调：C调</p>
            <p style={{"font-size": "small", "font-family": "serif", "text-align":"left", "vertical-align":"middle", "margin-left":10, "margin-bottom":0, "padding-left": "100px"}}>
              难度：
              <Rate allowHalf defaultValue={2.5} />
            </p>
            <Notes sheet={sheet} />
          </div>)
    } else {
      return (<div>sheet is not correct</div>)
    }
  }

const mapStateToProps = (state, ownProps) => {
  return {
    sheet: ownProps.sheet
  }
}
const mapDispatchToProps = (dispatch) => {
  return ({})
}

// componentWillMount() {
//   let token = localStorage.getItem("token")
//   axios.get("http://127.0.0.1:8080/sheet/1", {headers: {"Access-Token": `${token}`}})
//       .then(response => {
//         console.log("response is : ")
//
//         console.log(response.data)
//
//         switch (response.status) {
//           case 401:
//             console.log("not authorized!")
//             this.setState({sheet: response.data});
//             break;
//           case 200:
//             this.setState({sheet: response.data});
//             break;
//         }
//       })
// }



export default connect(mapStateToProps, mapDispatchToProps)(Stave);
