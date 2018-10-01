import React from 'react'
import {Card, Icon} from "antd";
import SheetTypeIcon from "./SheetTypeIcon";
import connect from "react-redux/es/connect/connect";

const SheetIntroCard = ({sheetInfo, viewSheet}) => {

  const IconText = ({ type, text }) => (
      <span style={{ marginRight: 8 }}>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
  );

  return (
      <Card
          title="消愁"
          extra={<div>
            <Icon style={{"margin-right": 20}} type="cloud-download" theme="outlined" />
            <Icon type="delete" theme="outlined" />
            </div>}
          style={{ "margin-bottom": 10, "margin-top": 10 }}
      >
        <div onClick={viewSheet}>
          <p>
            <SheetTypeIcon instrument={"guitar"}/>
          </p>
          <p>毛不易</p>
          <p>
            <IconText type="star-o" text="156" />  <IconText type="like-o" text="156" />  <IconText type="message" text="2" />
          </p>
        </div>

      </Card>
  )
}


function mapStateToProps(state) {
  return {
    sheetInfo: state.sheetReducer.sheetInfo,
    // startEdit: state.profileReducer.start_edit,
    // endEdit: state.profileReducer.end_edit
  };
}

const mapDispatchToProps = dispatch => ({
  viewSheet: (e) => {
    console.log("viewSheet" + e)
    dispatch({type: "VIEW_SHEET", sheetId: 0 })
  }
})



export default connect(mapStateToProps, mapDispatchToProps)(SheetIntroCard)

