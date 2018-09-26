import React from 'react'
import {Card, Icon} from "antd";

const SheetIntroCard = () => {
  return (
      <Card
          title="消愁"
          extra={<a href="#">
            <Icon style={{"margin-right": 20}} type="cloud-download" theme="outlined" />
            <Icon style={{"margin-right": 20}} type="delete" theme="outlined" />
            <Icon type="arrow-right" theme="outlined" /></a>}
          style={{ width: "90%", margin: 10 }}
      >
        <p>毛不易</p>
        <p>钢琴</p>
      </Card>
  )
}

export default SheetIntroCard
