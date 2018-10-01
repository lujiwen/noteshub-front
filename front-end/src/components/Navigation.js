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
        <Menu.Item key="app">
          <Icon type="file-search" />探索
        </Menu.Item>
        <SubMenu title={<span className="submenu-title-wrapper"><Icon type="shopping" />市场</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
        <Menu.Item key="notification">
          <Icon type="notification" />消息
        </Menu.Item>

        <SubMenu title={<Avatar shape="circle" src={"./avatar.svg"} onClick = {this.toLogin}></Avatar>} style={{"float": "right"}}>
          <Menu.Item key="help">帮助</Menu.Item>
          <Menu.Item key="signOut">登出</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}


export default connect()(Navigation)
