import {handleActions} from 'redux-actions'
import actions from '../actions'

const initialState = {activeForm: 'startForm', completed: false, formController: null};

const reducers = handleActions({
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
    [actions.complete](state, action){
        return {...state, completed: action.payload.completed};
    }
}, initialState);

export default reducers;


