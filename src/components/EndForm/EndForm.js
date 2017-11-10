import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import {connect} from 'react-redux';
import {Form, Button} from 'antd';
import actions from '../../actions';

const FormItem = Form.Item;

class EndForm extends React.Component {

    componentDidMount(){
        this.props.dispatch(actions.setActiveFormController(this.props.form));
        this.props.dispatch(actions.loadInitialValues(this.props.activeForm));
    }

    complete() {
        this.props.dispatch(actions.setFormCompletedStatus({[this.props.activeForm]: true}));
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
