import genresReducer, {
   LOAD_GENRES_REQUEST, LOAD_GENRES_SUCCESS, LOAD_GENRES_FAILURE,
   initialState,
} from '../Genres';

describe('Genres duck', function () {
   describe('Genres reducer', function () {
      it ('should handle LOAD_GENRES_REQUEST before error', () => {
         const action = {
            type: LOAD_GENRES_REQUEST
         };

         expect(genresReducer(initialState, action)).toEqual({
            ...initialState,
            loadingOfGenres: true,
            errorOfGenres: null
         })
      });

      it ('should handle LOAD_GENRES_REQUEST after error', () => {
         const initialStateWithError = {
            loadingOfGenres: false,
            errorOfGenres: 'Unknown error',
            genres: [],
         };

         const action = {
            type: LOAD_GENRES_REQUEST
         };

         expect(genresReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loadingOfGenres: true,
            errorOfGenres: null,
         })
      });

      it ('should handle LOAD_GENRES_SUCCESS', () => {
         const beforeState = {
            loadingOfGenres: true,
            errorOfGenres: null,
            genres: []
         };

         const action = {
            type: LOAD_GENRES_SUCCESS,
            payload: [1, 2, 3]
         };

         expect(genresReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfGenres: false,
            errorOfGenres: null,
            genres: action.payload
         })
      });

      it ('should handle LOAD_GENRES_FAILURE', () => {
         const beforeState = {
            loadingOfGenres: true,
            errorOfGenres: null,
            genres: null
         };

         const action = {
            type: LOAD_GENRES_FAILURE,
            error: '500 error'
         };

         expect(genresReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfGenres: false,
            errorOfGenres: action.error,
         })
      });
   });
});
