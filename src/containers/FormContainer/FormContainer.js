import React, {Component} from 'react';
import {connect} from 'react-redux';
import 'antd/lib/steps/style/css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';
import 'antd/lib/notification/style/css';
import {Row, Col, notification} from 'antd';
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
        if(this.props.activeForm !== nextProps.activeForm){
            this.props.dispatch(actions.loadForm(nextProps.activeForm, Utils.loadForm));
        }
    }

    goToForm(newActiveForm, isValidationNeeded) {
        //function can be called from Forms and FormContainer too;
        // store keep controller as FormController and antd Form.create() keeps controller in props
        const formController = this.props.form || this.props.formController;

        if(activeFormIndexHash[newActiveForm] - activeFormIndexHash[this.props.activeForm] === 2){
            if(!this.props.completedFormsHash.middleForm){
                return notification.warning({
                    message: 'Не удалось перейти к форме',
                    description: 'Вы заполнили не все формы, предшествующие выбранной.'
                });
            }
        }

        const dispatchAndSave = (values) => {
            localStorage.setItem(this.props.activeForm, JSON.stringify(values));
            this.props.dispatch(actions.changeForm(newActiveForm));
        };

        if (isValidationNeeded) {
            formController.validateFields((err, values) => {
                if (!err) {
                    dispatchAndSave(values);
                    this.props.dispatch(actions.setFormCompletedStatus({[this.props.activeForm] : true}));
                }

                return false;
            });
        }
        //else branch code works only if user goes previous form
        else {
            if(activeFormIndexHash[this.props.activeForm] !== 'endForm'){
                this.props.dispatch(actions.setFormCompletedStatus({[this.props.activeForm] : false}));
            }

            formController.resetFields();
            dispatchAndSave(formController.getFieldsValue());
        }

        return false;
    }

    checkValidationNeeded(newActiveForm) {
        return activeFormIndexHash[newActiveForm] > activeFormIndexHash[this.props.activeForm];
    }

    render() {
        const activeFormIndex = activeFormIndexHash[this.props.activeForm];
        const Form = this.props.Form;
        //calc count of completed forms
        const completedFormCount = Object.values(this.props.completedFormsHash).filter(status => !!status).length;
        //there is different content when form is completed
        const content = completedFormCount === 3
            ? (
                <Col type="flex" justify="center" align="middle" span={24}
                     style={{marginTop: '30px', fontSize: '25px'}}>
                    Завершено
                </Col>
            )
            : (
                <Col span={24}>
                    <Steps current={activeFormIndex}>
                        {stepList.map(step => <Step key={step.formName}
                                                    onClick={this.goToForm.bind(this, step.formName, this.checkValidationNeeded.call(this, step.formName))}
                                                    title={step.formTitle} style={{cursor: 'pointer'}}/>)}
                    </Steps>
                    <Col type="flex" justify="center" align="middle" span={24} style={{marginTop: '15px'}}>Форм завершено {completedFormCount} / 3</Col>
                    <Col type="flex" justify="center" align="middle" span={24} style={{marginTop: '30px'}}>
                        {Form ? <Form goToForm={this.goToForm}/> : 'Загрузка формы...'}
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
    completedFormsHash: state.completedFormsHash
});

export default connect(mapStateToProps)(FormContainer);
