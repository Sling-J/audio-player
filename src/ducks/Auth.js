import {appName} from "../config/config";
import {TestCheckAuth, TestAuth} from "../config/service";

import {stopSong} from "./Player";

/**
 * Constants
 */

export const moduleName = 'auth';
const prefix = `${appName}/${moduleName}`;

export const LOGIN_REQUEST = `${prefix}/LOGIN_REQUEST`;
export const LOGIN_SUCCESS = `${prefix}/LOGIN_SUCCESS`;
export const LOGIN_FAILURE = `${prefix}/LOGIN_FAILURE`;

export const CHECK_AUTH_REQUEST = `${prefix}/CHECK_AUTH_REQUEST`;
export const CHECK_AUTH_SUCCESS = `${prefix}/CHECK_AUTH_SUCCESS`;
export const CHECK_AUTH_FAILURE = `${prefix}/CHECK_AUTH_FAILURE`;

export const LOGOUT_SUCCESS = `${prefix}/LOGOUT_SUCCESS`;

export const initialState = {
   isAuth: false,
   loadingOfForm: false,
   errorOfForm: null,
   userData: null,
};

/**
 * Reducer
 */

export default (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_REQUEST:
         return {
            ...state,
            loadingOfForm: true,
            errorOfForm: null
         };

      case LOGIN_SUCCESS:
         return {
            ...state,
            isAuth: true,
            loadingOfForm: false,
            userData: action.payload,
            errorOfForm: null
         };

      case LOGIN_FAILURE:
         return {
            ...state,
            isAuth: false,
            loadingOfForm: false,
            errorOfForm: action.error,
         };

      case CHECK_AUTH_SUCCESS:
         return {
            ...state,
            isAuth: true,
            userData: action.payload,
            errorOfForm: null
         };

      case CHECK_AUTH_FAILURE:
         return {
            ...state,
            isAuth: false,
            userData: null,
            errorOfForm: null
         };

      case LOGOUT_SUCCESS:
         return {
            ...state,
            isAuth: false,
            userData: null,
            errorOfForm: null
         };

      default:
         return state;
   }
};

/**
 * Actions
 */

export const login = dataOfForm => {
   const request = () => ({type: LOGIN_REQUEST});
   const success = userData => ({type: LOGIN_SUCCESS, payload: userData});
   const failure = error => ({type: LOGIN_FAILURE, error});

   return dispatch => {
      dispatch(request());
      TestAuth(dataOfForm)
         .then(res => {
            if (res.status === 200) {
               localStorage.setItem('userData', JSON.stringify(res.data));
               localStorage.setItem('accessToken', res.data.token);
               dispatch(success(res.data));
            }
         })
         .catch(err => dispatch(failure(err)))
   };
};

export const checkAuth = (userData, token) => {
   if (userData && token) {
      return {
         type: CHECK_AUTH_SUCCESS,
         payload: userData
      }
   } else {
      localStorage.removeItem('userData');
      localStorage.removeItem('accessToken');
      stopSong();

      return {
         type: CHECK_AUTH_FAILURE
      }
   }
};

export const checkIsAuth = () => {
   const request = () => ({type: CHECK_AUTH_REQUEST});
   const success = userData => ({type: CHECK_AUTH_SUCCESS, payload: userData});
   const failure = () => ({type: CHECK_AUTH_FAILURE});

	const accessToken = localStorage.getItem('accessToken');

   return dispatch => {
      if (accessToken) {
         localStorage.removeItem('refreshToken');
         localStorage.removeItem('accessToken');
         localStorage.removeItem('userData');

         dispatch(request());
         TestCheckAuth(accessToken)
            .then(res => {
               if (res.status === 200) {
                  localStorage.setItem('userData', res.data);
                  localStorage.setItem('accessToken', res.data.token);
                  dispatch(success(res.data));
               }
				})
				.catch(err => console.log(err))
      } else {
         dispatch(failure());
      }
   };
};

export const logout = () => {
   localStorage.removeItem('userData');
   localStorage.removeItem('accessToken');

   return dispatch => {
      dispatch(stopSong());
      dispatch({type: LOGOUT_SUCCESS})
   }
};
