import React from 'react'

import {Button, Form, Icon, Input, Layout, Select, Tooltip} from 'antd';
import AvatarEditor from 'react-avatar-editor'
const FormItem = Form.Item;
const Option = Select.Option;

class ProfileForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;

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
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
        <Select style={{ width: 70 }}>
          <Option value="86">+86</Option>
          <Option value="87">+87</Option>
        </Select>
    );

    return (
        <div style={{ "text-align": "center"}}>
          <Layout style={{float:"left", width:"50%", margin:10, backgroundColor: "white"}}>
            <Form style={{width:"fit-content"}} onSubmit={this.handleSubmit} className={"login-form"}>
              <FormItem
                  {...formItemLayout}
                  label={(
                      <span>
              昵称&nbsp;
                        <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
                  )}
              >
                {getFieldDecorator('nickname', {
                  rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(
                    <Input />
                )}
              </FormItem>

              <FormItem
                  {...formItemLayout}
                  label="电话号吗"
              >
                {getFieldDecorator('phone', {
                  rules: [{ required: true, message: '请输入你的电话号码' }],
                })(
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                )}
              </FormItem>

              <FormItem
                  {...formItemLayout}
                  label="邮箱"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: false, message: 'Please input your E-mail!',
                  }],
                })(
                    <Input />
                )}
              </FormItem>

              <FormItem
                  {...formItemLayout}
                  label="签名"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'text', message: 'The input is not valid E-mail!',
                  }, {
                    required: false, message: 'Please input your E-mail!',
                  }],
                })(
                    <Input />
                )}
              </FormItem>


            </Form>
          </Layout>
          <div style={{float:"left", width:"20%", "text-align": "center"}}>
              <AvatarEditor
                margin="auto"
                image="avatar.svg"
                width={150}
                height={150}
                border={10}
                color={[255, 255, 255]} // RGBA
                scale={1}
                rotate={0}
            />
            <div>
              <Button type="default" htmlType="button">上传新头像</Button>
            </div>

          </div>
          <p>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">提交</Button>
            </FormItem>
          </p>
        </div>

    );
  }
}

const Profile = Form.create()(ProfileForm);

export default Profile