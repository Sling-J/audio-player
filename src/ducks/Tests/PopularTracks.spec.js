import popularTracksReducer, {
   LOAD_POPULAR_SONGS_REQUEST, LOAD_POPULAR_SONGS_SUCCESS, LOAD_POPULAR_SONGS_ERROR,
   initialState,
} from '../PopularTracks';

describe('Popular tracks duck', function () {
   describe('Popular tracks reducer', function () {
      it ('should handle LOAD_POPULAR_SONGS_REQUEST before error', () => {
         const action = {
            type: LOAD_POPULAR_SONGS_REQUEST
         };

         expect(popularTracksReducer(initialState, action)).toEqual({
            ...initialState,
            loadingOfPopularTracks: true,
            errorOfPopularTracks: null
         })
      });

      it ('should handle LOAD_POPULAR_SONGS_REQUEST after error', () => {
         const initialStateWithError = {
            loadingOfPopularTracks: false,
            errorOfPopularTracks: 'Unknown error',
            popularTracks: [],
         };

         const action = {
            type: LOAD_POPULAR_SONGS_REQUEST
         };

         expect(popularTracksReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loadingOfPopularTracks: true,
            errorOfPopularTracks: null,
         })
      });

      it ('should handle LOAD_POPULAR_SONGS_SUCCESS', () => {
         const beforeState = {
            loadingOfPopularTracks: true,
            errorOfPopularTracks: null,
            popularTracks: []
         };

         const action = {
            type: LOAD_POPULAR_SONGS_SUCCESS,
            payload: [1, 2, 3]
         };

         expect(popularTracksReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfPopularTracks: false,
            errorOfPopularTracks: null,
            popularTracks: action.payload
         })
      });

      it ('should handle LOAD_POPULAR_SONGS_ERROR', () => {
         const beforeState = {
            loadingOfPopularTracks: true,
            errorOfPopularTracks: null,
            popularTracks: null
         };

         const action = {
            type: LOAD_POPULAR_SONGS_ERROR,
            error: '500 error'
         };

         expect(popularTracksReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfPopularTracks: false,
            errorOfPopularTracks: action.error,
         })
      });
   });
});
