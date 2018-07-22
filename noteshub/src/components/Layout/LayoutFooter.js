import React,{ Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './LayoutFooter.css';
function LayoutFooter(props) {
  return (
    <footer className="layoutfooter" >

    </footer>
  )
}
function mapStateToProps(state,oWnprops) {
  return state;
}

export default LayoutFooter
// export default connect(mapStateToProps)(LayoutFooter)