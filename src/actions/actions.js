import {createActions} from 'redux-actions'

const actions = createActions({
    SET_ACTIVE_FORM: form => form,
    SET_FORM_DATA: form => form
});

export default actions;