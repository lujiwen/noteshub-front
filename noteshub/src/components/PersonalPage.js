import React from 'react'
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { Layout, Menu, Breadcrumb, Button, Icon, Timeline, Divider, Anchor} from 'antd';


const PersonalPage =  ({choosedNavigator}) => {
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
                  // onClick={this.handleClick}
                  selectedKeys={[2]}
                  mode="horizontal">
                  <Menu.Item>个人主页</Menu.Item>
                  <Menu.Item>我的曲谱</Menu.Item>
                  <Menu.Item>我喜欢</Menu.Item>
                  <Menu.Item>我关注的人</Menu.Item>
                  <Menu.Item>关注我的人</Menu.Item>
                </Menu>
              </Anchor>

              <div>

                <Timeline>
                  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                  <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
              </div>
            </Layout>
          </Col>
        </Row>
      </div>
  )
}



export default PersonalPage