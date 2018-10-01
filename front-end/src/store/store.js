import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import createLogger from 'redux-logger';
import reducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';



const loggerMiddleware = createLogger({collapsed:true});

const middleware = [ loggerMiddleware];

composeWithDevTools(
    applyMiddleware(...middleware)
)

const store = (window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore)(reducer);

export default store;
