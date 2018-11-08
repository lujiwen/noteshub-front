import React,{ Component } from 'react';
import { connect } from 'react-redux';
import {Route, withRouter} from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { login, clear } from './../../actions/UserAction';
import * as styles from './UserLogin.css';
import store from "../../store/store";
import UserRegister from "./UserRegister";
import {toggleLeftDrawer} from "../../actions/NavigationAction";
import {redirectToPersonalPage, redirectToUpload} from "../../actions/LedtDrawerAction";

const FormItem = Form.Item;
const UserLogin = ({isLogin, form, login}) => {

  const { getFieldDecorator } = form;


  function toLogin(e) {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        login(values);// values contains: password ,remember, userName
      }
    })
  }

    if(isLogin) {
      return <UserRegister/>
    } else {
      return (
          <Form onSubmit={toLogin} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                  <Checkbox className="rememberMe">记住我</Checkbox>
              )}
              <a className="login-form-forgot" >忘记密码</a>
              <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
              或者 <a href="register">立即注册!</a>
            </FormItem>
          </Form>
      )
    }
  }

const WrappedNormalLoginForm = Form.create()(UserLogin);


// mapStateToProps是一个函数
// 作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射
// mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染
// mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象
// 使用ownProps作为第二个参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染
// connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新
function mapStateToProps(state) {
  return {isLogin: state.userReducer.isLogin};
}

const mapDispatchToProps = dispatch => ({
  toRegister: () => dispatch({type:"TO_REGISTER"}),
  login: (values) => login(dispatch,values)

})

// mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射
// 也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象
// 如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数
// 如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，返回的 Action 会由 Redux 自动发出
// function mapDispatchToProps() {
//
// }
export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);