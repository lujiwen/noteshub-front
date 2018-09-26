import React from 'react'
import {connect} from 'react-redux'
import {Avatar, Icon, Input, Menu} from 'antd';
import {toggleLeftDrawer} from "../actions/NavigationAction";
import {login} from "../actions/UserAction";

const Search = Input.Search;

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


const Navigation = ({ dispatch }) => {

  this.toggleDraw = function (e) {
    console.log("navigation toggleDraw :" + e)
    dispatch(toggleLeftDrawer)
  }

  this.toLogin = function (e) {
    dispatch(login)
  }
  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="bars" onClick = {this.toggleDraw}>
          <Icon type="bars" />芸芸
        </Menu.Item>

        <Menu.Item key="search">
          <Search
              placeholder="输入曲谱或者作者名"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
          />
        </Menu.Item>
        <Menu.Item key="app" disabled>
          <Icon type="appstore" />Navigation Two
        </Menu.Item>
        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="setting" />Navigation Three - Submenu</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="alipay">
          <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
        </Menu.Item>
        <Menu.Item key="login" style={{"float": "right", "text-align":"center"}}>
          <div style={{"float": "right", "text-align":"center"}}>
            <Avatar shape="square" icon="user" onClick = {this.toLogin}></Avatar>
          </div>
        </Menu.Item>
      </Menu>
    </div>
  )
}


export default connect()(Navigation)
