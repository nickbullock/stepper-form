import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'antd/lib/steps/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';
import {Row, Col} from 'antd';
import {Steps} from 'antd';
import Utils from '../../services/utils';
import actions from '../../actions';

const Step = Steps.Step;

const activeFormIndexHash = {
    'startForm': 0,
    'middleForm': 1,
    'endForm': 2
};
const stepList = [
    {formName: 'startForm', formTitle: 'Личные данные'},
    {formName: 'middleForm', formTitle: 'Номер банковской карты'},
    {formName: 'endForm', formTitle: 'Завершение'},
];

class FormContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Form: null
        };
    }

    componentDidMount() {
        this.loadForm(this.props.activeForm);
    }

    componentWillReceiveProps(nextProps) {
        this.loadForm(nextProps.activeForm);
    }

    loadForm(activeForm){
        return Utils.loadForm(activeForm)
            .then(formImport => {
                this.setState({
                    Form: React.createFactory(formImport.default)
                })
            })
            .catch(e => console.error(e))
    }

    render() {
        const activeFormIndex = activeFormIndexHash[this.props.activeForm];

        return (
            <Row type="flex" justify="center" align="middle">
                <Col span={18} style={{marginTop: '30px'}}>
                    <Steps current={activeFormIndex}>
                        {stepList.map(step => <Step key={step.formTitle} title={step.formTitle}/>)}
                    </Steps>
                    <Col type="flex" justify="center" align="middle" span={24} style={{marginTop: '30px'}}>
                        {this.state.Form ? this.state.Form() : 'Загрузка формы...'}
                    </Col>
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({activeForm: state.activeForm});

export default connect(mapStateToProps)(FormContainer);
