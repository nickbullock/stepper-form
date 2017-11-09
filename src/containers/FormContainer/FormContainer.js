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

    componentDidMount() {
        //load start form asynchronously
        this.props.dispatch(actions.loadForm(this.props.activeForm, Utils.loadForm));
    }

    componentWillReceiveProps(nextProps) {
        //load another form asynchronously
        this.props.dispatch(actions.loadForm(this.props.activeForm, Utils.loadForm));
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
        //function can be called from Forms and FormContainer too;
        // store keep controller as FormController and antd Form.create() keeps controller in props
        const formController = this.props.form || this.props.formController;

        const dispatchAndSave = (values) => {
            localStorage.setItem(this.props.activeForm, JSON.stringify(values));
            this.props.dispatch(actions.changeForm(newActiveForm));
        };

        if(isValidationNeeded) {
            formController.validateFields((err, values) => {
                if (!err) {
                    dispatchAndSave(values);
                }

                return false;
            });
        }
        else{
            dispatchAndSave(formController.getFieldsValue())
        }

        return false;
    }

    render() {
        const activeFormIndex = activeFormIndexHash[this.props.activeForm];
        const Form = this.props.Form;
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
                                                onClick={this.goToForm.bind(this, step.formName, true)}
                                                title={step.formTitle} style={{cursor: 'pointer'}}/>)}
                </Steps>
                <Col type="flex" justify="center" align="middle" span={24} style={{marginTop: '30px'}}>
                    {Form ? <Form goToForm={this.goToForm} getInitialValues={this.getInitialValues}/> : 'Загрузка формы...'}
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

const mapStateToProps = (state) => ({
    Form: state.Form,
    activeForm: state.activeForm,
    formController: state.formController,
    completed: state.completed
});

export default connect(mapStateToProps)(FormContainer);
