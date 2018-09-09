import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import createLogger from 'redux-logger';
import reducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';

composeWithDevTools(
    applyMiddleware(...middleware)
)


const loggerMiddleware = createLogger({collapsed:true});

const middleware = [ loggerMiddleware];

const store = (window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore)(reducer);

export default store;
