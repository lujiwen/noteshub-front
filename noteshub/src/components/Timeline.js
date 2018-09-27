import React from 'react'
import {Timeline} from "antd";

const TimeLine = () => {
  return (
      <Timeline style={{margin:10, background:"#fff"}}>
        <Timeline.Item style={{margin:10}}>Create a services site 2015-09-01</Timeline.Item>
        <Timeline.Item style={{margin:10}}>Solve initial network problems 2015-09-01</Timeline.Item>
        <Timeline.Item style={{margin:10}}>Technical testing 2015-09-01</Timeline.Item>
        <Timeline.Item style={{margin:10}}>Network problems being solved 2015-09-01</Timeline.Item>
      </Timeline>
  )

}

export default TimeLine
