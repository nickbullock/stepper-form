import {createActions} from 'redux-actions'

const actions = createActions({
    CHANGE_FORM: activeForm => ({activeForm}),
    CHANGE_FORM_VIA_STEP: activeFormViaStep => ({activeFormViaStep}),
    COMPLETE: completed => ({completed})
});

export default actions;