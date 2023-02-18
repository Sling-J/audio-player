import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';

import PrivateRouter from "../Ui/PrivateRouter/PrivateRouter";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

import {stopSong} from "../../ducks/Player";
import {urls} from "../../config/utils";

const Auth = ({stopSong}) => {
   useEffect(() => {
      stopSong()
   });

   return (
      <Fragment>
         <PrivateRouter path={urls.login.path} component={SignIn}/>
         <PrivateRouter path={urls.signUp.path} component={SignUp}/>
      </Fragment>
   );
};

export default connect(null, {
   stopSong
})(Auth);
