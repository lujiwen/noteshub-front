import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Button, Upload, Icon, Rate,
} from 'antd';
import React, { Component } from 'react';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class UploadStave extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form onSubmit={this.handleSubmit}>

                {/*<FormItem*/}
                    {/*{...formItemLayout}*/}
                    {/*label="Upload"*/}
                    {/*extra="long"*/}
                {/*>*/}
                    {/*{getFieldDecorator('upload', {*/}
                        {/*valuePropName: 'fileList',*/}
                        {/*getValueFromEvent: this.normFile,*/}
                    {/*})(*/}
                        {/*<Upload name="logo" action="/upload.do" listType="picture">*/}
                            {/*<Button>*/}
                                {/*<Icon type="upload" /> Click to upload*/}
                            {/*</Button>*/}
                        {/*</Upload>*/}
                    {/*)}*/}
                {/*</FormItem>*/}

                <FormItem
                    {...formItemLayout}
                    label="Dragger"
                >
                    {/*<div className="dropbox">*/}
                        {/*{getFieldDecorator('dragger', {*/}
                            {/*valuePropName: 'fileList',*/}
                            {/*getValueFromEvent: this.normFile,*/}
                        {/*})(*/}
                            {/*<Upload.Dragger name="files" action="/upload.do">*/}
                                {/*<p className="ant-upload-drag-icon">*/}
                                    {/*<Icon type="inbox" />*/}
                                {/*</p>*/}
                                {/*<p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                                {/*<p className="ant-upload-hint">Support for a single or bulk upload.</p>*/}
                            {/*</Upload.Dragger>*/}
                        {/*)}*/}
                    {/*</div>*/}
                </FormItem>

                <FormItem
                    wrapperCol={{ span: 12, offset: 6 }}
                >
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}
//
// const WrappedDemo = Form.create()(Demo);
//
// ReactDOM.render(<WrappedDemo />, mountNode);

export default UploadStave