import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LogIn from './components/login/LogIn';
import Dashboard from './components/dashboard/Dashboard';
import AppliedRoute from './components/AppliedRoute';
import SignUp from './components/signup/SignUp';

// eslint-disable-next-line react/prop-types
export default ({ childProps }) => (
   <Switch>
      <AppliedRoute
         path="/dashboard"
         exact
         component={Dashboard}
         props={childProps}
      />
      <AppliedRoute path="/" exact component={LogIn} props={childProps} />
      <AppliedRoute
         path="/signup"
         exact
         component={SignUp}
         props={childProps}
      />
      {/* Finally, catch all unmatched routes */}
      <Route />
   </Switch>
);
