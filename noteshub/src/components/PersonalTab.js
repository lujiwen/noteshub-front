import React from 'react'
import {Timeline, Card, Icon, Upload} from "antd";

const PersonalTab = ({chooseTabNumber}) => {

  const Dragger = Upload.Dragger;

  console.log(chooseTabNumber.toString())
  switch (chooseTabNumber.toString()) {
    case "0":
      return (
          <Timeline>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
            <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
          </Timeline>
      )
    case "1":
      return (
          <div>
            <div>
              <Card
                  title="消愁"
                  extra={<a href="#"><Icon type="arrow-right" theme="outlined" /></a>}
                  style={{ width: "90%", margin: 10 }}
              >
                <p>毛不易</p>
                <p>钢琴</p>
              </Card>
              <Card
                  title="七粒下锅"
                  extra={<a href="#"><Icon type="arrow-right" theme="outlined" /></a>}
                  style={{ width: "90%" , margin: 10}}
              >
                <p>毛不易</p>
                <p>钢琴</p>
              </Card>
            </div>

            <div>
              <Dragger>
                <p className="ant-upload-drag-icon">
                  <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">点击或者将谱子拖拽到这里上传</p>
                <p className="ant-upload-hint">目前支持的谱子格式只有musicXml，如果你没有这样格式的曲谱，请耐心等着...</p>
              </Dragger>
            </div>
          </div>

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

export default PersonalTab