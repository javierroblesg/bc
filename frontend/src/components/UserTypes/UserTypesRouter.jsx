import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserTypesTable from './UserTypesTable';
import UserTypeDetail from './UserTypeDetail';

const UserTypes = props => {
  return (
    <Switch>
      <Route exact path="/user_types" component={UserTypesTable} />
      <Route path="/user_types/:typeId" component={UserTypeDetail} />
    </Switch>
  )
};

export default UserTypes;