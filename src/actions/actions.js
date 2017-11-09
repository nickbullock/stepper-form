import {createActions} from 'redux-actions'

const actions = createActions({
    CHANGE_FORM: activeForm => ({activeForm}),
    SET_ACTIVE_FORM_CONTROLLER: formController => ({formController}),
    LOAD_INITIAL_VALUES: activeForm => ({activeForm}),
    COMPLETE: completed => ({completed})
});

export default actions;