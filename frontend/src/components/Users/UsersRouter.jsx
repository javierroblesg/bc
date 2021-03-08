import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersTable from './UsersTable';
import UserDetail from './UserDetail';

const Users = props => {
  return (
    <Switch>
      <Route exact path="/users" component={UsersTable} />
      <Route path="/users/:userId" component={UserDetail} />
    </Switch>
  )
};

export default Users;