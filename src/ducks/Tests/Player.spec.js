import playerReducer, {
   initialState, LOAD_SONGS_REQUEST, PLAY_SONG_SUCCESS,
   LOAD_SONGS_SUCCESS, LOAD_SONGS_FAILURE,
   STOP_SONG, NEXT_SONG, PREV_SONG, SELECT_SONG,
   PLAY_SONG_FAILURE,
   stopSong, nextSong, prevSong, selectSong
} from "../Player";

describe('Player duck', function () {
   describe('Player reducer', function () {
      it('should handle LOAD_SONGS_REQUEST before error', () => {
         const action = {
            type: LOAD_SONGS_REQUEST
         };

         expect(playerReducer(initialState, action)).toEqual({
            ...initialState,
            loadingOfTracks: true,
            errorOfTracks: null
         })
      });

      it('should handle LOAD_SONGS_REQUEST after error', () => {
         const initialStateWithError = {
            ...initialState,
            errorOfTracks: 'Unknown error'
         };

         const action = {
            type: LOAD_SONGS_REQUEST
         };

         expect(playerReducer(initialStateWithError, action)).toEqual({
            ...initialStateWithError,
            loadingOfTracks: true,
            errorOfTracks: null
         })
      });

      it('should handle LOAD_SONGS_SUCCESS', () => {
         const beforeState = {
            ...initialState,
            loadingOfTracks: true,
            errorOfTracks: null
         };

         const action = {
            type: LOAD_SONGS_SUCCESS,
            payload: [1, 2, 3]
         };

         expect(playerReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfTracks: false,
            errorOfTracks: null,
            allTracks: action.payload
         })
      });

      it('should handle LOAD_SONGS_FAILURE', () => {
         const beforeState = {
            ...initialState,
            loadingOfTracks: true,
            errorOfTracks: null,
         };

         const action = {
            type: LOAD_SONGS_FAILURE,
            error: 'Unknown error'
         };

         expect(playerReducer(beforeState, action)).toEqual({
            ...beforeState,
            loadingOfTracks: false,
            errorOfTracks: action.error,
            allTracks: null
         })
      });

      it('should handle PLAY_SONG_FAILURE', () => {
         const action = {
            type: PLAY_SONG_FAILURE,
            payload: 'Не удалось воспроизвести трек'
         };

         expect(playerReducer(initialState, action)).toEqual({
            ...initialState,
            isPlaying: false,
            errorOfPlayer: action.payload
         })
      });

      it('should handle PLAY_SONG_SUCCESS', () => {
         const action = {
            type: PLAY_SONG_SUCCESS
         };

         expect(playerReducer(initialState, action)).toEqual({
            ...initialState,
            isPlaying: true
         })
      });

      it('should handle STOP_SONG', () => {
         const beforeState = {
            ...initialState,
            isPlaying: true
         };


         const action = {
            type: STOP_SONG
         };

         expect(playerReducer(beforeState, action)).toEqual({
            ...beforeState,
            isPlaying: false
         })
      });

      it('should handle NEXT_SONG', () => {
         const beforeState = {
            ...initialState,
            allTracks: [1, 2, 3],
         };

         const action = {
            type: NEXT_SONG
         };

         expect(playerReducer(beforeState, action)).toEqual({
            ...beforeState,
            currentTrackIndex: beforeState.currentTrackIndex === beforeState.allTracks.length - 1 ? 0 : beforeState.currentTrackIndex + 1
         })
      });

      it('should handle PREV_SONG', () => {
         const beforeState = {
            ...initialState,
            allTracks: [1, 2, 3],
         };

         const action = {
            type: PREV_SONG
         };

         expect(playerReducer(beforeState, action)).toEqual({
            ...beforeState,
            currentTrackIndex: beforeState.currentTrackIndex === 0 ?
               beforeState.allTracks.length - 1 : beforeState.currentTrackIndex - 1
         })
      });

      it('should handle SELECT_SONG', () => {
         const action = {
            type: SELECT_SONG,
            payload: 2
         };

         expect(playerReducer(initialState, action)).toEqual({
            ...initialState,
            currentTrackIndex: action.payload
         })
      });
   });

   describe('Player actions', function () {
      it('stopSong(): should change isPlaying to FALSE, handle STOP_SONG', function () {
         const expectedAction = {
            type: STOP_SONG
         };

         expect(stopSong()).toEqual(expectedAction);
      });

      it('nextSong(): should play next song, handle NEXT_SONG', function () {
         const expectedAction = {
            type: NEXT_SONG
         };

         expect(nextSong()).toEqual(expectedAction);
      });

      it('prevSong(): should play prev song, handle PREV_SONG', function () {
         const expectedAction = {
            type: PREV_SONG
         };

         expect(prevSong()).toEqual(expectedAction);
      });

      it('selectSong(): should select clicked song, handle SELECT_SONG', function () {
         const expectedAction = {
            type: SELECT_SONG,
            payload: 5
         };

         expect(selectSong(5)).toEqual(expectedAction);
      });
   });
});
