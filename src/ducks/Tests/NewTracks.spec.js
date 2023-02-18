import newTracksReducer, {
   LOAD_NEW_SONGS_REQUEST, LOAD_NEW_SONGS_SUCCESS, LOAD_NEW_SONGS_FAILURE,
   initialState,
} from '../NewTracks';

describe('New tracks duck', function () {
   describe('New tracks reducer', function () {
      it ('should handle LOAD_NEW_SONGS_REQUEST before error', () => {
         const action = {
            type: LOAD_NEW_SONGS_REQUEST
         };

         expect(newTracksReducer(initialState, action)).toEqual({
            ...initialState,
            loadingOfNewTracks: true,
            errorOfNewTracks: null
         })
      });

      it ('should handle LOAD_NEW_SONGS_REQUEST after error', () => {
         const initialStateWithError = {
            loadingOfNewTracks: false,
            errorOfNewTracks: 'Unknown error',
            newTracks: [],
         };

         const action = {
            type: LOAD_NEW_SONGS_REQUEST
         };

         expect(newTracksReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loadingOfNewTracks: true,
            errorOfNewTracks: null,
         })
      });

      it ('should handle LOAD_NEW_SONGS_SUCCESS', () => {
         const beforeState = {
            loadingOfNewTracks: true,
            errorOfNewTracks: null,
            newTracks: []
         };

         const action = {
            type: LOAD_NEW_SONGS_SUCCESS,
            payload: [1, 2, 3]
         };

         expect(newTracksReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfNewTracks: false,
            errorOfNewTracks: null,
            newTracks: action.payload
         })
      });

      it ('should handle LOAD_NEW_SONGS_FAILURE', () => {
         const beforeState = {
            loadingOfNewTracks: true,
            errorOfNewTracks: null,
            newTracks: null
         };

         const action = {
            type: LOAD_NEW_SONGS_FAILURE,
            error: '500 error'
         };

         expect(newTracksReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfNewTracks: false,
            errorOfNewTracks: action.error,
         })
      });
   });
});
