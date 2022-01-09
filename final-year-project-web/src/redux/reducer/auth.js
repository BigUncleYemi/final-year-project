import { notification } from 'antd';
import * as actionTypes from '../constants';

const initialState = {
  loading: false,
  error: null,
  token: localStorage.getItem(actionTypes.AUTH_TOKEN || ''),
  userId: localStorage.getItem(actionTypes.AUTH_TOKEN_ID || ''),
  user: null,
    // ? JSON.parse(localStorage.getItem(actionTypes.AUTH_USER) || '')
    // : null,
}

const key = actionTypes.KEY;


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP:
    case actionTypes.SIGNIN:
      notification.info({
        message: 'Loading.....',
        duration: 0,
        key,
      });
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.SIGNIN_SUCCESS:
      notification.success({
        message: 'Welcome Back',
        key,
        duration: 1.5,
      });
    return {
      ...state,
      user: action.payload,
      loading: false,
      error: null,
    }
    case actionTypes.SIGNUP_SUCCESS:
      notification.success({
        message: 'Account Created Successfully',
        key,
        duration: 1.5,
      });
    return {
      ...state,
      user: action.payload,
      loading: false,
      error: null,
    }
    case actionTypes.LOGOUT_SUCCESS: 
      notification.success({
        message: 'Good bye 👋👋, Please come back again.',
        key,
        duration: 1.5,
      });
      return {
        ...initialState,
        user: {},
      };
    case actionTypes.SIGNUP_ERROR:
    case actionTypes.SIGNIN_ERROR:
      notification.error({
        message: action.payload.message,
        key,
        duration: 1,
      });
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export default authReducer;