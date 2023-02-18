import savedTracksReducer, {
   CHECK_SAVED_SONGS, SAVE_SONG, REMOVE_SONG, initialState,
   saveSong, removeSong, checkSavedSongs
} from '../SavedTracks';

describe('Saved tracks duck', function () {
   describe('Saved tracks reducer', function () {
      it('should handle CHECK_SAVED_SONGS', () => {
         const action = {
            type: CHECK_SAVED_SONGS,
            payload: [1, 2, 3]
         };

         expect(savedTracksReducer(initialState, action)).toEqual({
            ...initialState,
            savedTracks: action.payload
         })
      });

      it('should handle SAVE_SONG', () => {
         const action = {
            type: SAVE_SONG,
            payload: {id: 1, track: 'track'}
         };

         expect(savedTracksReducer(initialState, action)).toEqual({
            ...initialState,
            savedTracks: [
               ...initialState.savedTracks,
               action.payload
            ]
         })
      });

      it('should handle REMOVE_SONG', () => {
         const beforeState = {
            ...initialState,
            savedTracks: [
               {id: 1, tracks: 'track'},
               {id: 2, tracks: 'track'},
            ]
         };

         const action = {
            type: REMOVE_SONG,
            payload: 1
         };

         const savedTracks = beforeState.savedTracks.filter(({id}) => id !== action.payload.id);

         expect(savedTracksReducer(beforeState, action)).toEqual({
            ...beforeState,
            savedTracks
         })
      });
   });

   describe('Saved tracks actions', function () {
      it('saveSong(): should save song', () => {
         const expectedAction = {
            type: SAVE_SONG,
            payload: 3
         };

         expect(saveSong(3)).toEqual(expectedAction);
      });

      it('removeSong(): should remove song', () => {
         const expectedAction = {
            type: REMOVE_SONG,
            payload: 3
         };

         expect(removeSong(3)).toEqual(expectedAction);
      });

      it('checkSavedSongs(): should write saved songs to store', () => {
         const expectedAction = {
            type: CHECK_SAVED_SONGS,
            payload: [1, 2 ,3]
         };

         expect(checkSavedSongs([1, 2, 3])).toEqual(expectedAction);
      });
   });
});
