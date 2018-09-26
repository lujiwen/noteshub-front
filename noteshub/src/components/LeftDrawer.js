import React, { Component} from "react"
import { Drawer, Button, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import {toggleLeftDrawer} from "../actions/NavigationAction";

const LeftDrawer = ({visible, onClose}) => (
    <div>
      <Drawer
          title="芸芸曲谱"
          placement="left"
          closable={true}
          onClose={onClose}
          visible={visible}
      >

        <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="personal_page">
            <Icon type="user" />
            <span>个人主页</span>
          </Menu.Item>

          <Menu.Item key="upload_sheet">
            <Icon type="upload" />
            <span>上传曲谱</span>
          </Menu.Item>
        </Menu>

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