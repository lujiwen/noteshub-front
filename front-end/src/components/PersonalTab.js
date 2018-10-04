import React from 'react'
import {Icon} from "antd";
import SheetIntroCard from "./SheetIntroCard";
import TimeLine from "./Timeline";
import Button from "antd/es/button/button";
import {connect} from "react-redux";
import {Redirect} from "react-router";

const PersonalTab = ({chooseTabNumber, uploadSheet}) => {
  console.log(chooseTabNumber.toString())
  switch (chooseTabNumber.toString()) {
    case "0":
      return (
          <div>
            <div>
              <SheetIntroCard />
              <SheetIntroCard style={{width: "30%"}}/>
              <Button type="dashed" onClick={uploadSheet}>
                <Icon type="plus" /> 上传曲谱
              </Button>
            </div>
          </div>
      )
    case "1":
      return (
          <TimeLine/>
      )
    case "2":
      return (
          <div>

          </div>
      )
    case "3":
      return (
          <div></div>
      )
    default:
      return (
          <div></div>
      )
  }
}

const mapStateToProps = state => {
  // return {willUploadSheet: state.sheetReducer.uploadSheet}
}


const mapDispatchToProps = dispatch => ({
  uploadSheet: () => {
    dispatch({type: "UPLOAD_SHEET"})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalTab)