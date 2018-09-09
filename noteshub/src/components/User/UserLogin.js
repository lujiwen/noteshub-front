import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { login, clear } from './../../actions/UserAction';
import * as styles from './UserLogin.css';
import store from "../../store/store";

const FormItem = Form.Item;
class UserLogin extends Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(nextProps) {
    const { userRedu } = nextProps;
    const { dispatch, history } = this.props;
    let datas = {};
    datas.userRedu = userRedu;
    datas.dispatch = dispatch;
    datas.clear = clear;
    datas.history = history;
    // tips.alertMessage.call(datas);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;

    login(dispatch, "ljw")
  };

  render() {
    // const { forgetPassword, form } = this.props;
    // const { getFieldDecorator } = form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>

            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
        </FormItem>
        <FormItem>

            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
        </FormItem>
        <FormItem>
            <Checkbox className="remenberMe">记住我</Checkbox>
          <a className="login-form-forgot" >忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
        </FormItem>
      </Form>
    );
  }
}

// const WrappedNormalLoginForm = Form.create()(UserLogin);
function mapStateToProps(state, oWnprops) {
  return state;
}
export default connect(mapStateToProps)(UserLogin);
// export default connect()(UserLogin)