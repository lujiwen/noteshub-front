import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore'
import { Router} from 'react-router';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {AUTH_SIGNIN} from "./actions/UserAction";
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import authReducer from "./reducers/authReducer";
import { ApolloProvider } from 'react-apollo';
// const store = configureStore();
const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });

const token = localStorage.getItem('token');

networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }

    // Get the authentication token from local storage if it exists
    req.options.headers.token = token ? token : null;
    next();
  }
}]);

const client = new ApolloClient({
  networkInterface
});

const store = createStore(
    combineReducers({
      apollo: client.reducer(),
      form: formReducer,
      // auth: authReducer,
    }),
    {}, // initial state
    compose(
        applyMiddleware(client.middleware()),
        // If you are using the devToolsExtension, you can add it here also
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    )
);

if (token) {
  // We need to update application state if the token exists
  store.dispatch({ type: AUTH_SIGNIN });
}

ReactDOM.render(
    <ApolloProvider store={store} client={client}>
      {/*<Router history={browserHistory} >*/}
        <App />
      {/*</Router>*/}
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
