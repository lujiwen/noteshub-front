import React from 'react'
import {Icon} from "antd";
import SheetIntroCard from "./SheetIntroCard";
import TimeLine from "./Timeline";
import Button from "antd/es/button/button";
import {connect} from "react-redux";
import {Redirect} from "react-router";
import {fetchTabData} from "../actions/PersonalAction";


class PersonalTab extends React.Component  {

   // {chooseTabNumber, uploadSheet, sheets}

  componentWillMount() {
    console.log("componentWillMount in PersonalTab")
    const { fetchTabData, chooseTabNumber }= this.props
    fetchTabData(chooseTabNumber)
  }

  render () {
    const {chooseTabNumber, uploadSheet, sheets} = this.props

    console.log(this.props)
    console.log(chooseTabNumber.toString())
    switch (chooseTabNumber.toString()) {
      case "0":
        return (
            <div>
              <div>
                {sheets.length > 0 ?
                 sheets.map(sheet =>
                    <SheetIntroCard style={{width: "30%"}} sheet={{sheet}}/>) :
                    <div>loading...</div>
                }
                <Button type="dashed" onClick={uploadSheet}>
                  <Icon type="plus" /> 上传曲谱
                </Button>
              </div>
            </div>
        );
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
}

const mapStateToProps = (state, props) => {
  return {username: props.username,
          sheets: state.personalTabReducer.sheets }
}


const mapDispatchToProps = dispatch => ({
  uploadSheet: () => {
    dispatch({type: "UPLOAD_SHEET"})
  },
  fetchTabData: (chooseTabNumber) => {
    fetchTabData(dispatch, chooseTabNumber)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalTab)