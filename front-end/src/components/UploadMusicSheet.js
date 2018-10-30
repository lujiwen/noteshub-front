import React from 'react'
import {Button, Form, Icon, Input, message, Select, Upload} from "antd";
import connect from "react-redux/es/connect/connect";
import {toggleLeftDrawer} from "../actions/NavigationAction";
import {redirectToPersonalPage, redirectToUpload} from "../actions/LedtDrawerAction";
import {startToUploadSheet} from "../actions/SheetActions";
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


const UploadMusicSheetForm = ({form, onUpload}) => {
  const { getFieldDecorator } = form
  let transcribedSheetLocation = ""
  const props = {
    name: 'file',
    multiple: true,
    action: '//localhost:9090/transcribe',
    onChange(info) {
      const status = info.file.status;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done' && info.file.response.includes(".xml")) {
        message.success(`${info.file.name} 文件上传成功`);
        transcribedSheetLocation = info.file.response
        console.log(transcribedSheetLocation)
      } else if(status === 'done' && ! info.file.response.includes(".xml")) {
        message.error(`${info.file.name} 文件解析失败`);
      }else if (status === 'error'  ){
        message.error(`${info.file.name} 文件上传失败`);
      }
    },
  };

  function uploadSheetAndInfo(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        // const { dispatch } = form;
        if (values["sheetType"] == 'guitar') {
          values["sheetType"] = 2
        } else {
          values["sheetType"] = 1
        }
        values["location"] = transcribedSheetLocation
        console.log(values)
        onUpload(values)
      }
    });
    console.log("uploadSheetAndInfo...")
  }

  return (
      <Form onSubmit={uploadSheetAndInfo} className="login-form" >
          <FormItem
              {...formItemLayout}
              label="歌曲"
          >
            {getFieldDecorator('song', {

              rules: [{
                type: 'string', message: '不是合法的输入',
              }, {
                required: false, message: '请输入歌曲名',
              }],
            })(
                <Input />
            )}
          </FormItem>
          <FormItem
              {...formItemLayout}
              label="作曲"
          >
            {getFieldDecorator('composer', {
              rules: [{
                type: 'string', message: '不是合法的输入',
              }, {
                required: false, message: '请输入作曲人',
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
                required: false, message: '请输入编曲人',
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
                required: false, message: '请输入制谱人',
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
          {getFieldDecorator('description')
            (
              (
                  <TextArea rows={4} />
              )
            )
          }
        </FormItem>
        <FormItem>
          {getFieldDecorator('sheets')
          (
              (
                  <p style={{ "text-align":"center", "margin" : "10px"}}>
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">点击或者将谱子拖拽到这里上传</p>
                      <p className="ant-upload-hint">接受曲谱文件的格式为图片或者pdf文件，在上传的同时对曲谱进行扫描，并转换成可直接播放曲谱，请耐心等着...</p>
                    </Dragger>
                  </p>
              )
          )
          }

        </FormItem>

        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">上传</Button>
        </FormItem>
      </Form>
  )
}

const UploadMusicSheet = Form.create()(UploadMusicSheetForm);

function mapStateToProps(state,oWnprops) {
  if(state.sheetReducer.uploadSheet && state.sheetReducer.data != null) {

  }
  return state;
}

const mapDispatchToProps = dispatch => ({
  onUpload: (values) => startToUploadSheet(dispatch, values)
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadMusicSheet);
