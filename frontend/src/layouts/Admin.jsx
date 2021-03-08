import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Sidebar from '../components/Sidebar/Sidebar';
import AdminNavbar from '../components/Navbar/AdminNavbar';
import Notifications from '../components/Notifications/Notifications';

import routes from '../routes';

import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    auth : state.auth
  }
}

const Admin = props => {

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/admin') {
        if (props.auth.modules[prop.module] !== 0) {
          return (<Route path={prop.path} component={prop.component} key={key} />);
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  }

  return(
  <>
      <Sidebar routes={routes} auth={props.auth} />
      <AdminNavbar />
      <Notifications />
      <div className="content">
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/home" />
        </Switch>
      </div>
  </>
  )
}

export default connect(mapStateToProps)(Admin);