import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import registerServiceWorker from './registerServiceWorker';
import configureStore, {playerMiddleware} from './store/configureStore'
import { Router} from 'react-router';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {AUTH_SIGNIN} from "./actions/UserAction";
import { reducer as formReducer } from 'redux-form';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloProvider } from 'react-apollo';
import sheetReducer from "./reducers";
import authReducer from "./reducers";
import userReducer from "./reducers/userReducer";
import UserRegister from "./components/User/UserRegister";
import WrappedNormalLoginForm from "./components/User/UserLogin";
import Error from "./components/Error"
import Navigation from "./components/Navigation"
import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

// const store = configureStore();
const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' });

const token = localStorage.getItem('token');

const middleware = applyMiddleware(thunk, logger)

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
//
// const store = createStore(
//     combineReducers({
//       // apollo: client.reducer(),
//       // form: formReducer,
//       // auth: authReducer,
//       user: userReducer
//     }),
//     {}, // initial state
//     middleware
//     // compose(
//     //     applyMiddleware(client.middleware(),playerMiddleware),
//     //     // If you are using the devToolsExtension, you can add it here also
//     //     window.devToolsExtension ? window.devToolsExtension() : f => f,
//     // )
// );

const store = createStore(userReducer, middleware)

// if (token) {
//   // We need to update application state if the token exists
//   store.dispatch({ type: AUTH_SIGNIN });
// }

ReactDOM.render(
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navigation/>
            <Switch>
              <Route path="/" component={App} exact/>
              <Route path="/login" component={WrappedNormalLoginForm}/>
              <Route path="/register" component={UserRegister}/>
              <Route component={Error}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
    , document.getElementById('root'));
registerServiceWorker();
