import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import {connect} from 'react-redux';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import actions from '../../actions';

const FormItem = Form.Item;

class StartForm extends React.Component {

    componentDidMount() {
        this.props.dispatch(actions.setActiveFormController(this.props.form));
        this.props.dispatch(actions.loadInitialValues(this.props.activeForm));
    }

    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;

        const nameError = getFieldError('name');
        const ageError = getFieldError('age');

        const ageValidator = (rule, value, cb) => {
            const errors = [];

            if(value < 18){
                errors.push(new Error("MIN_AGE_IS_18"));
            }

            cb(errors);
        };
        const agreementError = getFieldError('agreement');

        return (

            <Form layout="inline">
                <FormItem validateStatus={nameError ? 'error' : ''} help={''}>
                    {getFieldDecorator('name', {
                        initialValue: this.props.initialValues.name,
                        rules: [{required: true, pattern: /^[A-Za-z]+$/}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Имя"/>
                    )}
                </FormItem>
                <FormItem validateStatus={ageError ? 'error' : ''} help={ageError && ageError.includes('MIN_LENGTH_IS_18') ? 'Возраст должен быть больше 18' : ''}>
                    {getFieldDecorator('age', {
                        initialValue: this.props.initialValues.age,
                        rules: [{required: true, pattern: /^[0-9]+$/, validator: ageValidator}]
                    })(
                        <Input prefix={<Icon style={{fontSize: 13}}/>} type="number" placeholder="Возраст"/>
                    )}
                </FormItem>
                <FormItem style={{marginBottom: 8}} validateStatus={agreementError ? 'error' : ''}
                          help={agreementError ? 'Обязательное поле' : ''}>
                    {getFieldDecorator('agreement', {
                        initialValue: this.props.initialValues.agreement,
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

const mapStateToProps = (state) => ({activeForm: state.activeForm, initialValues: state.initialValues});

export default connect(mapStateToProps)(Form.create()(StartForm));
