import React from 'react'
import {Anchor, Avatar, Button, Divider, Icon, Layout, Menu} from 'antd';
import PersonalTab from "./PersonalTab";
import {connect} from 'react-redux';
import Stave from "./Stave";
import Redirect from "react-router/es/Redirect";
import {fetchTabData} from "../actions/PersonalAction";


const PersonalPage = ({viewSheet ,chooseTabNumber, startEdit, personalTabSelect, editProfile, username}) => {

  console.log("username :" + username)
  if (startEdit) {
    return (
        <Redirect to={"/profile"}></Redirect>
     )
  } else if (viewSheet.isViewSheet) {
    return <Stave sheet={viewSheet.sheetInfo}/>
  } else {
    return (
        <div style={{padding: "20px"}}>
          <div style={{float:"left", width:"20%", margin:20}}>
            <Layout style={{background:"#fff"}}>
              <div style={{"text-align": "center"}}>
                <Avatar size={270} shape="square" icon="user" />
              </div>
              <text style={{"text-align": "center"}}>{username}</text>
              <text style={{"text-align": "center"}}>写个签名吧</text>
              <Button type="default" onClick={editProfile}><Icon type="edit" theme="outlined"  />编辑资料</Button>
              <Divider />
              <div style={{"text-align": "center"}}>
                <Icon style={{"text-align": "center"}} type="environment" theme="outlined" />中国·上海
              </div>
            </Layout>
          </div>
          <div style={{float:"left", width:"50%", margin:20}}>
            <Layout style={{"background-color":"white"}}>
              <Anchor>
                <Menu
                    onClick={personalTabSelect}
                    mode="horizontal">
                  <Menu.Item key="overview">个人主页</Menu.Item>
                  <Menu.Item key="my_sheet">我的曲谱</Menu.Item>
                  <Menu.Item key="my_favourite">我喜欢</Menu.Item>
                  <Menu.Item key="following">我关注的人</Menu.Item>
                  <Menu.Item key="followed">关注我的人</Menu.Item>
                </Menu>
              </Anchor>

              <PersonalTab style={{"background-color":"white"}} username={username} chooseTabNumber={chooseTabNumber}/>
            </Layout>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state,ownProps) {
  return {
    chooseTabNumber: state.personalPageReducer.chooseTabNumber,
    startEdit: state.profileReducer.start_edit,
    endEdit: state.profileReducer.end_edit,
    viewSheet: {isViewSheet: state.sheetReducer.viewSheet, sheetInfo: state.sheetReducer.sheetInfo},
    username: ownProps.match.params.username
  };
}

const mapDispatchToProps = dispatch => ({
  personalTabSelect: (e) => {
    let {key} = e
    dispatch({
      type: key.toUpperCase()
    })
  },
  editProfile: () => {
    dispatch({type: "EDIT_PROFILE"})
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)