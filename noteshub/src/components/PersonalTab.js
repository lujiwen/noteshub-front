import React from 'react'
import { Card, Icon, Upload} from "antd";
import SheetIntroCard from "./SheetIntroCard";
import TimeLine from "./Timeline";

const PersonalTab = ({chooseTabNumber}) => {

  const Dragger = Upload.Dragger;

  console.log(chooseTabNumber.toString())
  switch (chooseTabNumber.toString()) {
    case "0":
      return (
          <div>
            <div>
              <SheetIntroCard style={{width: "30%"}}/>
              <SheetIntroCard style={{width: "30%"}}/>
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

export default PersonalTab