import {createStore, applyMiddleware, compose} from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
const logger = createLogger();

const middlewares = [
    logger,
    thunk
];

export default initialState => {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );
};

