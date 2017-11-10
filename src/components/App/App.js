import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createStore from '../../store/createStore';
import FormContainer from '../../containers/FormContainer';

const store = createStore({
    activeForm: 'startForm',
    formController: null,
    initialValues: {},
    Form: null,
    completedFormsHash: {
        startForm: false,
        middleForm: false,
        endForm: false
    }
});

const App = () => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={FormContainer}/>
        </Router>
    </Provider>
);

export default App;
