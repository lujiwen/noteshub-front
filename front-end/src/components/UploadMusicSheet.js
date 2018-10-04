import React from 'react'
import {Button, Form, Icon, Input, Select, Upload} from "antd";
import connect from "react-redux/es/connect/connect";

const Dragger = Upload.Dragger;
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};


const UploadMusicSheetForm = ({form}) => {
  const { getFieldDecorator } = form
  return (
      <Form className="login-form" >
          <FormItem
              {...formItemLayout}
              label="作曲"
          >
            {getFieldDecorator('composer', {
              rules: [{
                type: 'string', message: '不是合法的输入',
              }, {
                required: true, message: '请输入作曲人',
              }],
            })(
                <Input />
            )}
          </FormItem>

          <FormItem
              {...formItemLayout}
              label="作词"
          >
            {getFieldDecorator('lyricist', {
              rules: [{
                type: 'string', message: '不是合法的输入',
              }, {
                required: false, message: '请输入作词人',
              }],
            })(
                <Input />
            )}
          </FormItem>

          <FormItem
              {...formItemLayout}
              label="编曲"
          >
            {getFieldDecorator('arranger', {
              rules: [{
                type: 'string', message: '不是合法的输入',
              }, {
                required: true, message: '请输入编曲人',
              }],
            })(
                <Input />
            )}
          </FormItem>

          <FormItem
              {...formItemLayout}
              label="制谱"
          >
            {getFieldDecorator('scorer', {
              rules: [{
                type: 'string', message: '不是合法的输入',
              }, {
                required: true, message: '请输入制谱人',
              }],
            })(
                <Input />
            )}
          </FormItem>

          <FormItem
              {...formItemLayout}
              label="曲谱类型"
          >
            {getFieldDecorator('sheetType', {
              message: "请选择上传的曲谱类型",
              initialValue: ["五线谱"],
              rules : [{
                required: true, message: '请选择曲谱类型',
              }]
            })(
                <Select>
                  <Option value="stave">五线谱</Option>
                  <Option value="guitar">吉他谱</Option>
                </Select>
            )}
          </FormItem>
        <FormItem
            {...formItemLayout}
            label="描述"
        >
          <TextArea rows={4} />
        </FormItem>

          <p style={{ "text-align":"center", "margin" : "10px"}}>
            <Dragger>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或者将谱子拖拽到这里上传</p>
              <p className="ant-upload-hint">目前支持的谱子格式只有musicXml，如果你没有这样格式的曲谱，请耐心等着...</p>
            </Dragger>
          </p>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">上传</Button>
        </FormItem>
      </Form>


  )
}

const UploadMusicSheet = Form.create()(UploadMusicSheetForm);

function mapStateToProps(state,oWnprops) {
  console.log("UploadMusicSheetForm :" + state)
  return state;
}

export default connect(mapStateToProps)(UploadMusicSheet);
