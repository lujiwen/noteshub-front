import React from 'react'
import {Card, Icon} from "antd";
import SheetTypeIcon from "./SheetTypeIcon";

const SheetIntroCard = () => {

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
          style={{ "margin": 10 }}
      >
        <p>
          <SheetTypeIcon instrument={"guitar"}/>
        </p>
        <p>毛不易</p>
        <p>钢琴</p>
        <p>
          <IconText type="star-o" text="156" />  <IconText type="like-o" text="156" />  <IconText type="message" text="2" />
        </p>
      </Card>
  )
}

export default SheetIntroCard
