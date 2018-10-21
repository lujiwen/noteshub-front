import React from "react"
import {Drawer, Icon, Menu} from 'antd';
import {connect} from 'react-redux';
import {Redirect} from 'react-router'
import {toggleLeftDrawer} from "../actions/NavigationAction";
import {redirectToUpload} from "../actions/LedtDrawerAction";

class LeftDrawer extends React.Component {

    render() {
     const {visible, onClose, redirectToUpload, toUpload} = this.props

      if (toUpload) {
        console.log("redirecting to upload sheet")
        return <Redirect to='/upload'/>
      } else {
        return (
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
                    <span onClick={redirectToUpload}>上传曲谱</span>
                  </Menu.Item>
                </Menu>

              </Drawer>
            </div>
        )
      }

    }
}


function mapStateToProps(state) {
  return {visible: state.navigationReducer.visible, toUpload: state.navigationReducer.toUpload};
}

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(toggleLeftDrawer),
  redirectToUpload: () => dispatch(redirectToUpload)
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer)