import React, { Component } from 'react';
import './App.css';
import './components/Vex/Stave'

import LayoutFooter from "./components/Layout/LayoutFooter";
import Stave from "./components/Vex/Stave";

import Vex from 'vexflow';
import {Upload, Icon, message } from 'antd';
import SheetContainer from "./containers/SheetContainer";
import Header from "./containers/Header";
import Scheme from "./containers/Scheme";
const {Accidental, StaveNote} = Vex.Flow;

class App extends Component {
  render() {
      let chord1 = [new StaveNote({
          keys: ["c/0", "e/4", "g#/8"],
          duration: "w",
      }).addAccidental(0, new Accidental("bb")).addAccidental(2, new Accidental("#"))];

      let chord2 = [new StaveNote({
          keys: ["d/4", "f#/4", "a#/4"],
          duration: "w",
      }).addAccidental(1, new Accidental("#")).addAccidental(2, new Accidental("#"))];

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
              <div >
                  {/*<Stave chord={[chord1,chord2]}/>*/}
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
                  <Header />
                  <div className='main'>
                      <Scheme />
                      <SheetContainer />
                  </div>
              </div>
    );
  }
}

export default App;
