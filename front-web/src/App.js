import React, {Component} from 'react';
import './App.css';

import Vex from 'vexflow';
import {Button, message, Upload} from 'antd';
import WrappedNormalLoginForm from "./components/User/UserLogin"
import WrappedRegistrationForm from "./components/User/UserRegister"
import WrappedRForgetPswForm from "./components/User/UserForgetPassword"
import Navigation from "./components/Navigation";
import LeftDrawer from "./components/LeftDrawer";
import Stave from "./components/Stave";
import PersonalPage from "./components/PersonalPage";
import Profile from "./components/Profile";
import UploadMusicSheet from "./components/UploadMusicSheet";
import connect from "react-redux/es/connect/connect";
import {Redirect} from "react-router";
import OpenSheetMusicDisplay from "./lib/OpenSheetMusicDisplay";

const {Accidental, StaveNote} = Vex.Flow;

const App = ({isSignOut, playSheet, stopSheet}) =>  {

  return <div>
    <Button type="primary" onClick={playSheet}></Button>
    <Button type="danger" onClick={stopSheet}></Button>
    <OpenSheetMusicDisplay file={"qhc.xml"}/>
  </div>
  // if(isSignOut) {
  //   return (<Redirect to={'/login'}></Redirect>)
  // } else {
  //   return (
  //       <div></div>
  //   );
  // }
}

const mapStateToProps = (state) => {
  return ({
    isSignOut: state.navigationReducer.isSignOut
  })
}

const mapDispatchToProps = dispatch => {
  return ({
    playSheet: ()=> {dispatch({type: "PLAY_SHEET"})},
    stopSheet: ()=> {dispatch({type: "STOP_SHEET"})}
  })
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
