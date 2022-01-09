// import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore, compose } from "redux";
import { logger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router/immutable";

import rootReducer from "./reducer";

const createHistory = require("history").createBrowserHistory;

export const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history);

// Middlewares
const middlewares = [thunkMiddleware, historyMiddleware];

// Redux logger
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

// Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer =
  process.env.NODE_ENV === "development"
    ? composeEnhancers(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

const store = createStore(rootReducer(history), {}, enhancer);

export default store;