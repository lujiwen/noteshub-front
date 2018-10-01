import React from 'react'
import {Anchor, Avatar, Button, Divider, Icon, Layout, Menu} from 'antd';
import PersonalTab from "./PersonalTab";
import {connect} from 'react-redux';
import Profile from "./Profile";
import Stave from "./Stave";
import {Redirect} from "react-router";


const PersonalPage = ({viewSheet ,chooseTabNumber, startEdit, personalTabSelect, editProfile}) => {
  if (startEdit) {

    return (
       /*<Redirect to={"/profile"} push={"/"} ></Redirect>*/
         <Profile/>
     )
  } else if (viewSheet) {
    return <Stave/>
  } else {
    return (
        <div style={{padding: "20px"}}>
          <div style={{float:"left", width:"20%", margin:20}}>
            <Layout style={{background:"#fff"}}>
              <div style={{"text-align": "center"}}>
                <Avatar size={270} shape="square" icon="user" />
              </div>
              <text style={{"text-align": "center"}}>名字</text>
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

              <PersonalTab style={{"background-color":"white"}} chooseTabNumber={chooseTabNumber}/>
            </Layout>
          </div>
        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    chooseTabNumber: state.personalPageReducer.chooseTabNumber,
    startEdit: state.profileReducer.start_edit,
    endEdit: state.profileReducer.end_edit,
    viewSheet: state.sheetReducer.viewSheet
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