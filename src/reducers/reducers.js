import {handleActions} from 'redux-actions'
import actions from '../actions'

const initialState = {activeForm: 'startForm'};

const reducers = handleActions({
    [actions.setActiveForm](state, action){
        return {...state, activeForm: action.payload.activeForm}
    }
}, initialState);

export default reducers;


