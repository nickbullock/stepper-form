import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import createStore from '../../store/createStore';
import Home from '../Home';

const store = createStore({carrier: 'all'});

const App = () => (
    <Provider store={store}>
        <Router>
            <Route path="/" component={Home}/>
        </Router>
    </Provider>
);

export default App;
