import React from 'react'
import {Icon, Upload} from "antd";
import SheetIntroCard from "./SheetIntroCard";
import TimeLine from "./Timeline";
import Button from "antd/es/button/button";

const PersonalTab = ({chooseTabNumber}) => {


  console.log(chooseTabNumber.toString())
  switch (chooseTabNumber.toString()) {
    case "0":
      return (
          <div>
            <div>
              <SheetIntroCard />
              <SheetIntroCard style={{width: "30%"}}/>
              <Button type="dashed" style={{ width: '60%' }}>
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

export default PersonalTab