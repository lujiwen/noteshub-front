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
const {Accidental, StaveNote} = Vex.Flow;



class App extends Component {


  render() {

      this.state = {
          top: 10,
          bottom: 10,
      }
      const Dragger = Upload.Dragger;

      const props = {
          name: 'file',
          multiple: true,
          action: '//127.0.0.1:8080/v1/upload/',
          onChange(info) {
              const status = info.file.status;
              if (status !== 'uploading') {
                  console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                  message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
              }
          },
      };

      return (
              <div>
                <PersonalPage/>
                {/*<Profile/>*/}
                {/*<Stave/>*/}
                {/*<WrappedNormalLoginForm/>*/}
                  {/*<LayoutFooter/>*/}
                  {/*<Dragger {...props}>*/}
                      {/*<p className="ant-upload-drag-icon">*/}
                          {/*<Icon type="inbox" />*/}
                      {/*</p>*/}
                      {/*<p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                      {/*<p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>*/}
                  {/*</Dragger>*/}
                  {/*<Header />*/}
                  {/*<SheetContainer/>*/}
                  {/*<Header />*/}
                  {/*<div >*/}
                      {/*/!*<Scheme />*!/*/}
                      {/*<SheetContainer />*/}
                  {/*</div>*/}
              </div>
    );
  }
}

export default App;
