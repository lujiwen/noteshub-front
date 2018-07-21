import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Icon } from 'antd';
import * as styles from './LayoutHead.css';
const { Header } = Layout;
function LayoutHead(props) {
  const { userName, avatar, history } = props;
  return (
    <Header style={{ background: '#fff', borderBottom: '1px solid #e1e1e1', height: 54 }}>
      <Row className="row" style={{ height: 54 }}>
        <Col span={12}>
          <div className="logo" onClick={() => history.push('/')} />
        </Col>
        <Col span={12}>
          <div className="user">
            { userName ? <img src={avatar} className="images" onClick={() => history.push('/personal')} /> : <Icon type="user" className="icon" onClick={() => history.push('/user')} /> }
          </div>
        </Col>
      </Row>
    </Header>
  )
}
function mapStateToProps(state,oWnprops) {
  return state;
}

export default connect(mapStateToProps)(LayoutHead)