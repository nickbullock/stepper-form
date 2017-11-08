import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import {connect} from 'react-redux';
import {Form, Icon, Input, Button, Checkbox} from 'antd';

const FormItem = Form.Item;

class StartForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            values: props.getInitialValues.call(this)
        };

    }

    componentWillReceiveProps(nextProps){
        const errors = Object.values(nextProps.form.getFieldsError()).filter(error => !!error);
        if(nextProps.goToFormViaStep
            && nextProps.activeForm !== nextProps.goToFormViaStep
            && errors.length === 0){

            nextProps.goToForm.call(this, nextProps.goToFormViaStep, true)
        }
    }

    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;

        const nameError = getFieldError('name');
        const ageError = getFieldError('age');
        const agreementError = getFieldError('agreement');

        return (
            <Form layout="inline">
                <FormItem validateStatus={nameError ? 'error' : ''} help={''}>
                    {getFieldDecorator('name', {
                        initialValue: this.state.values.name,
                        rules: [{required: true, pattern: /^[A-Za-z]+$/}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Имя"/>
                    )}
                </FormItem>
                <FormItem validateStatus={ageError ? 'error' : ''} help={''}>
                    {getFieldDecorator('age', {
                        initialValue: this.state.values.age,
                        rules: [{required: true, pattern: /^[0-9]+$/}],
                    })(
                        <Input prefix={<Icon style={{fontSize: 13}}/>} type="number" placeholder="Возраст"/>
                    )}
                </FormItem>
                <FormItem style={{marginBottom: 8}} validateStatus={agreementError ? 'error' : ''}
                          help={agreementError ? 'Обязательное поле' : ''}>
                    {getFieldDecorator('agreement', {
                        initialValue: this.state.values.agreement,
                        valuePropName: 'checked',
                        rules: [
                            {required: true, pattern: /^true$/}
                        ]
                    })(
                        <Checkbox>Мне есть 18 лет</Checkbox>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.props.goToForm.bind(this, 'middleForm', true)}>
                        Далее
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({activeForm: state.activeForm, activeFormViaStep: state.activeFormViaStep});

export default connect(mapStateToProps)(Form.create()(StartForm));
