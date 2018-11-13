import React, {Component} from 'react';
import './App.css';

import Vex from 'vexflow';
import {message, Upload} from 'antd';
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
const {Accidental, StaveNote} = Vex.Flow;



const App = ({isSignOut}) =>  {

  if(isSignOut) {
    return (<Redirect to={'/login'}></Redirect>)
  } else {
    return (
        <div>
          <Stave/>
        </div>
    );
  }
  }

  const mapStateToProps = (state) => {
    return ({
      isSignOut: state.navigationReducer.isSignOut
    })
  }

  const mapDispatchToProps = dispatch => {
    return ({})
  }
export default connect(mapStateToProps, mapDispatchToProps)(App)
