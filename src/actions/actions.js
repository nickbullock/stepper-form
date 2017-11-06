import {createActions} from 'redux-actions'

const actions = createActions({
    SET_ACTIVE_FORM: formIndex => ({formIndex})
});

export default actions