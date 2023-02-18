import {appName} from "../config/config";
import {fetchRequest} from "../config/utils";
import {Player} from "../config/service";

/**
 * Constants
 */

export const moduleName = 'player';
const prefix = `${appName}/${moduleName}`;

export const LOAD_SONGS_REQUEST = `${prefix}/LOAD_SONGS_REQUEST`;
export const LOAD_SONGS_SUCCESS = `${prefix}/LOAD_SONGS_SUCCESS`;
export const LOAD_SONGS_FAILURE = `${prefix}/LOAD_SONGS_FAILURE`;

export const PLAY_SONG_REQUEST = `${prefix}/PLAY_SONG_REQUEST`;
export const PLAY_SONG_SUCCESS = `${prefix}/PLAY_SONG_SUCCESS`;
export const PLAY_SONG_FAILURE = `${prefix}/PLAY_SONG_FAILURE`;

export const CLEAR_PLAYER_ERROR = `${prefix}/CLEAR_PLAYER_ERROR`;

export const STOP_SONG = `${prefix}/STOP_SONG`;
export const NEXT_SONG = `${prefix}/NEXT_SONG`;
export const PREV_SONG = `${prefix}/PREV_SONG`;
export const SELECT_SONG = `${prefix}/SELECT_SONG`;

export const initialState = {
   currentTrackIndex: 0,
   loadingOfPlayer: false,
   loadingOfTracks: false,
   isPlaying: false,
   errorOfPlayer: null,
   errorOfTracks: null,
   allTracks: null,
};

/**
 * Reducer
 */


export default (state = initialState, action) => {
   switch (action.type) {
      case LOAD_SONGS_REQUEST:
         return {
            ...state,
            loadingOfTracks: true,
            errorOfTracks: null
         };

      case LOAD_SONGS_SUCCESS:
         return {
            ...state,
            loadingOfTracks: false,
            errorOfTracks: null,
            allTracks: action.payload
         };

      case LOAD_SONGS_FAILURE:
         return {
            ...state,
            loadingOfTracks: false,
            allTracks: null,
            errorOfTracks: action.error
         };

      case CLEAR_PLAYER_ERROR:
         return {
            ...state,
            errorOfPlayer: null
         };

      case PLAY_SONG_REQUEST:
         return {
            ...state,
            isPlaying: false,
            loadingOfPlayer: true,
            errorOfPlayer: null
         };

      case PLAY_SONG_SUCCESS:
         return {
            ...state,
            isPlaying: true,
            loadingOfPlayer: false,
            errorOfPlayer: null
         };

      case PLAY_SONG_FAILURE:
         return {
            ...state,
            isPlaying: false,
            loadingOfPlayer: false,
            errorOfPlayer: action.payload,
         };

      case STOP_SONG:
         return {
            ...state,
            isPlaying: false,
            loadingOfPlayer: false
         };

      case NEXT_SONG:
         return {
            ...state,
            currentTrackIndex: state.currentTrackIndex === state.allTracks.length - 1 ?
               0 : state.currentTrackIndex + 1
         };

      case PREV_SONG:
         return {
            ...state,
            currentTrackIndex: state.currentTrackIndex === 0 ?
               state.allTracks.length - 1 : state.currentTrackIndex - 1
         };

      case SELECT_SONG:
         return {
            ...state,
            currentTrackIndex: action.payload
         };

      default:
         return state;
   }
};

/**
 * Actions
 */

export const fetchTracks = () => fetchRequest(
   Player.fetchSongs,
   LOAD_SONGS_REQUEST,
   LOAD_SONGS_SUCCESS,
   LOAD_SONGS_FAILURE
);

export const clearError = () => ({
   type: CLEAR_PLAYER_ERROR
});

export const playSongRequest = () => ({
   type: PLAY_SONG_REQUEST
});

export const playSongFail = message => ({
   type: PLAY_SONG_FAILURE,
   payload: message
});

export const playSong = (isAuth, message) => {
   const success = () => ({type: PLAY_SONG_SUCCESS});

   return dispatch => {
      dispatch(playSongRequest());

      if (isAuth) {
         dispatch(success())
      } else {
         dispatch(playSongFail(message))
      }
   };
};

export const stopSong = () => ({
   type: STOP_SONG
});

export const nextSong = () => {
   const success = () => ({type: NEXT_SONG});

   return dispatch => {
      dispatch(playSongRequest);
      dispatch(success())
   };
};

export const prevSong = () => {
   const success = () => ({type: PREV_SONG});

   return dispatch => {
      dispatch(playSongRequest);
      dispatch(success())
   };
};

export const selectSong = index => ({
   type: SELECT_SONG,
   payload: index
});
