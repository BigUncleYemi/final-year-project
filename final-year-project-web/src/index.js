import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './asset/scss/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store, { history } from "./redux/store";
import { Router } from "react-router-dom";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
