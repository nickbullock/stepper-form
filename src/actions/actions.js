import {createActions} from 'redux-actions'

const actions = createActions({
    SET_ACTIVE_FORM: formName => ({formName}),
    SET_FORM_DATA: formData => ({formData})
});

export default actions;