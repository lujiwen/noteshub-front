import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore'
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import ApolloClient, { createNetworkInterface } from 'apollo-client';

const store = configureStore();
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
ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
