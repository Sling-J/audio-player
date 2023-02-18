import singersReducer, {
   LOAD_SINGER_REQUEST, LOAD_SINGER_SUCCESS, LOAD_SINGER_FAILURE,
   initialState,
} from '../Singers';

describe('Singers duck', function () {
   describe('Singers reducer', function () {
      it ('should handle LOAD_SINGER_REQUEST before error', () => {
         const action = {
            type: LOAD_SINGER_REQUEST
         };

         expect(singersReducer(initialState, action)).toEqual({
            ...initialState,
            loadingOfSingers: true,
            errorOfSingers: null
         })
      });

      it ('should handle LOAD_SINGER_REQUEST after error', () => {
         const initialStateWithError = {
            loadingOfSingers: false,
            errorOfSingers: 'Unknown error',
            singers: [],
         };

         const action = {
            type: LOAD_SINGER_REQUEST
         };

         expect(singersReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loadingOfSingers: true,
            errorOfSingers: null,
         })
      });

      it ('should handle LOAD_SINGER_SUCCESS', () => {
         const beforeState = {
            loadingOfSingers: true,
            errorOfSingers: null,
            singers: []
         };

         const action = {
            type: LOAD_SINGER_SUCCESS,
            payload: [1, 2, 3]
         };

         expect(singersReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfSingers: false,
            errorOfSingers: null,
            singers: action.payload
         })
      });

      it ('should handle LOAD_SINGER_ERROR', () => {
         const beforeState = {
            loadingOfSingers: true,
            errorOfSingers: null,
            singers: null
         };

         const action = {
            type: LOAD_SINGER_FAILURE,
            error: '500 error'
         };

         expect(singersReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfSingers: false,
            errorOfSingers: action.error,
         })
      });
   });
});
