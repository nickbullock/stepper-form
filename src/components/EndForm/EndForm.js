import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import {connect} from 'react-redux';
import actions from '../../actions';
import {Form, Button} from 'antd';

const FormItem = Form.Item;

class EndForm extends React.Component {
    complete() {
        this.props.dispatch(actions.complete(true));
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
        return (
            <Form layout="inline">
                <FormItem>
                    <Button type="primary" onClick={this.complete.bind(this)}>
                        Завершить
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => ({activeForm: state.activeForm});

export default connect(mapStateToProps)(Form.create()(EndForm));
