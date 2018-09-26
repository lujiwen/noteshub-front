import React from 'react'
import {Card, Icon} from "antd";
import SheetTypeIcon from "./SheetTypeIcon";

const SheetIntroCard = () => {
  return (
      <Card
          title="消愁"
          extra={<div>
            <Icon style={{"margin-right": 20}} type="cloud-download" theme="outlined" />
            <Icon style={{"margin-right": 20}} type="delete" theme="outlined" />
            <Icon type="arrow-right" theme="outlined" /></div>}
          style={{ width: "90%", margin: 10 }}
      >
        <p>
          <SheetTypeIcon instrument={"guitar"}/>
        </p>
        <p>毛不易</p>
        <p>钢琴</p>
      </Card>
  )
}

export default SheetIntroCard
