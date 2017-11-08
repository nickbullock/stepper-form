import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import {connect} from 'react-redux';
import {Form, Input, Button} from 'antd';

const FormItem = Form.Item;

class MiddleForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            values: props.getInitialValues.call(this)
        }
    }

    componentWillReceiveProps(nextProps){
        const errors = Object.values(nextProps.form.getFieldsError()).filter(error => !!error);
        if(nextProps.goToFormViaStep
            && nextProps.activeForm !== nextProps.goToFormViaStep
            && errors.length === 0){

            nextProps.goToForm.call(this, nextProps.goToFormViaStep, true)
        }
    }

    //function to add space after every 4 symbols
    //and to remove unnecessary spaces
    //when user presses backspace
    formatCardNumber(e) {
        const backspace = 8;
        const value = e.target.value;
        const length = e.target.value.length + 1;

        if (e.keyCode === backspace) {
            if (value.charAt(length - 3) === " ") {
                e.target.value = value.slice(0, -1);
            }
        }
        else {
            if (length % 5 === 0) {
                e.target.value += " ";
            }
        }
    }

    render() {
        const {getFieldDecorator, getFieldError} = this.props.form;
        const cardNameError = getFieldError('cardNumber');

        return (
            <Form layout="horizontal">
                <FormItem validateStatus={cardNameError ? 'error' : ''} help={''}>
                    {getFieldDecorator('cardNumber', {
                        initialValue: this.state.values.cardNumber,
                        rules: [{
                            required: true,
                            transform: (value) => value ? value.replace(/\s/g, '') : '',
                            pattern: /^[0-9]+$/
                        }],
                    })(
                        <Input placeholder="Номер банковской карты" onKeyDown={::this.formatCardNumber}/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="danger" onClick={this.props.goToForm.bind(this, 'startForm', false)}>
                        Назад
                    </Button>
                    <Button type="primary" onClick={this.props.goToForm.bind(this, 'endForm', true)}>
                        Далее
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({activeForm: state.activeForm});

export default connect(mapStateToProps)(Form.create()(MiddleForm));
