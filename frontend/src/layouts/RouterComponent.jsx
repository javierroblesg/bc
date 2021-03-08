import React from 'react';
import Login from './Login';
import Admin from './Admin';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    auth: state.auth,
  }
}

class RouterComponent extends React.Component {
  render () {
    const checkAuth = () => {
      return(
        this.props.auth.isAuthenticated
        ?
        <Redirect to="/" />
        :
        <Login/>
      );
    }

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.auth.isAuthenticated
          ? <Component {...props} />
          : <Redirect to={{ pathname: '/login', state: { from: props.location } 
        }} />
      )} />
    );

    return(
        <Switch>
          <Route path="/login" component={checkAuth} />
          <PrivateRoute path="/" component={props => <Admin {...props} />} />
          <Redirect from="*" to="/" />
        </Switch>
      )
  }
}

export default withRouter(connect(mapStateToProps)(RouterComponent));