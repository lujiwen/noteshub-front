import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Affix } from 'antd';
import LayoutHead from './../../components/Layout/LayoutHead.js';
import LayoutFooter from './../../components/Layout/LayoutFooter.js';
import PasswordChange from './../../components/Setting/PasswordChange.js';
import ManageAccess from './../../components/Setting/ManageAccess.js';
import { getAvatarA } from './../../actions/SettingAction';
import * as styles from './index.css';
const TabPane = Tabs.TabPane;
class Index extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { dispatch } = this.props;
    getAvatarA(dispatch);
  }
  render() {
    const { history, settingRedu } = this.props;
    const { userName, avatar } = settingRedu;
    return (
      <div className="setting-div">
        <Affix>
          <LayoutHead
            userName={userName}
            avatar={avatar}
            history={history}
          />
        </Affix>
        <main>
          <Tabs
            className="setting-tab"
            defaultActiveKey="1"
            tabPosition="left"
            style={{ height: 439 }}
            type="line"
          >
            <TabPane tab="更改密码" key="1">
              <PasswordChange />
            </TabPane>
            <TabPane tab="授权的应用" key="2">
              <ManageAccess />
            </TabPane>
          </Tabs>
        </main>
        <LayoutFooter />
      </div>
    );
  }
}
function mapStateToProps(state,oWnprops) {
  return state;
}
export default connect(mapStateToProps)(Index);