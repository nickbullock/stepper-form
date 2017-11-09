import {createActions, combineActions} from 'redux-actions';
import {createActionThunk} from 'redux-thunk-actions';

const actions = createActions({
    LOAD_FORM_SUCCEEDED: formImport => formImport,
    CHANGE_FORM: activeForm => ({activeForm}),
    SET_ACTIVE_FORM_CONTROLLER: formController => ({formController}),
    LOAD_INITIAL_VALUES: activeForm => ({activeForm}),
    COMPLETE: completed => ({completed})
});

actions.loadForm = createActionThunk('LOAD_FORM', (activeForm, loadForm) => loadForm(activeForm));

export default actions;