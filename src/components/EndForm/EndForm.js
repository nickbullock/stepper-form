import React from 'react';
import 'antd/lib/form/style/css';
import 'antd/lib/input/style/css';
import 'antd/lib/button/style/css';
import 'antd/lib/icon/style/css';
import 'antd/lib/checkbox/style/css';
import {connect} from 'react-redux';
import actions from '../../actions';
import { Form, Button} from 'antd';
import Utils from '../../services/utils';
const FormItem = Form.Item;

class EndForm extends React.Component {
    complete(e) {
        e.preventDefault();
        this.props.dispatch(actions.complete(true));
    }

    render() {
        return (
            <Form layout="inline">
                <FormItem>
                    <Button type="primary" onClick={this.complete.bind(this)}>
                        Завершить
                    </Button>
                    <Button type="primary" onClick={Utils.goToForm.bind(this, 'middleForm')}>
                        Назад
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default connect()(Form.create()(EndForm));
