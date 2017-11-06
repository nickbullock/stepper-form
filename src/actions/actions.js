import {createActions} from 'redux-actions'

const actions = createActions({
    SET_ACTIVE_FORM: formName => ({formName})
});

export default actions;