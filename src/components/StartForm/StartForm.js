import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import {connect} from 'react-redux';
import actions from '../../actions';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class StartForm extends React.Component {
    componentDidMount() {
        // To disabled submit button at the beginning.
        this.props.form.validateFields();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err){
                console.log("received values", values)
                this.props.dispatch(actions.setActiveForm({activeForm: 'middleForm'}));
                this.props.dispatch(actions.setFormData({form: 'startForm', data: values}));
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        // Only show error after a field is touched.
        const nameError = isFieldTouched('name') && getFieldError('name');
        const ageError = isFieldTouched('age') && getFieldError('age');

        return (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <FormItem validateStatus={nameError ? 'error' : ''} help={nameError || ''} >
                    {getFieldDecorator('name', {
                        rules: [{ required: true}],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Имя" />
                    )}
                </FormItem>
                <FormItem validateStatus={ageError ? 'error' : ''} help={ageError || ''}>
                    {getFieldDecorator('age', {
                        rules: [{ required: true}],
                    })(
                        <Input prefix={<Icon style={{ fontSize: 13 }} />} type="number" placeholder="Возраст" />
                    )}
                </FormItem>
                <FormItem style={{ marginBottom: 8 }}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        rules: [{ required: true}]
                    })(
                        <Checkbox>Мне есть 18 лет</Checkbox>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
                        Далее
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default connect()(Form.create()(StartForm));
