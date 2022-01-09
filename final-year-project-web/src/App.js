import React, { useEffect, Suspense, lazy } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from './services/Firebase';
import { presistUser } from './redux/actions/auth';

const Home = lazy(() => import('./views/home/index'));
const Login = lazy(() => import('./views/Auth/Login'));
const Register = lazy(() => import('./views/Auth/Register'));
const OwnerDashboard = lazy(() => import('./views/Owner/index'));

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function PublicRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/owner' />}
    />
  )
}

function App(props) {
  const _isMounted = React.useRef(true);
  const removeListener = React.useRef(true);
  const [state, setState] = React.useState({
    authed: false,
    loading: true,
  });
  const { presistUser } = props;
  useEffect(() => {
    removeListener.current = auth.onAuthStateChanged((user) => {
      if (user) {
        presistUser(user.uid);
        setState({
          authed: true,
          loading: false,
        })
      } else {
        setState({
          authed: false,
          loading: false
        })
      }
    });
    return () => {
      removeListener.current = false;
      _isMounted.current = false;
    }
  }, [presistUser])
  return (
    <Suspense fallback={() => <div className="empty"><h2>Loading...</h2></div>}>
      <Switch>
        <Route path="/" exact component={(props) => <Home {...props} />} />
        <PublicRoute authed={state.authed} path="/login" component={(props) => <Login {...props} />} />
        <PublicRoute authed={state.authed} path="/register" component={(props) => <Register {...props} />} />
        <PrivateRoute authed={state.authed} path="/owner" component={(props) => <OwnerDashboard {...props} />} />
      </Switch>
    </Suspense>
  )
}

const mapStateToProps = ({ auth }) => {
  const {
    loading, error,
  } = auth;
  return {
    loading,
    error,
  };
};

const mapDispatchToProps = {
  presistUser,
};


export default connect(mapStateToProps, mapDispatchToProps)(App);