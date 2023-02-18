import authReducer, {
   initialState, LOGIN_REQUEST, LOGIN_SUCCESS,
   LOGIN_FAILURE, CHECK_AUTH_SUCCESS,
   CHECK_AUTH_FAILURE, checkAuth,
} from "../Auth";

describe('Auth duck', function () {
   describe('Auth reducer', function () {
      it('should handle LOGIN_REQUEST before error', () => {
         const action = {
            type: LOGIN_REQUEST
         };

         expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            loadingOfForm: true,
            errorOfForm: null,
         })
      });

      it('should handle LOGIN_REQUEST after error', () => {
         const initialStateWithError = {
            ...initialState,
            isAuth: false,
            errorOfForm: 'Unknown error',
         };

         const action = {
            type: LOGIN_REQUEST
         };

         expect(authReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loadingOfForm: true,
            errorOfForm: null,
         })
      });

      it('should handle LOGIN_SUCCESS', () => {
         const beforeState = {
            isAuth: false,
            loadingOfForm: true,
            errorOfForm: null,
            userData: null,
         };

         const action = {
            type: LOGIN_SUCCESS,
            payload: [1, 2, 3]
         };

         expect(authReducer(beforeState, action)).toEqual({
            ...beforeState,
            isAuth: true,
            loadingOfForm: false,
            errorOfForm: null,
            userData: action.payload
         })
      });

      it('should handle LOGIN_FAILURE', () => {
         const beforeState = {
            isAuth: false,
            loadingOfForm: true,
            errorOfForm: null,
            userData: null,
         };

         const action = {
            type: LOGIN_FAILURE,
            error: '500 error'
         };

         expect(authReducer(beforeState, action)).toEqual({
            ...beforeState,
            isAuth: false,
            loadingOfForm: false,
            errorOfForm: action.error,
            userData: null
         })
      });

      it('should handle CHECK_AUTH_SUCCESS', () => {
         const action = {
            type: CHECK_AUTH_SUCCESS,
            error: [1, 2, 3]
         };

         expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isAuth: true,
            errorOfForm: null,
            userData: action.payload
         })
      });

      it('should handle CHECK_AUTH_FAILURE', () => {
         const action = {
            type: CHECK_AUTH_FAILURE
         };

         expect(authReducer(initialState, action)).toEqual({
            ...initialState,
            isAuth: false,
            errorOfForm: null,
            userData: null
         })
      });
   });

   describe('Auth actions', function () {
      it('checkAuth(): true should return USER_AUTHORIZED_SUCCESS', () => {
         const expectedAction = {
            type: CHECK_AUTH_SUCCESS,
            payload: [1, 2, 3]
         };

         expect(checkAuth(expectedAction.payload, true)).toEqual(expectedAction);
      });

      it('checkAuth(): false should return USER_AUTHORIZED_FAILURE', () => {
         const expectedAction = {
            type: CHECK_AUTH_FAILURE
         };

         expect(checkAuth(undefined, undefined)).toEqual(expectedAction);
      });
   });
});
