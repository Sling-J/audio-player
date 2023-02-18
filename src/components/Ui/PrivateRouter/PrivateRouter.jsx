import React from 'react';
import * as propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

import {moduleName as authModule} from "../../../ducks/Auth";
import {urls} from "../../../config/utils";

const PrivateRoute = ({isAuth, authorized, component: Component, ...rest}) => (
   <Route {...rest} render={props => {
      if (authorized) {
         return !isAuth ?
            <Redirect to={urls.home.path}/> :
            <Component {...props}/>
      } else {
         return isAuth ?
            <Redirect to={urls.home.path}/> :
            <Component {...props}/>
      }
   }}/>
);

PrivateRoute.propTypes = {
   isAuth: propTypes.bool.isRequired
};

export default connect((state) => ({
   isAuth: state[authModule].isAuth
}))(PrivateRoute);
