import React from 'react'
import {Card, Icon} from "antd";
import SheetTypeIcon from "./SheetTypeIcon";
import connect from "react-redux/es/connect/connect";
import {fetchSheetByID} from "../actions/SheetActions";
import Redirect from "react-router/es/Redirect";

const SheetIntroCard = ({sheetInfo, viewSheet, toViewSheet}) => {

  const IconText = ({ type, text }) => (
      <span style={{ marginRight: 8 }}>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
  );

  // if (toViewSheet.isViewSheet) {
  //   return <Redirect to={"/sheet"}></Redirect>
  // }

  return (
      <Card
          title={sheetInfo.title}
          extra={<div>
            <Icon style={{"margin-right": 20}} type="cloud-download" theme="outlined" />
            <Icon type="delete" theme="outlined" />
            </div>}
          style={{ "margin-bottom": 10, "margin-top": 10 }}
      >
        <div onClick={viewSheet.bind(this, sheetInfo.ID)}>
          <p>
            <SheetTypeIcon instrument={sheetInfo.sheetType==0?"piano":"guitar"}/>
          </p>
          <p>{sheetInfo.composer}</p>
          <p>
            <IconText type="star-o" text={sheetInfo.liked} />  <IconText type="like-o" text={sheetInfo.thumbUp} />  <IconText type="message" text="2" />
          </p>
        </div>

      </Card>
  )
}


function mapStateToProps(state, prop) {
  return {
    sheetInfo: prop.sheet.sheet,
    toViewSheet: {isViewSheet: state.sheetReducer.viewSheet, sheet: state.sheetReducer.sheetInfo}
    // startEdit: state.profileReducer.start_edit,
    // endEdit: state.profileReducer.end_edit
  };
}

const mapDispatchToProps = dispatch => ({
  viewSheet: (sheetId) => {
    console.log("viewSheet: " + sheetId)
    // dispatch({type: "VIEW_SHEET", sheetId: 0 })
    fetchSheetByID({dispatch, sheetId: sheetId})
  }
})



export default connect(mapStateToProps, mapDispatchToProps)(SheetIntroCard)

