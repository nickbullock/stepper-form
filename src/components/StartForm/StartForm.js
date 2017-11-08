import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import {connect} from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import Utils from '../../services/utils';
const FormItem = Form.Item;


class StartForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            values: getInitialValues()
        };
    }

    render() {
        const { getFieldDecorator, getFieldError} = this.props.form;

        const nameError = getFieldError('name');
        const ageError = getFieldError('age');
        const agreementError = getFieldError('agreement');

        return (
            <Form layout="inline">
                <FormItem validateStatus={nameError ? 'error' : ''} help={''} >
                    {getFieldDecorator('name', {
                        initialValue: this.state.values.name,
                        rules: [{ required: true, pattern: /^[A-Za-z]+$/}],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Имя" />
                    )}
                </FormItem>
                <FormItem validateStatus={ageError ? 'error' : ''} help={''}>
                    {getFieldDecorator('age', {
                        rules: [{ required: true, pattern: /^[0-9]+$/}],
                    })(
                        <Input prefix={<Icon style={{ fontSize: 13 }} />} type="number" placeholder="Возраст" />
                    )}
                </FormItem>
                <FormItem style={{ marginBottom: 8 }} validateStatus={agreementError ? 'error' : ''}
                          help={agreementError ? 'Обязательное поле' : ''} >
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                        rules: [
                            { required: true, type: 'boolean', enum: [true]}
                        ]
                    })(
                        <Checkbox>Мне есть 18 лет</Checkbox>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={Utils.goToForm.bind(this, 'middleForm')}>
                        Далее
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({activeForm: state.activeForm});

export default connect(mapStateToProps)(Form.create()(StartForm));
