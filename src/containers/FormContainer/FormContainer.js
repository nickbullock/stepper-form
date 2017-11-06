import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'antd/lib/steps/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';
import {Row, Col} from 'antd';
import {Steps} from 'antd';
import Utils from '../../services/Utils';

const Step = Steps.Step;

class FormContainer extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("active", this.props.activeForm)

        Utils.loadForm(this.props.activeForm)
            .then((data) => {
                console.log(">>>2", data)
            })
            .catch(e => console.log(e))
    }

    render() {
        return (
            <Row type="flex" justify="center" align="middle">
                <Col span={20} style={{marginTop: '30px'}}>
                    <Steps current={0}>
                        <Step title="Личные данные"/>
                        <Step title="Номер банковской карты"/>
                        <Step title="Завершение"/>
                    </Steps>
                    <Col span={24} style={{minHeight: 200, background: 'palevioletred', marginTop: '30px'}}>

                    </Col>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({activeForm: state.activeForm});

export default connect(mapStateToProps)(FormContainer);
