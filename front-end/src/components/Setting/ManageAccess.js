import React,{ Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './ManageAccess.css';
class ManageAccess extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="manage-access-div">
        你未授权任何应用程序访问 视线 帐户。
      </div>
    );
  }
}
function mapStateToProps(state,oWnprops) {
  return state;
}
export default connect(mapStateToProps)(ManageAccess);