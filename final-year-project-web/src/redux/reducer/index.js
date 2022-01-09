import { combineReducers } from 'redux';
import { connectRouter } from "connected-react-router";
import authReducer from './auth';

const reducers = history =>
  combineReducers({
    routers: connectRouter(history),
    auth: authReducer,
  });

export default reducers;