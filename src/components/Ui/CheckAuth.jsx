import * as propTypes from "prop-types";
import {connect} from 'react-redux';

import {moduleName as authModule} from "../../ducks/Auth";

export const Authorized = (props) => (
   props.children || null
);

export const Unauthorized = (props) => (
   props.children || null
);

const CheckAuth = ({isAuth, children}) => isAuth ?
   (children[0] || null):
   (children[1] || null);

CheckAuth.propTypes = {
   isAuth: propTypes.bool.isRequired
};

export default connect((state) => ({
   isAuth: state[authModule].isAuth
}))(CheckAuth);
