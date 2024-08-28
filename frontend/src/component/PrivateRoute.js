import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import SignUp from '../pages/SignUp';

const PrivateRoute = ({ ...rest }) => {
  const auth = JSON.parse(localStorage.getItem('token'));
  if (auth) {
    if (auth.token) {
      return <>
        <Route {...rest} />
        {/* <SignUp /> */}
      </>
    }
  }
  return <Redirect to="/signin" />
};

export default PrivateRoute;
