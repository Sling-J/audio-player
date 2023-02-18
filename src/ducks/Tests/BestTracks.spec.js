import {initialState} from "../BestTracks";
import bestTracksReducer, {LOAD_BEST_SONGS_FAILURE, LOAD_BEST_SONGS_REQUEST, LOAD_BEST_SONGS_SUCCESS} from "../BestTracks";

describe('BestTracks duck', function () {
   describe('Best tracks reducer', function () {
      it ('should handle LOAD_BEST_SONGS_REQUEST before error', () => {
         const action = {
            type: LOAD_BEST_SONGS_REQUEST
         };

         expect(bestTracksReducer(initialState, action)).toEqual({
            ...initialState,
            loadingOfBestTracks: true,
            errorOfBestTracks: null
         })
      });

      it ('should handle LOAD_BEST_SONGS_REQUEST after error', () => {
         const initialStateWithError = {
            loadingOfBestTracks: false,
            errorOfBestTracks: 'Unknown error',
            bestTracks: [],
         };

         const action = {
            type: LOAD_BEST_SONGS_REQUEST
         };

         expect(bestTracksReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loadingOfBestTracks: true,
            errorOfBestTracks: null,
         })
      });

      it ('should handle LOAD_BEST_SONGS_SUCCESS', () => {
         const beforeState = {
            loadingOfBestTracks: true,
            errorOfBestTracks: null,
            bestTracks: []
         };

         const action = {
            type: LOAD_BEST_SONGS_SUCCESS,
            payload: [1, 2, 3]
         };

         expect(bestTracksReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfBestTracks: false,
            errorOfBestTracks: null,
            bestTracks: action.payload
         })
      });

      it ('should handle LOAD_BEST_SONGS_FAILURE', () => {
         const beforeState = {
            loadingOfBestTracks: true,
            errorOfBestTracks: null,
            bestTracks: null
         };

         const action = {
            type: LOAD_BEST_SONGS_FAILURE,
            error: '500 error'
         };

         expect(bestTracksReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfBestTracks: false,
            errorOfBestTracks: action.error,
         })
      });
   });
});

