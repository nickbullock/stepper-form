import {handleActions} from 'redux-actions'
import actions from '../actions'

const initialState = {carrier: 'all'};

const reducers = handleActions({
    [actions.setCarrier](state, action){
        return {...state, carrier: action.payload.carrier}
    }
}, initialState);

export default reducers;


