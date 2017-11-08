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
//map form name to stepper index
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
        //load start form asynchronously
        this.loadForm(this.props.activeForm);
    }

    componentWillReceiveProps(nextProps) {
        //load another form asynchronously
        this.loadForm(nextProps.activeForm);
    }

    loadForm(activeForm) {
        return Utils.loadForm(activeForm)
            .then(formImport => {
                //keep Form component in local state
                this.setState({
                    Form: formImport.default
                })
            })
            .catch(e => console.error(e))
    }

    goToForm(newActiveForm, isValidationNeeded) {
        const dispatchAndSave = (values) => {
            this.props.dispatch(actions.changeForm(newActiveForm));
            localStorage.setItem(this.props.activeForm, JSON.stringify(values));
        };

        if(isValidationNeeded) {
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    dispatchAndSave(values);
                }

                return false
            });
        }
        else{
            dispatchAndSave(this.props.form.getFieldsValue());
        }
    }

    getInitialValues() {
        return JSON.parse(localStorage.getItem(this.props.activeForm)) || {};
    }

    changeFormViaStep(formName) {
        console.log("ACTIVE IS ", formName)
        this.setState({goToFormViaStep: formName});
    }

    render() {
        const activeFormIndex = activeFormIndexHash[this.props.activeForm];
        const Form = this.state.Form;
        //there is different content when form is completed
        const content = this.props.completed
            ? (
                <Col type="flex" justify="center" align="middle" span={24} style={{marginTop: '30px', fontSize: '25px'}}>
                    Завершено
                </Col>
            )
            : (
                <Col span={24}>
                <Steps current={activeFormIndex}>
                    {stepList.map(step => <Step key={step.formName}
                                                onClick={this.changeFormViaStep.bind(this, step.formName)}
                                                title={step.formTitle} style={{cursor: 'pointer'}}/>)}
                </Steps>
                <Col type="flex" justify="center" align="middle" span={24} style={{marginTop: '30px'}}>
                    {Form ? <Form goToFormViaStep={this.state.goToFormViaStep} goToForm={this.goToForm}
                                  getInitialValues={this.getInitialValues}/> : 'Загрузка формы...'}
                </Col>
            </Col>);


        return (
            <Row type="flex" justify="center" align="middle">
                <Col span={18} style={{marginTop: '30px'}}>
                    {content}
                </Col>
            </Row>
        );
    }
}

const mapStateToProps = (state) => ({activeForm: state.activeForm, completed: state.completed});

export default connect(mapStateToProps)(FormContainer);
