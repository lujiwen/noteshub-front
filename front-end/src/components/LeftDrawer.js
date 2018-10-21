import React from "react"
import {Drawer, Icon, Menu} from 'antd';
import {connect} from 'react-redux';
import {Redirect} from 'react-router'
import {toggleLeftDrawer} from "../actions/NavigationAction";
import {redirectToPersonalPage, redirectToUpload} from "../actions/LedtDrawerAction";

class LeftDrawer extends React.Component {

    render() {
     const {visible, onClose, redirectToUpload, toUpload, redirectToPersonalPage,toPersonal} = this.props

      if (toUpload) {
        console.log("redirecting to upload sheet")
        return <Redirect to='/upload'/>
      } else if (toPersonal) {
        console.log("redirecting to personal page")
        return <Redirect to='/profile'/>
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
                    <span onClick={redirectToPersonalPage}>个人主页</span>
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
  return {visible: state.navigationReducer.visible,
    toUpload: state.navigationReducer.toUpload,
    toPersonal: state.navigationReducer.toPersonalPage,
    };
}

const mapDispatchToProps = dispatch => ({
  onClose: () => dispatch(toggleLeftDrawer),
  redirectToUpload: () => dispatch(redirectToUpload),
  redirectToPersonalPage: () => dispatch(redirectToPersonalPage)
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawer)