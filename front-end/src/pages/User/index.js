import React,{ Component } from 'react';
import { connect } from 'react-redux';
import UserLogin from './../../components/User/UserLogin.js';
import UserRegister from './../../components/User/UserRegister.js';
import UserForgetPassword from './../../components/User/UserForgetPassword.js';
import * as styles from './index.css';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: 1,
    };
  }
  goRegister = () => {
    const { isLogin } = this.state;
    if(isLogin === 1) {
      this.setState({
        isLogin: 2,
      });
    } else {
      this.setState({
        isLogin: 1,
      });
    }
  };
  /**
   * 忘记密码
   * @author  Jiang
   * @return {[type]} [description]
   */
  forgetPassword = () => {
    this.setState({
      isLogin: 3,
    });
  }
  renderContent() {
    const { isLogin } = this.state;
    const { history } = this.props;
    switch(isLogin) {
      case 1:
        return (
          <UserLogin forgetPassword={this.forgetPassword} history={history} />
        );
      case 2:
        return (
          <UserRegister history={history} />
        );
      case 3:
        return (
          <UserForgetPassword history={history} />
        );
    }
  }
  render() {
    const { isLogin } = this.state;
    return (
      <div className="content">
        <div className="user-div">
          <div className="logo-div">
            <img alt="src" src="https://downfuture.com/favicon.png" className="login-logo" />
          </div>
          {this.renderContent()}
          <div className="footerButton">{ isLogin === 1 ? '没有账号' : '已有账号' }？<a onClick={this.goRegister}>{ isLogin === 1 ? '注册' : '登录' }</a>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state,oWnprops) {
  return state;
}

export default connect(mapStateToProps)(Index);