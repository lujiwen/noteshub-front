import React from 'react'
import { Row, Col } from 'antd';
import { Avatar } from 'antd';
import { Layout, Menu, Breadcrumb, Button, Icon} from 'antd';
const { Header, Content, Footer } = Layout;
const PersonalPage =  ({dispatch}) => {
  return (
      <div>
        <Row type="flex" justify="center">
          <Col offset={0.5} span={5} >
            <Layout>
              <Avatar padding={10} size={270} shape="square" icon="user" />
              <text>名字</text>
              <text>写个签名吧</text>
              <Button type="default"><Icon type="edit" theme="outlined" />编辑资料</Button>
              <div><Icon type="environment" theme="outlined" />中国·上海</div>
            </Layout>
          </Col>
          <Col span={15}></Col>

        </Row>
      </div>
  )
}

export default PersonalPage