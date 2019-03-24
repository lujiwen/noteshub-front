import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, message } from 'antd';
import {registerUser, clear, login} from './../../actions/UserAction';
import * as styles from './UserRegister.css';
import {Redirect} from "react-router";


import UserLogin from "./UserLogin";
const FormItem = Form.Item;

const UserRegister = ({registerSucceed, form, register}) => {
  const { getFieldDecorator } = form;

  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        register(values)
      }
    });
  }

  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两个密码输入不一致！');
    } else {
      callback();
    }
  };
  const validateToNextName = (rule, value , callback) => {
    const wrongNamePattern = /^$/; //empty
    // const wrongNamePattern = /^\d/;
    if(value) {
      if(wrongNamePattern.test(value)) {
        callback('用户名不能以数字开头，应为字符串或中文组成');
      } else {
        callback();
      }
    } else {
      callback();
    }
  }

  const validateToNextPassword = (rule, value, callback) => {
    const passWordPattern = /^(?=.*\d)(?=.*[a-z]).{6,20}$/;
    if(value) {
      if(!passWordPattern.test(value)) {
        callback('密码应为6-20位，由大小写字母及数字组成');
      } else {
        // if (value && this.state.confirmDirty) {
        if (value) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      }
    } else {
      callback();
    }
  };

    if(registerSucceed) {
      return (<UserLogin/>)
    }

    return (
      <Form onSubmit={handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ 
              required: true,
              message: '请输入用户名!',
              whitespace: true
            }, {
              validator: validateToNextName,
            }],
          })(
            <Input placeholder="请输入用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码!',
            }, {
              validator: validateToNextPassword,
            }],
          })(
            <div>
              <Input type="password" placeholder="请输入密码" />
            </div>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认密码!',
            }, {
              validator: compareToFirstPassword,
            }],
          })(
            <Input type="password" placeholder="请确认密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">注册</Button>
        </FormItem>
      </Form>
    );
}

const WrappedRegistrationForm = Form.create()(UserRegister);


const mapStateToProps = (state) => {
  console.log("mapStateToProps in userRegister!")
  return {
    registerSucceed: state.registerReducer.registerSucceed
  };
}

const mapDispatchToProps = (dispatch) => ({
    register: (values) => registerUser(dispatch, values)
})

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm);