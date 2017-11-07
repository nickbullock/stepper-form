import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import {connect} from 'react-redux';
import { Form, Icon, Input, Button} from 'antd';
import Utils from '../../services/utils';
const FormItem = Form.Item;

class MiddleForm extends React.Component {

    formatCardNumber(e) {
        const backspace = 8;
        const value = e.target.value;
        const length = e.target.value.length + 1;

        if(e.keyCode === backspace){
            if(value.charAt(length - 3) === " "){
                e.target.value = value.slice(0, -1);
            }
        }
        else{
            if(length % 5 === 0){
                e.target.value += " ";
            }
        }
    }

    render() {
        const { getFieldDecorator, getFieldError} = this.props.form;
        const cardNameError = getFieldError('cardNumber');

        return (
            <Form layout="horizontal" onSubmit={Utils.goToForm.bind(this, 'endForm')}>
                <FormItem validateStatus={cardNameError ? 'error' : ''} help={''} >
                    {getFieldDecorator('cardNumber', {
                        rules: [{ required: true, transform: (value) => value.replace(/\s/g, ''), pattern: /^[0-9]+$/}],
                    })(
                        <Input placeholder="Номер банковской карты" onKeyDown={this.formatCardNumber.bind(this)}/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        Далее
                    </Button>
                    <Button type="danger" onClick={Utils.goToForm.bind(this, 'middleForm')}>
                        Назад
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default connect()(Form.create()(MiddleForm));
