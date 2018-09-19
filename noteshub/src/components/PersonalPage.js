import React from 'react'
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { Layout, Menu, Breadcrumb, Button, Icon, Timeline, Divider, Anchor} from 'antd';
import PersonalTab from "./PersonalTab";
import { connect } from 'react-redux';
import {toggleLeftDrawer} from "../actions/NavigationAction";


const PersonalPage = ({chooseTabNumber, personalTabSelect}) => {
  return (
      <div>
        <Row type="flex" justify="center">
          <Col offset={0.5} span={5} >
            <Layout>
              <Avatar padding={10} size={270} shape="square" icon="user" />
              <text>名字</text>
              <text>写个签名吧</text>
              <Button type="default"><Icon type="edit" theme="outlined" />编辑资料</Button>
              <Divider />
              <div><Icon type="environment" theme="outlined" />中国·上海</div>
            </Layout>
          </Col>
          {/*gap between left and right*/}
          <Col span={1}/>
          <Col span={15}>
            <Layout>
              <Anchor>
                <Menu
                  onClick={personalTabSelect}
                  // selectedKeys={[2]}
                  mode="horizontal">
                  <Menu.Item key="overview">个人主页</Menu.Item>
                  <Menu.Item key="my_sheet">我的曲谱</Menu.Item>
                  <Menu.Item key="my_favourite">我喜欢</Menu.Item>
                  <Menu.Item key="following">我关注的人</Menu.Item>
                  <Menu.Item key="followed">关注我的人</Menu.Item>
                </Menu>
              </Anchor>

              <PersonalTab chooseTabNumber={chooseTabNumber}/>
            </Layout>
          </Col>
        </Row>
      </div>
  )
}

function mapStateToProps(state) {
  return {chooseTabNumber: state.personalPageReducer.chooseTabNumber};
}

const mapDispatchToProps = dispatch => ({
  personalTabSelect: (e) => {
    console.log(e)
    let {key} = e
    dispatch({
      type: key.toUpperCase()
    })
  }
})



export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)