import React,{ Component } from 'react';
import { connect } from 'react-redux';
import * as styles from './LayoutFooter.css';
function LayoutFooter(props) {
  return (
    <footer className="layoutfooter" >
      © 2018 视线 <a className="layoutfooter-a" href="http://www.miitbeian.gov.cn/">备案号：湘ICP备18013456号</a>
    </footer>
  )
}
function mapStateToProps(state,oWnprops) {
  return state;
}

export default connect(mapStateToProps)(LayoutFooter)