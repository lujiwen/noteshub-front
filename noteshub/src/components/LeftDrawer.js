import React, { Component} from "react"
import { Drawer, Button } from 'antd';
import { connect } from 'react-redux';
import {toggleLeftDrawer} from "../actions/NavigationAction";

const LeftDrawer = ({visible, onClose}) => (
    <div>
      <Drawer
          title="Basic Drawer"
          placement="left"
          closable={true}
          onClose={onClose}
          visible={visible}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
)



function mapStateToProps(state) {
  return {visible: state.navigationReducer.visible};
}

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(toggleLeftDrawer)
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer)