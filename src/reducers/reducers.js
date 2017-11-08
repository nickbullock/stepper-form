import {handleActions} from 'redux-actions'
import actions from '../actions'

const initialState = {activeForm: 'startForm', completed: false};

const reducers = handleActions({
    [actions.changeForm](state, action){
        return {...state, activeForm: action.payload.activeForm}
    },
    [actions.changeFormViaStep](state, action){
        return {...state, activeFormViaStep: action.payload.activeFormViaStep}
    },
    [actions.complete](state, action){
        return {...state, completed: action.payload.completed};
    }
}, initialState);

export default reducers;


