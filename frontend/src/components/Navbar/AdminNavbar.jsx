import React from 'react';
import './AdminNavbar.css';
import { Link, Redirect } from "react-router-dom";

import { connect } from 'react-redux';
import { logoutUser } from './LogoutFunctions.js';
const mapStateToProps = state => {
  return {
    auth : state.auth
  }
}
const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
})

const AdminNavbar = props => {
  return (
    <div className="admin-navbar">
      <ul className="navbar-lu">
        <li className="navbar-li brand"><Link to="/home">Beauty Center</Link></li>
        <li className="navbar-li right" onClick={() => props.logoutUser()}><i className="fa fa-fw fa-user"></i>{props.auth.user}</li>
      </ul>
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);