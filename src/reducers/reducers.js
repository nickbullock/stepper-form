import {handleActions} from 'redux-actions'
import actions from '../actions'

const initialState = {
    activeForm: 'startForm',
    formController: null,
    initialValues: {},
    Form: null,
    completedForms: []
};

const reducers = handleActions({
    [actions.loadFormSucceeded](state, action){
        return {...state, Form: action.payload.default};
    },

    [actions.changeForm](state, action){
        return {...state, activeForm: action.payload.activeForm};
    },

    [actions.setActiveFormController](state, action){
        return {...state, formController: action.payload.formController};
    },

    [actions.loadInitialValues](state, action){
        const initialValues = JSON.parse(localStorage.getItem(action.payload.activeForm)) || {};

        return {...state, initialValues: initialValues};
    },

    [actions.setFormCompletedStatus](state, action){
        const completedFormsHash = {...state.completedFormsHash, ...action.payload.formStatus};

        return {...state, completedFormsHash}
    }
}, initialState);

export default reducers;


